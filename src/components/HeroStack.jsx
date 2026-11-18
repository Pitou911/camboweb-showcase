import { useEffect, useRef } from 'react'
import { usePrefs } from '../prefs'

// The three things we sell, as real screenshots stacked in 3D.
// The stack tilts toward the pointer (or sways gently on touch screens), each layer at its own depth.
// Each device is a link to its live template section below.
export default function HeroStack() {
  const scene = useRef(null)
  const { t } = usePrefs()

  useEffect(() => {
    const el = scene.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = window.matchMedia('(pointer: fine)').matches
    let tx = 0, ty = 0, x = 0, y = 0, raf, start = performance.now()
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = (now) => {
      if (!fine) { const k = (now - start) / 1000; tx = Math.sin(k * 0.5) * 0.6; ty = Math.cos(k * 0.4) * 0.4 }
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      el.style.setProperty('--ry', `${-14 + x * 10}deg`)
      el.style.setProperty('--rx', `${10 - y * 7}deg`)
      raf = requestAnimationFrame(tick)
    }
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="hs">
      <div className="hs-scene" ref={scene}>
        <a href="#pos" className="hs-dev hs-tablet" aria-label={t('POS templates', 'គំរូប្រព័ន្ធលក់')}>
          <span className="hs-frame"><img src="/img/shot-pos.jpg" alt="" /></span>
          <span className="hs-tag">POS</span>
        </a>
        <a href="#websites" className="hs-dev hs-browser" aria-label={t('Website templates', 'គំរូគេហទំព័រ')}>
          <span className="hs-bar"><i /><i /><i /><span>kampottable.com</span></span>
          <img src="/img/shot-restaurant.jpg" alt="" />
          <span className="hs-tag">{t('Website', 'គេហទំព័រ')}</span>
        </a>
        <a href="#invitations" className="hs-dev hs-phone" aria-label={t('Invitation templates', 'គំរូធៀប')}>
          <span className="hs-frame"><img src="/img/shot-golden-lotus.jpg" alt="" /></span>
          <span className="hs-tag">{t('Invitation', 'ធៀប')}</span>
        </a>

        <span className="hs-chip c1" aria-hidden="true"><b>KHQR</b></span>
        <span className="hs-chip c2" aria-hidden="true"><b>$</b> / រៀល</span>
        <span className="hs-chip c3" aria-hidden="true">ខ្មែរ / EN</span>
      </div>
    </div>
  )
}
