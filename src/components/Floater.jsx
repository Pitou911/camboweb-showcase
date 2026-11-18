import { NeonC } from './Devices'

// Small 3D objects that drift in the page margins on wide screens (pure CSS 3D, decorative only).
//   coin: a dollar / riel coin with a real edge  ·  cube: a glass cube carrying the CamboWeb mark
//   ring: the neon C from the logo
// side: 'left' | 'right'; top: CSS length from the section top.
export default function Floater({ kind, side = 'right', top = '20%', size }) {
  return (
    <div className={`fl fl-${side}`} style={{ top, ...(size ? { '--s': `${size}px` } : {}) }} aria-hidden="true">
      <div className={`fl-obj fl-${kind}`}>
        {kind === 'coin' && (
          <>
            <i className="coin-face coin-front">$</i>
            {Array.from({ length: 8 }, (_, i) => <i key={i} className="coin-edge" style={{ '--i': i }} />)}
            <i className="coin-face coin-back">៛</i>
          </>
        )}
        {kind === 'cube' && ['f', 'b', 'l', 'r', 't', 'd'].map((f) => (
          <i key={f} className={`cube-face cube-${f}`}>{f === 'f' || f === 'b' ? <img src="/img/camboweb-pfp-neon-black.png" alt="" /> : null}</i>
        ))}
        {kind === 'ring' && <NeonC />}
      </div>
    </div>
  )
}
