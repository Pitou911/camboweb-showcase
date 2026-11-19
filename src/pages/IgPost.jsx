import { useParams } from 'react-router-dom'
import HeroTech from '../components/HeroTech'
import Icon from '../components/Icon'

// Dev-only pages used to render Instagram posts (1080 x 1350, 4:5). /ig/1, /ig/2, /ig/3.
// Designed as one row on the profile grid: light / dark / light.

function Brand() {
  return (
    <div className="ig-brand">
      <img src="/img/camboweb-pfp-neon-black.png" alt="" />
      <span><b>cambo</b>web</span>
    </div>
  )
}

const BUILD = [
  ['globe', 'Business websites', 'Booking, menus and prices in USD & riel.'],
  ['mail', 'E-invitations', 'Each guest’s name on the cover, music and KHQR.'],
  ['pos', 'POS systems', 'Tablet point-of-sale for marts, cafés and restaurants.'],
]

// One 3240 x 1440 scene, cut into three 1080 x 1440 (3:4) posts. Circuits cross the cuts so the
// profile row reads as one picture; no text crosses a cut.
// Sweeping ribbons that run across all three posts (gradient strokes), plus curved connectors
// from the cube to the headline and to each service card.
const RIBBONS = [
  ['M-100 1180 C 500 1420, 1000 640, 1620 860 S 2650 1320, 3340 760', 5, 0.9],
  ['M-100 1260 C 560 1480, 1060 760, 1640 960 S 2700 1400, 3340 880', 2.5, 0.55],
  ['M-100 1100 C 420 1330, 960 560, 1600 760 S 2620 1220, 3340 640', 2, 0.35],
  ['M-100 260 C 600 80, 1100 420, 1620 300 S 2600 60, 3340 300', 2, 0.3],
  ['M-100 340 C 640 160, 1140 500, 1640 380 S 2640 140, 3340 380', 1.5, 0.2],
]
const LINKS = [
  'M1204 959 C 1040 1080, 760 1010, 520 1120',
  'M1259 1060 C 1080 1200, 820 1220, 610 1260',
  'M2105 599 C 2170 560, 2200 535, 2256 535',
  'M2076 853 C 2150 820, 2190 770, 2256 765',
  'M1906 1174 C 2040 1120, 2150 1005, 2256 995',
]
const NODES = [[520, 1120], [610, 1260], [2256, 535], [2256, 765], [2256, 995], [1620, 860]]

function Pano() {
  return (
    <div className="pano">
      <svg className="pano-wires" viewBox="0 0 3240 1440" aria-hidden="true">
        <defs>
          <linearGradient id="rib" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2bd9f0" stopOpacity="0" />
            <stop offset="0.2" stopColor="#2bd9f0" />
            <stop offset="0.55" stopColor="#5b8cff" />
            <stop offset="0.85" stopColor="#2bd9f0" />
            <stop offset="1" stopColor="#2bd9f0" stopOpacity="0" />
          </linearGradient>
          <filter id="rib-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path d={RIBBONS[0][0]} className="rib-glow" filter="url(#rib-glow)" />
        {RIBBONS.map(([d, w, o]) => <path key={d} d={d} stroke="url(#rib)" strokeWidth={w} opacity={o} className="rib" />)}
        {LINKS.map((d) => <path key={d} d={d} className="link" />)}
        {NODES.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="10" />)}
      </svg>
      <div className="pano-art"><HeroTech /></div>

      <div className="pano-left">
        <Brand />
        <div>
          <p className="eyebrow">Web studio in Phnom Penh</p>
          <h1>Software that helps your business <em>grow.</em></h1>
          <p className="ig-sub">Websites, e-invitations and POS systems, in Khmer and English.</p>
        </div>
      </div>

      <div className="pano-right">
        <div>
          <p className="eyebrow">What we build</p>
          <h2>Everything your business runs on.</h2>
        </div>
        <ul className="pano-cards">
          {BUILD.map(([icon, t, d]) => (
            <li key={t}><span className="svc-ico"><Icon name={icon} size={36} /></span><div><b>{t}</b><span>{d}</span></div></li>
          ))}
        </ul>
        <div className="pano-foot">
          <b>Try it live before you buy.</b>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    </div>
  )
}

export default function IgPost() {
  const { n } = useParams()

  if (n === 'pano') return <Pano />

  if (n === '2') {
    return (
      <div className="ig ig-dark">
        <div>
          <p className="eyebrow">Built in Cambodia, for Cambodia</p>
        </div>
        <div className="ig-art"><HeroTech /></div>
        <div>
          <h2>Try it live<br />before you buy.</h2>
          <p className="ig-sub">Real templates you can open, tap and test on your phone.</p>
        </div>
      </div>
    )
  }

  if (n === '3') {
    return (
      <div className="ig">
        <div>
          <p className="eyebrow">What we build</p>
          <h2>Everything your business runs on.</h2>
        </div>
        <ul className="ig-list">
          {BUILD.map(([icon, t, d]) => (
            <li key={t}><span className="svc-ico"><Icon name={icon} size={34} /></span><div><b>{t}</b><span>{d}</span></div></li>
          ))}
        </ul>
        <div className="ig-foot">
          <div className="ig-chips"><span>Khmer &amp; English</span><span>USD &amp; riel</span><span>KHQR</span></div>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    )
  }

  return (
    <div className="ig">
      <Brand />
      <div>
        <p className="eyebrow">Web studio in Phnom Penh</p>
        <h1>Software that helps your business <em>grow.</em></h1>
      </div>
      <div className="ig-foot">
        <p className="ig-sub">Websites, e-invitations and POS systems, in Khmer and English.</p>
        <span className="fb-url">cambo-web.com</span>
      </div>
    </div>
  )
}
