// Isometric "tech" illustration for the home hero, drawn in SVG (no images).
// A glass cube with the CamboWeb C on one face and </> on the other, a glowing orb on top,
// and neon circuits running out to tiles for what we build: Web, POS, Invite, KHQR.
// Light pulses travel the circuits; everything stays still for reduced-motion visitors (see CSS).

// circuit paths: iso directions only (slope ±0.577), ending at a tile
const WIRES = [
  { id: 'w1', d: 'M386 205 L452 167 L452 120 L486 100', tile: [486, 100], label: 'Web' },
  { id: 'w2', d: 'M430 290 L500 330 L548 302', tile: [548, 302], label: 'POS' },
  { id: 'w3', d: 'M236 368 L170 406 L128 382 L92 403', tile: [92, 403], label: 'Invite' },
  { id: 'w4', d: 'M352 384 L420 423 L420 470 L450 487', tile: [450, 487], label: 'KHQR' },
]

function Tile({ x, y, label }) {
  // small isometric slab centred on (x, y)
  return (
    <g className="ht-tile">
      <path d={`M${x} ${y - 13} L${x + 26} ${y + 2} L${x} ${y + 17} L${x - 26} ${y + 2} Z`} className="ht-tile-top" />
      <path d={`M${x - 26} ${y + 2} L${x} ${y + 17} L${x} ${y + 23} L${x - 26} ${y + 8} Z`} className="ht-tile-l" />
      <path d={`M${x} ${y + 17} L${x + 26} ${y + 2} L${x + 26} ${y + 8} L${x} ${y + 23} Z`} className="ht-tile-r" />
      <text x={x} y={y - 22} textAnchor="middle" className="ht-label">{label}</text>
    </g>
  )
}

export default function HeroTech() {
  return (
    <svg className="ht" viewBox="0 0 600 560" role="img" aria-label="CamboWeb builds websites, POS systems, e-invitations and KHQR payments">
      <defs>
        <radialGradient id="ht-orb" cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#c9fbff" />
          <stop offset="0.45" stopColor="#36e0f2" />
          <stop offset="1" stopColor="#0b8fb0" />
        </radialGradient>
        <linearGradient id="ht-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2bd9f0" />
          <stop offset="1" stopColor="#1166d8" />
        </linearGradient>
        <linearGradient id="ht-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3d4d" />
          <stop offset="1" stopColor="#10242e" />
        </linearGradient>
        <linearGradient id="ht-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#264a5c" />
          <stop offset="1" stopColor="#152f3b" />
        </linearGradient>
        <filter id="ht-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* list bars, left */}
      <g className="ht-bars">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="0" y="0" width="120" height="16" rx="8" transform={`matrix(0.866 -0.5 0 1 34 ${236 + i * 30})`} />
        ))}
      </g>

      {/* circuits */}
      <g className="ht-wires">
        {WIRES.map((w) => <path key={w.id} id={w.id} d={w.d} />)}
        <path d="M170 300 L60 363" />
        <path d="M520 190 L580 155" />
      </g>
      <g className="ht-nodes" filter="url(#ht-glow)">
        {[[452, 167], [500, 330], [170, 406], [420, 423], [60, 363], [128, 382], [452, 120]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />)}
      </g>
      <g className="ht-pulses">
        {WIRES.map((w, i) => (
          <circle key={w.id} r="4">
            <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`}>
              <mpath href={`#${w.id}`} />
            </animateMotion>
          </circle>
        ))}
      </g>
      {WIRES.map((w) => <Tile key={w.id} x={w.tile[0]} y={w.tile[1]} label={w.label} />)}

      {/* the cube */}
      <g className="ht-cube">
        <ellipse cx="300" cy="430" rx="150" ry="40" className="ht-shadow" />
        {/* left face */}
        <path d="M170 180 L300 255 L300 405 L170 330 Z" fill="url(#ht-left)" className="ht-edge" />
        {/* right face */}
        <path d="M300 255 L430 180 L430 330 L300 405 Z" fill="url(#ht-right)" className="ht-edge" />
        {/* top face */}
        <path d="M300 105 L430 180 L300 255 L170 180 Z" fill="#163a48" className="ht-edge" />
        <path d="M300 122 L400 180 L300 238 L200 180 Z" fill="url(#ht-top)" className="ht-glass" />

        {/* </> on the left face */}
        <g transform="matrix(0.866 0.5 0 1 170 180)" className="ht-mark">
          <path d="M48 58 L30 75 L48 92 M102 58 L120 75 L102 92 M84 52 L66 98" />
        </g>
        {/* CamboWeb C on the right face */}
        <g transform="matrix(0.866 -0.5 0 1 300 255)" className="ht-mark ht-c" filter="url(#ht-glow)">
          <path d="M98 52 A32 32 0 1 0 98 98" />
          <circle cx="108" cy="75" r="5.5" />
        </g>

        {/* orb */}
        <circle cx="300" cy="172" r="40" className="ht-halo" />
        <circle cx="300" cy="172" r="30" fill="url(#ht-orb)" className="ht-orb" />
        <ellipse cx="290" cy="160" rx="10" ry="6" fill="#fff" opacity="0.6" />
      </g>

      {/* sparks rising from the orb */}
      <g className="ht-sparks">
        {[[270, 120, 0], [318, 96, 0.8], [292, 70, 1.6], [338, 130, 2.2], [252, 92, 2.9], [306, 52, 3.5]].map(([x, y, d]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
    </svg>
  )
}
