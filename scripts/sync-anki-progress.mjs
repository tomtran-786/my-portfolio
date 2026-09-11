// Pulls Chinese-deck review history from Anki desktop (via the AnkiConnect
// add-on) and writes it to data/chinese-progress.json for the portfolio's
// "Chinese Learning" panel (app/components/Activity.js) to read.
//
// This is a manual/periodic maintenance script. It is NOT run by `next dev`,
// `next build`, or any CI step — run it yourself whenever you want to refresh
// the numbers, then commit the updated data/chinese-progress.json.
//
// Setup (one-time):
//   1. Install the AnkiConnect add-on in Anki desktop: Tools > Add-ons >
//      Get Add-ons..., code 2055492159. Restart Anki.
//   2. Open Anki desktop and keep it running while you run this script.
//   3. The first request triggers an in-app "allow this connection?" popup
//      in Anki — click Yes.
//   4. Edit DECK_NAMES below to match your actual Chinese deck name(s).
//
// Run:
//   node scripts/sync-anki-progress.mjs
//
// Note: the exact AnkiConnect action names/params below (`cardReviews`,
// `getReviewsOfCards`) are based on general knowledge of the AnkiConnect API
// and aren't vendored in this repo — if either call errors out, check the
// current docs at https://foosoft.net/projects/anki-connect/ and adjust.

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ANKI_CONNECT_URL = 'http://localhost:8765'
const DECK_NAMES = ['Modern Chinese']

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'chinese-progress.json')

async function ankiConnect(action, params = {}) {
  let response
  try {
    response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, version: 6, params }),
    })
  } catch (err) {
    throw new Error(
      `Could not reach AnkiConnect at ${ANKI_CONNECT_URL}. Make sure Anki desktop is open and the ` +
        'AnkiConnect add-on (code 2055492159) is installed, then rerun this script.',
    )
  }

  const body = await response.json()
  if (body.error) throw new Error(`AnkiConnect error for "${action}": ${body.error}`)
  return body.result
}

async function getReviewRowsForDeck(deckName) {
  // Preferred: deck-scoped review log in one call.
  // Rows: [reviewTime(ms), cardID, usn, buttonPressed, newInterval, previousInterval, newFactor, reviewDuration, reviewType]
  try {
    const rows = await ankiConnect('cardReviews', { deck: deckName, startID: 0 })
    return rows.map((row) => ({ reviewTime: row[0], cardId: row[1] }))
  } catch (err) {
    console.warn(`"cardReviews" unavailable for "${deckName}" (${err.message}); falling back to per-card lookup.`)
  }

  // Fallback: find cards in the deck, then fetch their review history.
  const cardIds = await ankiConnect('findCards', { query: `deck:"${deckName}"` })
  if (cardIds.length === 0) return []

  const reviewsByCard = await ankiConnect('getReviewsOfCards', { cards: cardIds })
  const rows = []
  for (const [cardId, reviews] of Object.entries(reviewsByCard)) {
    for (const review of reviews) {
      rows.push({ reviewTime: review.id, cardId: Number(cardId) })
    }
  }
  return rows
}

function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function computeStreaks(dailyCounts) {
  const sortedDays = Object.keys(dailyCounts).sort()

  let longestStreak = 0
  let run = 0
  for (const day of sortedDays) {
    if (dailyCounts[day] > 0) {
      run += 1
      longestStreak = Math.max(longestStreak, run)
    } else {
      run = 0
    }
  }

  // Anchor to today, but fall back to yesterday if today has no reviews yet
  // (this script commonly runs before the day's studying happens).
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let anchor = new Date(today)
  if (!dailyCounts[toDateKey(anchor)]) anchor.setDate(anchor.getDate() - 1)

  let currentStreak = 0
  const cursor = new Date(anchor)
  while (dailyCounts[toDateKey(cursor)] > 0) {
    currentStreak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return { currentStreak, longestStreak }
}

async function main() {
  const existingDecks = await ankiConnect('deckNames')
  const missingDecks = DECK_NAMES.filter((name) => !existingDecks.includes(name))
  if (missingDecks.length > 0) {
    console.warn(`Deck(s) not found in Anki: ${missingDecks.join(', ')}. Check DECK_NAMES in this script.`)
  }

  const allRows = []
  for (const deckName of DECK_NAMES) {
    if (missingDecks.includes(deckName)) continue
    const rows = await getReviewRowsForDeck(deckName)
    allRows.push(...rows)
    console.log(`${deckName}: ${rows.length} reviews found`)
  }

  const dailyCounts = {}
  const uniqueCardIds = new Set()
  for (const { reviewTime, cardId } of allRows) {
    const key = toDateKey(new Date(reviewTime))
    dailyCounts[key] = (dailyCounts[key] || 0) + 1
    uniqueCardIds.add(cardId)
  }

  const sortedDays = Object.keys(dailyCounts).sort()
  const { currentStreak, longestStreak } = computeStreaks(dailyCounts)

  const output = {
    lastUpdated: new Date().toISOString(),
    dailyCounts,
    stats: {
      currentStreak,
      longestStreak,
      totalReviews: allRows.length,
      totalDays: sortedDays.length,
      totalCardsStudied: uniqueCardIds.size,
      firstStudyDate: sortedDays[0] || null,
      lastStudyDate: sortedDays[sortedDays.length - 1] || null,
    },
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n')
  console.log(`Wrote ${OUTPUT_PATH}`)
  console.log(output.stats)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
