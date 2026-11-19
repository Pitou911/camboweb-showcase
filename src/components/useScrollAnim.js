import { useEffect } from 'react'

// Scroll animations for every page. Elements matching these selectors get data-anim="<kind>";
// they animate in when they enter the screen and back out when they leave it.
// Cards in a group get a small stagger (--d). New elements (tab switches, route changes) are picked up too.
const GROUPS = [
  ['up', '.sh, .head-row, .hx-text, .page-hero-grid > *, .hero-text, .tabs, .studio, .site-studio, .row, .faq, .screens, .project-head, .next'],
  ['right', '.hx-visual, .stage-box, .contact-side'],
  ['left', '.contact'],
  ['pop', '.svc > li, .proj-card, .features > li, .steps > li, .chapter, .stats > li, .cta-strip, .work-card, .problems > details'],
]

export default function useScrollAnim(key) {
  useEffect(() => {
    const root = document.body
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    const seen = new WeakSet()
    const scan = () => {
      GROUPS.forEach(([kind, sel]) => {
        root.querySelectorAll(sel).forEach((el) => {
          if (seen.has(el) || el.closest('.nav, .footer')) return
          if (!el.dataset.anim) {
            // a block inside an already-animated block moves with it (cards may still pop inside)
            if (kind !== 'pop' && el.parentElement.closest('[data-anim]')) return
            el.dataset.anim = kind
            if (kind === 'pop') {
              const sibs = [...el.parentElement.children].filter((c) => c.matches(sel))
              el.style.setProperty('--d', `${(sibs.indexOf(el) % 6) * 80}ms`)
            }
          }
          seen.add(el)
          io.observe(el)
        })
      })
    }

    scan()
    const mo = new MutationObserver(() => scan())
    mo.observe(root, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [key])
}
