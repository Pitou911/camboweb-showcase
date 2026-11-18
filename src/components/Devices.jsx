// Device mock-ups that hold each project's real UI. Pure CSS, no images of devices.

const TABLES = ['free', 'seated', 'new', 'free', 'billed', 'seated', 'free', 'new', 'seated']

export function Tablet() {
  return (
    <div className="dev dev-tablet">
      <div className="screen lori-screen">
        <div className="lori-top">
          <img src="/img/lori-wordmark.png" alt="" />
          <span>Floor</span>
        </div>
        <div className="lori-grid">
          {TABLES.map((s, i) => (
            <span key={i} className={`tbl tbl-${s}`}>T{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Laptop({ src }) {
  return (
    <div className="dev dev-window">
      <div className="window-bar"><i /><i /><i /></div>
      <div className="screen">
        <img src={src} alt="" />
      </div>
    </div>
  )
}

export function Phone() {
  return (
    <div className="dev dev-phone">
      <div className="screen invite-screen">
        <img className="leaf leaf-a" src="/img/eucalyptus.png" alt="" />
        <img className="leaf leaf-b" src="/img/eucalyptus.png" alt="" />
        <div className="paper">
          <span className="p-eyebrow">Engagement</span>
          <span className="p-script">Save the date</span>
          <span className="p-kh">សូមគោរពអញ្ជើញ</span>
          <span className="p-date">06 12 2026</span>
        </div>
      </div>
    </div>
  )
}

// One SVG drawing of the CamboWeb "C" mark, used as the glowing platform.
export function NeonC({ className = '' }) {
  return (
    <svg className={`neon-c ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4FF0F8" />
          <stop offset="1" stopColor="#0AA6EE" />
        </linearGradient>
      </defs>
      <path
        className="c-arc"
        d="M146 62 A62 62 0 1 0 146 138"
        fill="none"
        stroke="url(#cg)"
        strokeWidth="22"
        strokeLinecap="round"
        pathLength="100"
      />
      <circle className="c-dot" cx="160" cy="100" r="10" fill="#BDF4FB" />
    </svg>
  )
}
