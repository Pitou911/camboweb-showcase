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

  // Gentle tilt toward the pointer, eased with requestAnimationFrame.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    let tx = 0, ty = 0, x = 0, y = 0, raf
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      scene.current?.style.setProperty('--ry', `${-18 + x * 7}deg`)
      scene.current?.style.setProperty('--rx', `${16 - y * 5}deg`)
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
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
            <div className="rise"><Laptop src="/img/saravoan-template-editor.png" /></div>
          </Link>
          <Link to="/work/lori-pos" className="obj obj-tablet" aria-label="LoRi POS case study">
            <div className="rise"><Tablet /></div>
          </Link>
          <Link to="/work/engagement-invitation" className="obj obj-phone" aria-label="Engagement e-invitation case study">
            <div className="rise"><Phone /></div>
          </Link>
        </div>
      </div>
    </div>
  )
}
