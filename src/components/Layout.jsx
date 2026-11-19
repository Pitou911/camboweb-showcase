import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { site } from '../data/site'
import { usePrefs } from '../prefs'
import Icon from './Icon'
import useScrollAnim from './useScrollAnim'
import usePageMeta from './usePageMeta'

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
  const { t, lang } = usePrefs()
  useScrollAnim(pathname + lang)
  usePageMeta(pathname)

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
          <nav className="nav-links" aria-label="Main">
            <NavLink to="/" end>{t('Home', 'ទំព័រដើម')}</NavLink>
            <NavLink to="/work">{t('Work', 'ស្នាដៃ')}</NavLink>
            <NavLink to="/about">{t('About', 'អំពីយើង')}</NavLink>
            <NavLink to="/contact">{t('Contact', 'ទំនាក់ទំនង')}</NavLink>
          </nav>
          <div className="nav-end">
            <Prefs />
            <Link className="btn btn-ink btn-sm" to="/contact">{t('Let’s talk', 'ពិភាក្សាជាមួយយើង')} <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
      </header>
      <main id="main">
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>
      {pathname !== '/contact' && (
        <section className="wrap cta-strip" aria-label={t('Start a project', 'ចាប់ផ្តើមគម្រោង')}>
          <span className="cta-ico"><Icon name="send" size={26} /></span>
          <div>
            <h2>{t('Ready to start your next project?', 'ត្រៀមចាប់ផ្តើមគម្រោងបន្ទាប់របស់អ្នកហើយឬនៅ?')}</h2>
            <p>{t('Tell us about it in a few lines. We reply within a day, in Khmer or English.', 'ប្រាប់យើងបន្តិចបន្តួច។ យើងឆ្លើយតបក្នុងរយៈពេលមួយថ្ងៃ ជាភាសាខ្មែរ ឬអង់គ្លេស។')}</p>
          </div>
          <Link className="btn btn-ink" to="/contact">{t('Get in touch', 'ទាក់ទងយើង')} <Icon name="arrow" size={18} /></Link>
        </section>
      )}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{t('We build websites, e-invitations and business systems for Cambodian businesses, from Phnom Penh.', 'យើងបង្កើតគេហទំព័រ ធៀបឌីជីថល និងប្រព័ន្ធអាជីវកម្ម សម្រាប់អាជីវកម្មខ្មែរ ពីភ្នំពេញ។')}</p>
          </div>
          <nav aria-label={t('Quick links', 'តំណរហ័ស')}>
            <h3>{t('Quick links', 'តំណរហ័ស')}</h3>
            <Link to="/">{t('Home', 'ទំព័រដើម')}</Link>
            <Link to="/work">{t('Work', 'ស្នាដៃ')}</Link>
            <Link to="/about">{t('About us', 'អំពីយើង')}</Link>
            <Link to="/contact">{t('Contact', 'ទំនាក់ទំនង')}</Link>
          </nav>
          <nav aria-label={t('Templates', 'គំរូ')}>
            <h3>{t('Templates', 'គំរូ')}</h3>
            <Link to="/#invitations">{t('E-invitations', 'ធៀបឌីជីថល')}</Link>
            <Link to="/#websites">{t('Websites', 'គេហទំព័រ')}</Link>
            <Link to="/#pos">{t('POS systems', 'ប្រព័ន្ធលក់ POS')}</Link>
          </nav>
          <nav aria-label={t('Company', 'ក្រុមហ៊ុន')}>
            <h3>{t('Company', 'ក្រុមហ៊ុន')}</h3>
            <Link to="/about#process">{t('How we work', 'របៀបយើងធ្វើការ')}</Link>
            <Link to="/work/lori-pos">LoRi POS</Link>
            <Link to="/work/saravoan-labo">Saravoan Labo</Link>
          </nav>
          <div className="footer-contact">
            <h3>{t('Contact us', 'ទាក់ទងយើង')}</h3>
            {site.telegram && <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer"><Icon name="send" size={16} />@{site.telegram}</a>}
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, '')}`}><Icon name="bolt" size={16} />{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`}><Icon name="mail" size={16} />{site.email}</a>}
            <span><Icon name="globe" size={16} />{t('Phnom Penh, Cambodia', 'ភ្នំពេញ កម្ពុជា')}</span>
          </div>
        </div>
        <div className="wrap footer-small">
          <span>© {new Date().getFullYear()} CamboWeb. {t('All rights reserved.', 'រក្សាសិទ្ធិគ្រប់យ៉ាង។')}</span>
          <span>{t('Made in Phnom Penh', 'បង្កើតនៅភ្នំពេញ')}</span>
        </div>
      </footer>
    </>
  )
}
