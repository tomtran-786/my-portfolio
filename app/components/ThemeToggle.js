'use client'

import { useEffect, useState } from 'react'
import { COLOR_MODE_STORAGE_KEY } from '@/app/theme'

function currentMode() {
  return document.documentElement.dataset.colorMode === 'dark' ? 'dark' : 'light'
}

function savedMode() {
  try {
    return localStorage.getItem(COLOR_MODE_STORAGE_KEY)
  } catch {
    return null
  }
}

export default function ThemeToggle({ locale = 'en' }) {
  const [mode, setMode] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = (nextMode) => {
      root.dataset.colorMode = nextMode
      setMode(nextMode)
    }

    apply(currentMode())

    const handleStorage = (event) => {
      if (event.key !== COLOR_MODE_STORAGE_KEY) return
      if (event.newValue === 'dark' || event.newValue === 'light') {
        apply(event.newValue)
      }
    }

    const handleSystemChange = (event) => {
      if (savedMode()) return
      apply(event.matches ? 'dark' : 'light')
    }

    window.addEventListener('storage', handleStorage)
    media.addEventListener('change', handleSystemChange)
    return () => {
      window.removeEventListener('storage', handleStorage)
      media.removeEventListener('change', handleSystemChange)
    }
  }, [])

  const isDark = mode === 'dark'
  const label = locale === 'vi'
    ? (isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối')
    : (isDark ? 'Switch to light mode' : 'Switch to dark mode')

  const toggleMode = () => {
    const nextMode = currentMode() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.colorMode = nextMode
    try {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode)
    } catch {
      // The visual toggle still works for this document when storage is blocked.
    }
    setMode(nextMode)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={toggleMode}
    >
      <i className="ti ti-moon theme-toggle-moon" aria-hidden="true" />
      <i className="ti ti-sun theme-toggle-sun" aria-hidden="true" />
    </button>
  )
}
