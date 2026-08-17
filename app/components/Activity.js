'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USERNAME = 'tomtran-786'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`
const XOMDATA_REPO_URL = `${GITHUB_URL}/xomdata-practice`
const XOMDATA_README_URL =
  'https://raw.githubusercontent.com/tomtran-786/xomdata-practice/main/README.md'

const FALLBACK_PRACTICE_STATS = {
  total: 64,
  python: 37,
  sql: 27,
  easy: 47,
  medium: 17,
  updatedAt: '2026-08-17',
}

const LANGUAGE_COLORS = {
  Python: '#3572a5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  'Jupyter Notebook': '#da5b0b',
  SQL: '#e38c00',
  Shell: '#89e051',
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

function parsePracticeStats(readme) {
  const total = Number(readme.match(/\*\*(\d+)\*\* problems solved/)?.[1])
  const python = readme.match(/\| Python \|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*\d+\s*\|\s*\d+\s*\|\s*(\d+)\s*\|/)
  const sql = readme.match(/\| SQL \|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*\d+\s*\|\s*\d+\s*\|\s*(\d+)\s*\|/)
  const updatedAt = readme.match(/last update (\d{4}-\d{2}-\d{2})/)?.[1]

  if (!total || !python || !sql) return FALLBACK_PRACTICE_STATS

  return {
    total,
    python: Number(python[3]),
    sql: Number(sql[3]),
    easy: Number(python[1]) + Number(sql[1]),
    medium: Number(python[2]) + Number(sql[2]),
    updatedAt: updatedAt || FALLBACK_PRACTICE_STATS.updatedAt,
  }
}

function StatCard({ icon, label, value, loading }) {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer"
      className="pf-activity-stat"
      aria-label={`${label}: ${loading ? 'loading' : value}. View GitHub profile`}
    >
      <i className={`ti ${icon}`} aria-hidden="true" />
      <strong>{loading ? '—' : value.toLocaleString()}</strong>
      <span>{label}</span>
    </a>
  )
}

function GitHubPanel() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGitHubStats() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ])

        if (!userResponse.ok || !reposResponse.ok) throw new Error('GitHub request failed')

        const [user, repos] = await Promise.all([userResponse.json(), reposResponse.json()])
        const originalRepos = repos.filter((repo) => !repo.fork)
        const languageCounts = originalRepos.reduce((counts, repo) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1
          return counts
        }, {})
        const languageTotal = Object.values(languageCounts).reduce((sum, count) => sum + count, 0)
        const languages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / languageTotal) * 100),
            color: LANGUAGE_COLORS[name] || '#6e7781',
          }))

        setStats({
          repos: user.public_repos,
          stars: originalRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          followers: user.followers,
          following: user.following,
          languages,
        })
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(true)
      }
    }

    loadGitHubStats()
    return () => controller.abort()
  }, [])

  const cards = [
    { icon: 'ti-book', label: 'Repositories', value: stats?.repos || 0 },
    { icon: 'ti-star', label: 'Total stars', value: stats?.stars || 0 },
    { icon: 'ti-users', label: 'Followers', value: stats?.followers || 0 },
    { icon: 'ti-git-branch', label: 'Following', value: stats?.following || 0 },
  ]

  return (
    <motion.article className="pf-activity-panel" {...fadeUp}>
      <div className="pf-activity-panel-header">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="pf-activity-identity">
          <i className="ti ti-brand-github" aria-hidden="true" />
          <span>
            <strong>GitHub stats</strong>
            <small>@{GITHUB_USERNAME}</small>
          </span>
        </a>
        <span className="pf-live-badge">
          <span aria-hidden="true" /> Live data
        </span>
      </div>

      <div className="pf-activity-stat-grid" aria-live="polite">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} loading={!stats} />
        ))}
      </div>

      {error && (
        <p className="pf-activity-note">
          Live totals are temporarily unavailable. The contribution calendar and profile link remain available.
        </p>
      )}

      <div className="pf-activity-detail-grid">
        <div className="pf-activity-subpanel">
          <h3>Most used languages</h3>
          {stats?.languages?.length ? (
            <div className="pf-language-list">
              {stats.languages.map((language) => (
                <div className="pf-language-row" key={language.name}>
                  <div className="pf-language-label">
                    <span style={{ background: language.color }} aria-hidden="true" />
                    <span>{language.name}</span>
                    <strong>{language.percentage}%</strong>
                  </div>
                  <div className="pf-language-track" aria-hidden="true">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ background: language.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pf-language-skeleton" aria-label="Loading language statistics">
              {[78, 62, 46, 34].map((width) => (
                <span key={width} style={{ width: `${width}%` }} />
              ))}
            </div>
          )}
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="pf-activity-subpanel pf-contribution-panel"
        >
          <div className="pf-subpanel-heading">
            <h3>Contribution activity</h3>
            <i className="ti ti-arrow-up-right" aria-hidden="true" />
          </div>
          <div className="pf-contribution-scroll">
            {/* The chart is a public SVG generated from GitHub's contribution data. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/0c498f/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution calendar for the last year`}
              width="828"
              height="128"
              loading="lazy"
              className="pf-contribution-image"
            />
          </div>
        </a>
      </div>
    </motion.article>
  )
}

function PracticePanel() {
  const [practiceStats, setPracticeStats] = useState(FALLBACK_PRACTICE_STATS)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(XOMDATA_README_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('README request failed')
        return response.text()
      })
      .then((readme) => {
        setPracticeStats(parsePracticeStats(readme))
        setIsLive(true)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setIsLive(false)
      })

    return () => controller.abort()
  }, [])

  const solvedBreakdown = useMemo(
    () => [
      { name: 'Python', value: practiceStats.python, color: '#3572a5' },
      { name: 'SQL', value: practiceStats.sql, color: '#e38c00' },
    ],
    [practiceStats],
  )

  return (
    <motion.article className="pf-activity-panel pf-practice-panel" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
      <div className="pf-activity-panel-header">
        <a href={XOMDATA_REPO_URL} target="_blank" rel="noreferrer" className="pf-activity-identity">
          <i className="ti ti-terminal-2" aria-hidden="true" />
          <span>
            <strong>Xom Data practice</strong>
            <small>SQL &amp; Python problem solving</small>
          </span>
        </a>
        <span className="pf-live-badge">
          <span aria-hidden="true" /> {isLive ? 'Synced from repo' : 'Latest snapshot'}
        </span>
      </div>

      <div className="pf-practice-layout">
        <div className="pf-practice-total">
          <span className="pf-practice-number">{practiceStats.total}</span>
          <strong>Problems solved</strong>
          <small>Last updated {practiceStats.updatedAt}</small>
        </div>

        <div className="pf-practice-breakdown">
          {solvedBreakdown.map((item) => (
            <div className="pf-practice-language" key={item.name}>
              <div>
                <span style={{ background: item.color }} aria-hidden="true" />
                <strong>{item.name}</strong>
              </div>
              <span>{item.value} solutions</span>
            </div>
          ))}
          <div className="pf-practice-levels">
            <span><strong>{practiceStats.easy}</strong> Easy</span>
            <span><strong>{practiceStats.medium}</strong> Medium</span>
          </div>
        </div>

        <a href={XOMDATA_REPO_URL} target="_blank" rel="noreferrer" className="pf-activity-cta">
          Explore solutions <i className="ti ti-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  )
}

export default function Activity() {
  return (
    <section id="activity" className="pf-section" style={{ position: 'relative', zIndex: 5 }}>
      <div className="pf-section-heading">
        <h2 className="pf-section-title" style={{ fontWeight: 700, margin: 0 }}>
          My activity
        </h2>
        <p className="pf-section-subtitle pf-section-context" style={{ fontWeight: 500 }}>
          Coding stats and contributions
        </p>
      </div>

      <div className="pf-activity-stack">
        <GitHubPanel />
        <PracticePanel />
      </div>
    </section>
  )
}
