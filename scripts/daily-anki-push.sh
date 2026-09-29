#!/bin/bash
# Daily: open Anki desktop, pull latest AnkiDroid reviews via AnkiWeb sync,
# regenerate data/chinese-progress.json, and push ONLY that file to main.
# Run by launchd (scripts/launchd/com.tuan.anki-sync.plist) at 12:00 Taipei time.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1

REPO="$(cd "$(dirname "$0")/.." && pwd)"
FILE="data/chinese-progress.json"
ANKI="http://localhost:8765"
TODAY="$(date +%F)"   # fixed at start so a mid-run sleep past midnight can't skew it
log() { echo "[$(date '+%F %T')] $*"; }
anki() { curl -s -m 10 "$ANKI" -d "{\"action\":\"$1\",\"version\":6}"; }

cd "$REPO" || { log "repo not found"; exit 1; }

# 1. Start Anki (in background) and wait up to 2 min for AnkiConnect.
open -ga Anki   # no-op if already running
for i in $(seq 1 24); do anki version | grep -q '"result"' && break; sleep 5; done
anki version | grep -q '"result"' || { log "AnkiConnect not reachable"; exit 2; }

# 2. Sync with AnkiWeb so today's AnkiDroid reviews are included.
log "AnkiWeb sync: $(anki sync)"; sleep 20

# 3. Regenerate the data file.
node scripts/sync-anki-progress.mjs || { log "sync script failed"; exit 3; }

# 4. Commit + push only the data file (other local changes are left untouched).
git pull --rebase --autostash -q origin main || { log "pull failed"; exit 4; }
if git diff --quiet -- "$FILE"; then log "no change in $FILE"; exit 0; fi
git add -- "$FILE"
git commit -q -m "Sync Chinese learning progress data ($TODAY)" -- "$FILE" || { log "commit failed"; exit 5; }

# 5. Push. GitHub can reject with "cannot lock ref" even when the update landed
#    (seen after the Mac wakes from sleep), so verify against origin and retry once.
pushed() { git fetch -q origin main && git merge-base --is-ancestor HEAD origin/main; }
for attempt in 1 2; do
  git push -q origin main && { log "pushed $(git rev-parse --short HEAD)"; exit 0; }
  pushed && { log "push reported an error but origin already has $(git rev-parse --short HEAD)"; exit 0; }
  [ "$attempt" = 1 ] && { sleep 15; git pull --rebase --autostash -q origin main || break; }
done
log "push failed"; exit 6
