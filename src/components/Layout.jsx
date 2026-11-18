import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { site } from '../data/site'

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
            <NavLink to="/" end>Templates</NavLink>
            <NavLink to="/work">Client work</NavLink>
            <NavLink to="/about">About</NavLink>
            <Link className="btn btn-ink btn-sm" to="/contact">Start a project</Link>
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
            <h2>Have something in mind?</h2>
            <div>
              <p>Tell us about it in a few lines. We reply within a day, in Khmer or English.</p>
              <Link className="btn btn-ink" to="/contact">Start a project</Link>
            </div>
          </div>
        )}
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Websites, e-invitations and business systems, built in Phnom Penh.</p>
          </div>
          <nav aria-label="Templates">
            <h3>Templates</h3>
            <Link to="/#invitations">E-invitations</Link>
            <Link to="/#websites">Websites</Link>
            <Link to="/#pos">POS system</Link>
          </nav>
          <nav aria-label="Studio">
            <h3>Studio</h3>
            <Link to="/work">Client work</Link>
            <Link to="/about">About us</Link>
            <Link to="/about#process">How we work</Link>
          </nav>
          <nav aria-label="Contact">
            <h3>Contact</h3>
            <Link to="/contact">Contact us</Link>
            {site.telegram && <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer">Telegram</a>}
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          </nav>
        </div>
        <p className="wrap footer-small">© {new Date().getFullYear()} CamboWeb, Phnom Penh, Cambodia</p>
      </footer>
    </>
  )
}
