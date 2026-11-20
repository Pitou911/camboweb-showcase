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

// ---------- E-invitation row (light): one soft ribbon runs across all three posts ----------
const SOFT = [
  ['M-100 1240 C 600 1440, 1100 820, 1620 1000 S 2650 1380, 3340 900', 4, 0.55],
  ['M-100 1320 C 640 1500, 1140 920, 1640 1090 S 2700 1440, 3340 1000', 2, 0.3],
  ['M-100 160 C 600 20, 1100 300, 1620 200 S 2600 30, 3340 220', 2, 0.22],
]
function Soft({ offset }) {
  return (
    <svg className="inv-ribbon" viewBox={`${offset} 0 1080 1440`} aria-hidden="true">
      <defs>
        <linearGradient id={`soft${offset}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="3240" y2="0">
          <stop offset="0" stopColor="#0a9fb8" stopOpacity="0" />
          <stop offset="0.2" stopColor="#0a9fb8" />
          <stop offset="0.6" stopColor="#5b8cff" />
          <stop offset="0.9" stopColor="#0a9fb8" />
          <stop offset="1" stopColor="#0a9fb8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {SOFT.map(([d, w, o]) => <path key={d} d={d} stroke={`url(#soft${offset})`} strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" />)}
    </svg>
  )
}
function Phone({ src, className = '' }) {
  return <div className={`inv-phone ${className}`}><img src={src} alt="" /></div>
}
const FEATURES = [
  ['user', 'Each guest’s name', 'on the cover'],
  ['lang', 'Khmer & English', 'formal wording'],
  ['music', 'Background music', 'starts on open'],
  ['clock', 'Live countdown', 'to your big day'],
  ['pin', 'Map & directions', 'one tap to the venue'],
  ['qr', 'KHQR gifts', 'for guests far away'],
]
function Invite({ n }) {
  if (n === 'inv2') {
    return (
      <div className="ig inv">
        <Soft offset={1080} />
        <div>
          <p className="eyebrow">Personal for every guest</p>
          <h2>Every guest sees their own name.</h2>
        </div>
        <div className="inv-fan">
          <Phone src="/img/ig/garden1.jpg" className="f1" />
          <Phone src="/img/ig/garden3.jpg" className="f2" />
          <Phone src="/img/ig/garden2.jpg" className="f3" />
        </div>
        <p className="ig-sub inv-note">One link per guest, sent on Telegram or Messenger.</p>
      </div>
    )
  }
  if (n === 'inv3') {
    return (
      <div className="ig inv">
        <Soft offset={2160} />
        <div>
          <p className="eyebrow">All in one link</p>
          <h2>Everything your guests need.</h2>
        </div>
        <ul className="inv-feat">
          {FEATURES.map(([icon, t, d]) => (
            <li key={t}><span className="svc-ico"><Icon name={icon} size={34} /></span><b>{t}</b><span>{d}</span></li>
          ))}
        </ul>
        <div className="inv-cta">
          <b>Try 5 designs free</b>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    )
  }
  return (
    <div className="ig inv">
      <Soft offset={0} />
      <div>
        <p className="eyebrow">CamboWeb e-invitations</p>
        <h2>Your invitation, on every guest’s phone.</h2>
      </div>
      <div className="inv-hero">
        <Phone src="/img/ig/lotus.jpg" className="solo" />
        <div className="inv-tags">
          <span>Weddings</span><span>Engagements</span><span>Birthdays</span>
        </div>
      </div>
    </div>
  )
}

// ---------- Khmer template showcase row (light): one template per post ----------
const TPLS = {
  tpl1: {
    offset: 0, img: '/img/ig/lotus.jpg', name: 'Golden Lotus', sw: ['#6e0b18', '#d9b26a'],
    eyebrow: 'គំរូធៀបអាពាហ៍ពិពាហ៍', title: 'ធៀបការបែបខ្មែរបុរាណ',
    text: 'ទ្វារពណ៌ក្រហម និងមាសបើកចេញជា 3D ជាមួយផ្កាធ្លាក់ចុះ។',
    tags: ['ទ្វារបើកជា 3D', 'កម្មវិធីជាភាសាខ្មែរ', 'ឈ្មោះភ្ញៀវលើធៀប'],
  },
  tpl2: {
    offset: 1080, img: '/img/ig/garden3.jpg', name: 'Garden', sw: ['#f2d4d2', '#c0727c'],
    eyebrow: 'គំរូធៀបភ្ជាប់ពាក្យ', title: 'ធៀបភ្ជាប់ពាក្យជាមួយរូបថត',
    text: 'រូបថតមុនរៀបការរបស់អ្នក ក្នុងស៊ុមផ្កាដ៏ស្រស់ស្អាត។',
    tags: ['វិចិត្រសាលរូបថត', 'តន្ត្រីផ្ទៃខាងក្រោយ', 'ផែនទីទៅកាន់កម្មវិធី'],
  },
  tpl3: {
    offset: 2160, img: '/img/ig/euca.jpg', name: 'Eucalyptus', sw: ['#e8e6df', '#6d8a6c'],
    eyebrow: 'គំរូធៀបភ្ជាប់ពាក្យ', title: 'ស្រោមសំបុត្រដែលបើកបាន',
    text: 'ចុចត្រាក្រមួន ស្រោមសំបុត្របើក ហើយកាតរុញឡើងមក។',
    tags: ['ស្លឹកឈើជ្រុះ', 'រាប់ថយក្រោយផ្ទាល់', 'KHQR សម្រាប់ចំណងដៃ'],
  },
}
function Showcase({ n }) {
  const t = TPLS[n]
  return (
    <div className="ig inv kh-post">
      <Soft offset={t.offset} />
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="kh-text">{t.text}</p>
      </div>
      <div className="kh-body">
        <div className="kh-side">
          <span className="kh-name"><i style={{ background: `linear-gradient(135deg, ${t.sw[0]} 50%, ${t.sw[1]} 50%)` }} />{t.name}</span>
          <ul className="kh-tags">{t.tags.map((x) => <li key={x}><Icon name="check" size={26} />{x}</li>)}</ul>
          <div className="kh-cta">
            <b>សាកល្បងដោយឥតគិតថ្លៃ</b>
            <span className="fb-url">cambo-web.com</span>
          </div>
        </div>
        <Phone src={t.img} className="kh-phone" />
      </div>
    </div>
  )
}

export default function IgPost() {
  const { n } = useParams()

  if (n && n.startsWith('tpl')) return <Showcase n={n} />

  if (n && n.startsWith('inv')) return <Invite n={n} />

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
