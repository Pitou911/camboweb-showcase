import { useRef } from 'react'
import { Laptop, Phone, Tablet } from './Devices'
import useScrollProgress from './useScrollProgress'

// A project's device on a tinted surface. It turns to face you as you scroll,
// and tilts toward the pointer when you hover it.
export default function Cover({ project, large = false }) {
  const ref = useRef(null)
  useScrollProgress(ref)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  const onLeave = () => {
    ref.current.style.setProperty('--tx', 0)
    ref.current.style.setProperty('--ty', 0)
  }

  const device =
    project.cover === 'lori' ? <Tablet /> :
    project.cover === 'saravoan' ? <Laptop src={project.screenshot} /> :
    <Phone />

  return (
    <div ref={ref} className={`cover cover-${project.cover} ${large ? 'cover-lg' : ''}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="cover-dev">{device}</div>
    </div>
  )
}
