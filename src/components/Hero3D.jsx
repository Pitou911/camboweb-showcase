import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Laptop, NeonC, Phone, Tablet } from './Devices'

const W = 640 // design width of the stage; scaled to fit its container

export default function Hero3D() {
  const box = useRef(null)
  const scene = useRef(null)

  // Scale the fixed-size stage to the container width.
  useEffect(() => {
    const el = box.current
    const ro = new ResizeObserver(([e]) => {
      el.style.setProperty('--k', Math.min(1, e.contentRect.width / W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Tilt toward the pointer, and turn + spread apart as the page scrolls.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = window.matchMedia('(pointer: fine)').matches
    let tx = 0, ty = 0, x = 0, y = 0, sp = 0, raf
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      const target = Math.min(1, window.scrollY / 520)
      sp += (target - sp) * 0.1
      const s = scene.current
      if (s) {
        s.style.setProperty('--ry', `${-18 + x * 7 + sp * 22}deg`)
        s.style.setProperty('--rx', `${16 - y * 5 + sp * 10}deg`)
        s.style.setProperty('--sp', sp.toFixed(3))
      }
      raf = requestAnimationFrame(tick)
    }
    if (fine) window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="stage-box" ref={box}>
      <div className="stage">
        <div className="scene" ref={scene}>
          <div className="floor"><NeonC /></div>
          <Link to="/work/saravoan-labo" className="obj obj-laptop" aria-label="Saravoan Labo case study">
            <div className="rise"><Laptop src="/img/saravoan-register.jpg" /></div>
          </Link>
          <Link to="/work/lori-pos" className="obj obj-tablet" aria-label="LoRi POS case study">
            <div className="rise"><Tablet /></div>
          </Link>
          <Link to="/#invitations" className="obj obj-phone" aria-label="Invitation templates">
            <div className="rise"><Phone /></div>
          </Link>
        </div>
      </div>
    </div>
  )
}
