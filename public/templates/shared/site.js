// Shared behaviour for CamboWeb website templates.
//  - ?name=Business  -> [data-field="name"] text (also live via postMessage {type:'cw-fields'})
//  - [data-reveal] fades in on scroll; body.scrolled after 40px
//  - CW.toast(msg), CW.ref(prefix) for demo booking references
(function () {
  const apply = (fields) => {
    if (fields.name && fields.name.trim()) {
      document.querySelectorAll('[data-field="name"]').forEach((n) => (n.textContent = fields.name.trim()))
      document.title = fields.name.trim() + document.title.replace(/^[^·]*/, ' ')
    }
  }
  const q = new URLSearchParams(location.search)
  if (q.get('name')) apply({ name: q.get('name') })
  addEventListener('message', (e) => {
    if (e.origin === location.origin && e.data && e.data.type === 'cw-fields') apply(e.data.fields || {})
  })

  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 40)
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
  const io = !calm && 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.15 })
    : null
  document.querySelectorAll('[data-reveal]').forEach((el) => (io ? io.observe(el) : el.classList.add('in')))

  let toastEl
  window.CW = {
    toast(msg) {
      if (!toastEl) {
        toastEl = document.createElement('div')
        toastEl.setAttribute('role', 'status')
        toastEl.style.cssText = 'position:fixed;left:50%;bottom:84px;z-index:100;transform:translate(-50%,20px);opacity:0;padding:12px 20px;border-radius:99px;background:rgba(20,20,20,.92);color:#fff;font:500 14px system-ui,sans-serif;transition:all .35s;pointer-events:none;max-width:90vw;text-align:center'
        document.body.appendChild(toastEl)
      }
      toastEl.textContent = msg
      toastEl.style.opacity = '1'; toastEl.style.transform = 'translate(-50%,0)'
      clearTimeout(toastEl._t)
      toastEl._t = setTimeout(() => { toastEl.style.opacity = '0'; toastEl.style.transform = 'translate(-50%,20px)' }, 2600)
    },
    ref(prefix) {
      const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let s = ''
      for (let i = 0; i < 5; i++) s += a[Math.floor(Math.random() * a.length)]
      return `${prefix}-${s}`
    },
    days(n) {
      const out = []
      const d = new Date(); d.setHours(12, 0, 0, 0)
      for (let i = 0; i < n; i++) { out.push(new Date(d)); d.setDate(d.getDate() + 1) }
      return out
    },
    // deterministic "already booked" slots so the demo feels real
    taken(date, slot) {
      const k = date.getDate() * 31 + date.getMonth() * 7 + slot.length + slot.charCodeAt(0) + slot.charCodeAt(slot.length - 1)
      return (k * 2654435761 % 100) < 28
    },
  }
})()
