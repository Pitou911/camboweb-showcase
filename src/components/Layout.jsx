import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="CamboWeb home">
      <img src="/img/camboweb-pfp-neon-black.png" alt="" />
      <span>cambo<b>web</b></span>
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
      <header className="nav">
        <div className="wrap nav-inner">
          <Logo />
          <nav>
            <NavLink to="/#work">Work</NavLink>
            <NavLink to="/#services">Services</NavLink>
            <a className="btn btn-sm" href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer" id="contact">
        <div className="wrap footer-inner">
          <div className="footer-cta">
            <img className="footer-logo" src="/img/camboweb-logo-neon-horizontal.png" alt="CamboWeb" />
            <h2>Have a project in mind?</h2>
            <p>We build websites, apps and systems for businesses in Cambodia.</p>
            {/* TODO: replace with real contact details */}
            <div className="footer-links">
              <a className="btn btn-neon" href="https://t.me/" target="_blank" rel="noreferrer">Message us on Telegram</a>
            </div>
          </div>
          <p className="footer-small">© {new Date().getFullYear()} CamboWeb · Web Studio · Phnom Penh</p>
        </div>
      </footer>
    </>
  )
}
