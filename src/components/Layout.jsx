import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { site } from '../data/site'
import { usePrefs } from '../prefs'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="CamboWeb home">
      <img src="/img/camboweb-pfp-neon-black.png" alt="" />
      <span><b>cambo</b>web</span>
    </Link>
  )
}

function Prefs() {
  const { lang, setLang, theme, setTheme, t } = usePrefs()
  const dark = theme === 'dark'
  return (
    <div className="prefs">
      <button
        type="button"
        className="toggle lang-toggle"
        onClick={() => setLang(lang === 'kh' ? 'en' : 'kh')}
        aria-label={lang === 'kh' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}
        title={lang === 'kh' ? 'English' : 'ខ្មែរ'}
      >
        {lang === 'kh' ? 'EN' : 'ខ្មែរ'}
      </button>
      <button
        type="button"
        className="toggle"
        onClick={() => setTheme(dark ? 'light' : 'dark')}
        aria-label={dark ? t('Switch to light mode', 'ប្តូរទៅពន្លឺភ្លឺ') : t('Switch to dark mode', 'ប្តូរទៅពន្លឺងងឹត')}
        title={dark ? t('Light mode', 'ពន្លឺភ្លឺ') : t('Dark mode', 'ពន្លឺងងឹត')}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.6A8.5 8.5 0 1 1 9.4 4a6.8 6.8 0 0 0 10.6 10.6Z" /></svg>
        )}
      </button>
    </div>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const { t } = usePrefs()

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#main">{t('Skip to content', 'រំលងទៅមាតិកា')}</a>
      <header className="nav">
        <div className="wrap nav-inner">
          <Logo />
          <nav aria-label="Main">
            <NavLink to="/" end>{t('Templates', 'គំរូ')}</NavLink>
            <NavLink to="/work">{t('Client work', 'ស្នាដៃ')}</NavLink>
            <NavLink to="/about">{t('About', 'អំពីយើង')}</NavLink>
            <Prefs />
            <Link className="btn btn-ink btn-sm" to="/contact">{t('Start a project', 'ចាប់ផ្តើមគម្រោង')}</Link>
          </nav>
        </div>
      </header>
      <main id="main">
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        {pathname !== '/contact' && (
          <div className="wrap footer-band">
            <h2>{t('Have something in mind?', 'មានគំនិតអ្វីមួយមែនទេ?')}</h2>
            <div>
              <p>{t('Tell us about it in a few lines. We reply within a day, in Khmer or English.', 'ប្រាប់យើងបន្តិចបន្តួច។ យើងឆ្លើយតបក្នុងរយៈពេលមួយថ្ងៃ ជាភាសាខ្មែរ ឬអង់គ្លេស។')}</p>
              <Link className="btn btn-ink" to="/contact">{t('Start a project', 'ចាប់ផ្តើមគម្រោង')}</Link>
            </div>
          </div>
        )}
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{t('Websites, e-invitations and business systems, built in Phnom Penh.', 'គេហទំព័រ ធៀបឌីជីថល និងប្រព័ន្ធអាជីវកម្ម បង្កើតនៅភ្នំពេញ។')}</p>
          </div>
          <nav aria-label={t('Templates', 'គំរូ')}>
            <h3>{t('Templates', 'គំរូ')}</h3>
            <Link to="/#invitations">{t('E-invitations', 'ធៀបឌីជីថល')}</Link>
            <Link to="/#websites">{t('Websites', 'គេហទំព័រ')}</Link>
            <Link to="/#pos">{t('POS systems', 'ប្រព័ន្ធលក់ POS')}</Link>
          </nav>
          <nav aria-label={t('Studio', 'ស្ទូឌីយោ')}>
            <h3>{t('Studio', 'ស្ទូឌីយោ')}</h3>
            <Link to="/work">{t('Client work', 'ស្នាដៃ')}</Link>
            <Link to="/about">{t('About us', 'អំពីយើង')}</Link>
            <Link to="/about#process">{t('How we work', 'របៀបយើងធ្វើការ')}</Link>
          </nav>
          <nav aria-label={t('Contact', 'ទំនាក់ទំនង')}>
            <h3>{t('Contact', 'ទំនាក់ទំនង')}</h3>
            <Link to="/contact">{t('Contact us', 'ទាក់ទងយើង')}</Link>
            {site.telegram && <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer">Telegram</a>}
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          </nav>
        </div>
        <p className="wrap footer-small">© {new Date().getFullYear()} CamboWeb, {t('Phnom Penh, Cambodia', 'ភ្នំពេញ កម្ពុជា')}</p>
      </footer>
    </>
  )
}
