/* eslint-disable react-refresh/only-export-components */
// Visitor preferences: language (English / Khmer) and colour theme (light / dark).
// Both are remembered in this browser; the theme follows the device until the visitor picks one.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const read = (k) => { try { return localStorage.getItem(k) } catch { return null } }
const write = (k, v) => { try { localStorage.setItem(k, v) } catch { /* storage blocked */ } }

const Prefs = createContext(null)

export function PrefsProvider({ children }) {
  const [lang, setLangState] = useState(() => (read('cw-lang') === 'kh' ? 'kh' : 'en'))
  const [theme, setThemeState] = useState(() => {
    const saved = read('cw-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'kh' ? 'km' : 'en'
    document.documentElement.dataset.lang = lang
  }, [lang])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#071318' : '#f7f9f9')
  }, [theme])

  const setLang = useCallback((l) => { setLangState(l); write('cw-lang', l) }, [])
  const setTheme = useCallback((t) => { setThemeState(t); write('cw-theme', t) }, [])
  // t('English', 'ខ្មែរ') picks the visitor's language, falling back to English.
  const t = useCallback((en, kh) => (lang === 'kh' && kh ? kh : en), [lang])
  // pick(obj) returns obj.kh merged over obj for Khmer (used for data with a `kh` block).
  const pick = useCallback((obj) => (lang === 'kh' && obj?.kh ? { ...obj, ...obj.kh } : obj), [lang])

  const value = useMemo(() => ({ lang, setLang, theme, setTheme, t, pick }), [lang, setLang, theme, setTheme, t, pick])
  return <Prefs.Provider value={value}>{children}</Prefs.Provider>
}

export const usePrefs = () => useContext(Prefs)
