// Shared behaviour for CamboWeb invitation templates.
//
// Personalisation (from the link, or live from the showcase page via postMessage):
//   ?a=Name&b=Name&to=Guest&date=2027-03-13&venue=Place
//   [data-field="a|b|guest|venue"]  -> text replaced
//   [data-date="d|dd|mm|yy|yyyy|month|mon|weekday"] -> formatted from date
//   [data-countdown="ISO"] keeps its time of day, takes the new date
// Other helpers:
//   [data-reveal] gets .in on scroll
(function () {
  // Invitations scroll by touch, wheel or keys; a visible scrollbar looks out of place on them.
  const hideBars = document.createElement('style')
  hideBars.textContent = 'html,body,*{scrollbar-width:none;-ms-overflow-style:none}*::-webkit-scrollbar{display:none;width:0;height:0}'
  document.head.appendChild(hideBars)

  const pad = (n) => String(n).padStart(2, '0')
  const counters = []

  // ---------- countdown ----------
  document.querySelectorAll('[data-countdown]').forEach((el) => {
    const c = { el, target: new Date(el.dataset.countdown), parts: {} }
    el.querySelectorAll('[data-u]').forEach((u) => (c.parts[u.dataset.u] = u))
    counters.push(c)
  })
  const tick = () => counters.forEach(({ target, parts }) => {
    let s = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000))
    const d = Math.floor(s / 86400); s -= d * 86400
    const h = Math.floor(s / 3600); s -= h * 3600
    const m = Math.floor(s / 60); s -= m * 60
    if (parts.d) parts.d.textContent = pad(d)
    if (parts.h) parts.h.textContent = pad(h)
    if (parts.m) parts.m.textContent = pad(m)
    if (parts.s) parts.s.textContent = pad(s)
  })
  tick()
  setInterval(tick, 1000)

  // ---------- personalisation ----------
  const fmt = (date, f) => {
    const loc = 'en-GB'
    switch (f) {
      case 'd': return String(date.getDate())
      case 'dd': return pad(date.getDate())
      case 'mm': return pad(date.getMonth() + 1)
      case 'yy': return String(date.getFullYear()).slice(2)
      case 'yyyy': return String(date.getFullYear())
      case 'month': return date.toLocaleDateString(loc, { month: 'long' })
      case 'mon': return date.toLocaleDateString(loc, { month: 'short' })
      case 'monthyear': return date.toLocaleDateString(loc, { month: 'long', year: 'numeric' })
      case 'weekday': return date.toLocaleDateString(loc, { weekday: 'long' })
      case 'long': return date.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      default: return ''
    }
  }

  function apply(fields) {
    Object.entries(fields).forEach(([k, v]) => {
      if (k === 'date' || v == null) return
      const val = String(v).trim()
      if (!val) return
      document.querySelectorAll(`[data-field="${k}"]`).forEach((n) => (n.textContent = val))
    })
    if (fields.date && /^\d{4}-\d{2}-\d{2}$/.test(fields.date)) {
      const [y, m, d] = fields.date.split('-').map(Number)
      const date = new Date(y, m - 1, d, 12)
      document.querySelectorAll('[data-date]').forEach((n) => (n.textContent = fmt(date, n.dataset.date)))
      counters.forEach((c) => {
        const t = new Date(c.el.dataset.countdown)
        c.target = new Date(y, m - 1, d, t.getHours(), t.getMinutes())
      })
      tick()
    }
    document.dispatchEvent(new CustomEvent('invite:fields', { detail: fields }))
  }

  const q = new URLSearchParams(location.search)
  const fromUrl = {}
  ;['a', 'b', 'venue', 'date'].forEach((k) => q.get(k) && (fromUrl[k] = q.get(k)))
  if (q.get('to')) fromUrl.guest = q.get('to')
  // run after each template's own scripts so their listeners see it
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => apply(fromUrl))
  else setTimeout(() => apply(fromUrl))

  window.addEventListener('message', (e) => {
    if (e.origin !== location.origin) return
    if (e.data && e.data.type === 'cw-fields') apply(e.data.fields || {})
  })

  // ---------- reveal on scroll ----------
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  const io = !calm && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
        })
      }, { threshold: 0, rootMargin: '0px 0px -6% 0px' })
    : null
  document.querySelectorAll('[data-reveal]').forEach((el) => (io ? io.observe(el) : el.classList.add('in')))
})()
