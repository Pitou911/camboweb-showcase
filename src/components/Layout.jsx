import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ContactForm from './ContactForm'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="CamboWeb home">
      <img src="/img/camboweb-pfp-neon-black.png" alt="" />
      <span><b>cambo</b>web</span>
    </Link>
  )
}

// The neon spotlight in dark sections follows the pointer.
function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      const el = e.target.closest?.('.night')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  useSpotlight()

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
            <NavLink to="/templates">Templates</NavLink>
            <Link to="/#process">How we work</Link>
            <a className="btn btn-ink btn-sm" href="#contact">Start a project</a>
          </nav>
        </div>
      </header>
      <main id="main">
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>
      <footer className="footer night" id="contact">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-cta">
              <img className="footer-logo" src="/img/camboweb-logo-neon-horizontal.png" alt="CamboWeb" />
              <h2>Tell us what your business needs.</h2>
              <p>Pick what you need, add a line about it, and we’ll get back to you within a day.</p>
            </div>
            <ContactForm />
          </div>
          <p className="footer-small"><span>© {new Date().getFullYear()} CamboWeb, Phnom Penh</span><span>Websites, apps and business systems</span></p>
        </div>
      </footer>
    </>
  )
}
