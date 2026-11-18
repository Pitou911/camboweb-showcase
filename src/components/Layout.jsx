import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="CamboWeb home">
      <img src="/img/camboweb-pfp-neon-black.png" alt="" />
      <span><b>cambo</b>web</span>
    </Link>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="wrap nav-inner">
          <Logo />
          <nav aria-label="Main">
            <Link to="/#work">Work</Link>
            <Link to="/#process">How we work</Link>
            <a className="btn btn-ink btn-sm" href="#contact">Contact us</a>
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="footer" id="contact">
        <div className="wrap">
          <div className="footer-top">
            <img className="footer-logo" src="/img/camboweb-logo-neon-horizontal.png" alt="CamboWeb" />
            <div className="footer-cta">
              <h2>Tell us what your business needs.</h2>
              <p>We reply within a day, in Khmer or English.</p>
              {/* TODO: replace with real contact details */}
              <a className="btn btn-neon" href="https://t.me/" target="_blank" rel="noreferrer">Message us on Telegram</a>
            </div>
          </div>
          <p className="footer-small">© {new Date().getFullYear()} CamboWeb, Phnom Penh</p>
        </div>
      </footer>
    </>
  )
}
