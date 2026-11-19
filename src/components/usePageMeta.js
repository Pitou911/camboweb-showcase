import { useEffect } from 'react'
import { getProject } from '../data/projects'

const SITE = 'https://cambo-web.com'
const BRAND = 'CamboWeb'

// Title + description per route, so each page has its own entry in Google and in link previews.
const PAGES = {
  '/': [
    'CamboWeb | Websites, E-invitations & POS Systems in Phnom Penh, Cambodia',
    'CamboWeb is a web studio in Phnom Penh building websites, e-invitations and POS systems for Cambodian businesses, in Khmer and English. Try our live templates.',
  ],
  '/work': [
    `Client work: POS, lab software and e-invitations | ${BRAND}`,
    'Case studies of software CamboWeb built for Cambodian businesses: a tablet POS for a bar, an offline lab system and a bilingual e-invitation.',
  ],
  '/about': [
    `About us: a web studio in Phnom Penh | ${BRAND}`,
    'CamboWeb designs and builds websites, e-invitations and business systems for Cambodian businesses. How we work and what you can count on.',
  ],
  '/contact': [
    `Contact us: start a project | ${BRAND}`,
    'Tell CamboWeb what you need: a website, an e-invitation, a POS or a custom system. We reply within a day, in Khmer or English.',
  ],
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function usePageMeta(pathname) {
  useEffect(() => {
    let [title, description] = PAGES[pathname] || PAGES['/']
    const m = pathname.match(/^\/work\/([^/]+)$/)
    if (m) {
      const p = getProject(m[1])
      if (p) [title, description] = [`${p.name}: ${p.type} case study | ${BRAND}`, p.tagline]
    }
    const url = SITE + (pathname === '/' ? '/' : pathname)
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
  }, [pathname])
}
