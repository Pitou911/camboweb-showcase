import { useEffect } from 'react'
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
  // Moul is only needed for these posts, so load it here instead of on the website
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
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

// ---------- Website templates row (dark, Khmer): one template per post ----------
const WEBS = {
  web1: {
    offset: 0, desk: '/img/shot-restaurant.jpg', mob: '/img/ig/m-restaurant.jpg', name: 'Kampot Table', url: 'kampottable.com', sw: ['#14110f', '#d99a3d'],
    eyebrow: 'គេហទំព័រភោជនីយដ្ឋាន', title: 'កក់តុបានក្នុងពីរបីជំហាន',
    text: 'ម៉ឺនុយជាដុល្លារ និងរៀល និងការកក់តុតាមអនឡាញ។',
    tags: ['កក់តុតាមអនឡាញ', 'ម៉ឺនុយ USD និងរៀល', 'ម៉ោងបើក'],
  },
  web2: {
    offset: 1080, desk: '/img/shot-barber.jpg', mob: '/img/ig/m-barber.jpg', name: 'Sharp & Co.', url: 'sharpandco.com', sw: ['#0f0f0f', '#c39a5b'],
    eyebrow: 'គេហទំព័រហាងកាត់សក់', title: 'ជ្រើសជាង និងម៉ោងទំនេរ',
    text: 'អតិថិជនជ្រើសសេវា ជាងកាត់សក់ និងម៉ោង រួចទទួលលេខកូដកក់។',
    tags: ['កក់ ៤ ជំហាន', 'ជ្រើសជាងកាត់សក់', 'បញ្ជីតម្លៃ'],
  },
  web3: {
    offset: 2160, desk: '/img/shot-bar.jpg', mob: '/img/ig/m-bar.jpg', name: 'Lantern Rooftop', url: 'lanternrooftop.com', sw: ['#170c1c', '#f2a65a'],
    eyebrow: 'គេហទំព័របារ និងឡោន', title: 'កក់តុសម្រាប់យប់នេះ',
    text: 'នាឡិកាម៉ោងបញ្ចុះតម្លៃ ម៉ឺនុយស្រាក្រឡុក និងព្រឹត្តិការណ៍ប្រចាំសប្តាហ៍។',
    tags: ['កក់ព្រឹត្តិការណ៍', 'ម៉ោងបញ្ចុះតម្លៃ', 'ម៉ឺនុយស្រាក្រឡុក'],
  },
}
function DarkRibbon({ offset, stretch = false }) {
  return (
    <svg className="inv-ribbon" viewBox={`${offset} 0 1080 1440`} preserveAspectRatio={stretch ? 'none' : undefined} aria-hidden="true">
      <defs>
        <linearGradient id={`dr${offset}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="3240" y2="0">
          <stop offset="0" stopColor="#2bd9f0" stopOpacity="0" />
          <stop offset="0.2" stopColor="#2bd9f0" />
          <stop offset="0.55" stopColor="#5b8cff" />
          <stop offset="0.85" stopColor="#2bd9f0" />
          <stop offset="1" stopColor="#2bd9f0" stopOpacity="0" />
        </linearGradient>
        <filter id={`drg${offset}`} x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      <path d={RIBBONS[0][0]} stroke="#2bd9f0" strokeWidth="26" opacity="0.3" fill="none" filter={`url(#drg${offset})`} />
      {RIBBONS.map(([d, w, o]) => <path key={d} d={d} stroke={`url(#dr${offset})`} strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" />)}
    </svg>
  )
}
function Web({ n }) {
  const t = WEBS[n]
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
  return (
    <div className="ig web-post">
      <DarkRibbon offset={t.offset} />
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="kh-text">{t.text}</p>
      </div>
      <div className="web-devices">
        <div className="web-browser">
          <div className="web-bar"><i /><i /><i /><span>{t.url}</span></div>
          <img src={t.desk} alt="" />
        </div>
        <div className="inv-phone web-phone"><img src={t.mob} alt="" /></div>
      </div>
      <div className="web-foot">
        <div className="web-meta">
          <span className="kh-name"><i style={{ background: `linear-gradient(135deg, ${t.sw[0]} 50%, ${t.sw[1]} 50%)` }} />{t.name}</span>
          <ul className="web-tags">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="kh-cta">
          <b>សាកល្បងដោយឥតគិតថ្លៃ</b>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    </div>
  )
}

// ---------- POS templates row (light, Khmer, Moul + Battambang): one template per post ----------
const POSS = {
  pos1: {
    offset: 0, img: '/img/ig/pos-mart.jpg', name: 'Sunrise Mart', sw: ['#0f4d32', '#ffc93c'],
    eyebrow: 'ប្រព័ន្ធលក់សម្រាប់ម៉ាត', title: 'ស្កេនបាកូដ លក់បានលឿន',
    text: 'មើលស្តុកពេលលក់ ហើយអាប់លុយជាដុល្លារ ឬរៀល។',
    tags: ['ស្កេនបាកូដ', 'ស្តុកផ្ទាល់', 'អាប់លុយ USD និងរៀល'],
  },
  pos2: {
    offset: 1080, img: '/img/ig/pos-cafe.jpg', name: 'Mekong Brew', sw: ['#2b1d14', '#c4692e'],
    eyebrow: 'ប្រព័ន្ធលក់សម្រាប់ហាងកាហ្វេ', title: 'ទំហំ ស្ករ និងទឹកកក',
    text: 'ជ្រើសតាមចិត្តអតិថិជន និងមានលេខរៀងសម្រាប់ជួររង់ចាំ។',
    tags: ['លេខរៀងការកម្ម៉ង់', 'ញ៉ាំនៅហាង ឬខ្ចប់', 'KHQR និងសាច់ប្រាក់'],
  },
  pos3: {
    offset: 2160, img: '/img/ig/pos-restaurant.jpg', name: 'Riverside Kitchen', sw: ['#141a26', '#e4572e'],
    eyebrow: 'ប្រព័ន្ធលក់សម្រាប់ភោជនីយដ្ឋាន', title: 'មើលតុទាំងអស់ភ្លាមៗ',
    text: 'ផ្ញើការកម្ម៉ង់ទៅផ្ទះបាយ ហើយព្រីនវិក្កយបត្រ។',
    tags: ['ផ្ញើទៅផ្ទះបាយ', 'វិក្កយបត្រ និងបង់ប្រាក់', 'ឈ្មោះម្ហូបជាខ្មែរ'],
  },
}
function Pos({ n }) {
  const t = POSS[n]
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
  return (
    <div className="ig inv kh-post pos-post">
      <Soft offset={t.offset} />
      <div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="kh-text">{t.text}</p>
      </div>
      <div className="pos-tablet"><img src={t.img} alt="" /></div>
      <div className="pos-foot">
        <div className="web-meta">
          <span className="kh-name"><i style={{ background: `linear-gradient(135deg, ${t.sw[0]} 50%, ${t.sw[1]} 50%)` }} />{t.name}</span>
          <ul className="pos-tags">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="kh-cta pos-cta">
          <b>សាកល្បងដោយឥតគិតថ្លៃ</b>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    </div>
  )
}

// ---------- Facebook posts (1080 x 1350): one per product, all three templates in each ----------
const FBS = {
  fb1: {
    dark: false, kind: 'phones',
    eyebrow: 'ធៀបឌីជីថល', title: 'ធៀបស្អាតៗ សម្រាប់ថ្ងៃពិសេសរបស់អ្នក',
    text: 'អាពាហ៍ពិពាហ៍ ភ្ជាប់ពាក្យ និងខួបកំណើត។ ភ្ញៀវម្នាក់ៗមានឈ្មោះផ្ទាល់ខ្លួនលើធៀប។',
    items: [['/img/ig/lotus.jpg', 'Golden Lotus'], ['/img/ig/garden3.jpg', 'Garden'], ['/img/ig/euca.jpg', 'Eucalyptus']],
    tags: ['ឈ្មោះភ្ញៀវលើធៀប', 'តន្ត្រី', 'ផែនទី', 'KHQR ចំណងដៃ'],
  },
  fb2: {
    dark: true, kind: 'phones',
    eyebrow: 'គេហទំព័រអាជីវកម្ម', title: 'គេហទំព័រដែលអតិថិជនកក់បាន',
    text: 'សម្រាប់ភោជនីយដ្ឋាន ហាងកាត់សក់ និងបារ។ ដំណើរការល្អលើទូរស័ព្ទ។',
    items: [['/img/ig/m-restaurant.jpg', 'Kampot Table'], ['/img/ig/m-barber.jpg', 'Sharp & Co.'], ['/img/ig/m-bar.jpg', 'Lantern Rooftop']],
    tags: ['កក់តាមអនឡាញ', 'តម្លៃជាដុល្លារ និងរៀល', 'ផ្ទុកលឿន'],
  },
  fb3: {
    dark: false, kind: 'tablets',
    eyebrow: 'ប្រព័ន្ធលក់ POS', title: 'ប្រព័ន្ធលក់ POS សម្រាប់ហាងរបស់អ្នក',
    text: 'សម្រាប់ម៉ាត ហាងកាហ្វេ និងភោជនីយដ្ឋាន។ ដំណើរការលើថេប្លេត។',
    items: [['/img/ig/pos-mart.jpg', 'Sunrise Mart'], ['/img/ig/pos-cafe.jpg', 'Mekong Brew'], ['/img/ig/pos-restaurant.jpg', 'Riverside Kitchen']],
    tags: ['ស្កេនបាកូដ', 'ផ្ញើទៅផ្ទះបាយ', 'KHQR និងសាច់ប្រាក់', 'USD និងរៀល'],
  },
}
function FbPost({ n }) {
  const t = FBS[n]
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
  return (
    <div className={`fbp ${t.dark ? 'fbp-dark' : ''}`}>
      {t.dark ? <DarkRibbon offset={0} /> : <Soft offset={1080} />}
      <div className="fbp-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="kh-text">{t.text}</p>
      </div>
      {t.kind === 'phones' ? (
        <div className="fbp-phones">
          {t.items.map(([src, name], i) => (
            <figure key={name} className={`fbp-ph p${i}`}>
              <div className="inv-phone"><img src={src} alt="" /></div>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="fbp-tabs">
          {t.items.map(([src, name], i) => (
            <figure key={name} className={`fbp-tab t${i}`}>
              <div className="pos-tablet"><img src={src} alt="" /></div>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="fbp-foot">
        <ul className="pos-tags">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className="kh-cta pos-cta">
          <b>សាកល្បងដោយឥតគិតថ្លៃ</b>
          <span className="fb-url">cambo-web.com</span>
        </div>
      </div>
    </div>
  )
}

// ---------- Portfolio row (dark, Khmer, Moul + Battambang): two of our projects + "what we build" ----------
// Instagram: /ig/cs1..cs3 (1080 x 1440, one ribbon across the row). Facebook: /ig/fbcs1..fbcs3 (1080 x 1350).
const CASES = {
  1: {
    offset: 0,
    eyebrow: 'គម្រោងរបស់យើង · វេទិកាកក់សណ្ឋាគារ',
    title: ['កក់សណ្ឋាគារ', 'បង់ប្រាក់តាម KHQR'],
    text: 'គេហទំព័រ កម្មវិធី iOS និង Android និងប្រព័ន្ធគ្រប់គ្រងសណ្ឋាគារ សម្រាប់ KhmerRooms។',
    name: 'KhmerRooms', sw: ['#1f5f4a', '#f5f0e6'],
    tags: ['វេប · iOS · Android', 'បង់ប្រាក់ KHQR', 'ខ្មែរ និងអង់គ្លេស'],
    cta: 'មើលគម្រោងផ្សេងទៀត', url: 'cambo-web.com/work',
  },
  2: {
    offset: 1080,
    eyebrow: 'គម្រោងរបស់យើង · មន្ទីរពិសោធន៍វេជ្ជសាស្ត្រ',
    title: 'គេហទំព័រ និងប្រព័ន្ធស្នើសុំតេស្ត',
    text: 'វេជ្ជបណ្ឌិតស្នើសុំតេស្តតាមអនឡាញ ហើយមន្ទីរពិសោធន៍ទទួលដំណឹងតាម Telegram។',
    name: 'Saravoan Labo', sw: ['#2f7f9a', '#ffffff'],
    tags: ['គេហទំព័រពីរភាសា', 'ស្នើសុំតេស្តអនឡាញ', 'ជូនដំណឹង Telegram'],
    cta: 'មើលគម្រោងផ្សេងទៀត', url: 'cambo-web.com/work',
  },
  3: {
    offset: 2160,
    eyebrow: 'អ្វីដែលយើងបង្កើត',
    title: 'គម្រោងបន្ទាប់ អាចជារបស់អ្នក',
    text: 'ពីគេហទំព័រអាជីវកម្ម ដល់កម្មវិធីទូរស័ព្ទ និងប្រព័ន្ធ POS។ ជាភាសាខ្មែរ និងអង់គ្លេស។',
    cta: 'ទាក់ទងមកយើង', url: 'cambo-web.com',
  },
}
const BUILDS = [
  ['globe', 'គេហទំព័រអាជីវកម្ម', 'KhmerRooms · Saravoan'],
  ['bolt', 'កម្មវិធី iOS និង Android', 'KhmerRooms'],
  ['pos', 'ប្រព័ន្ធ POS ថេប្លេត', 'LoRi POS'],
  ['desktop', 'កម្មវិធីកុំព្យូទ័រ', 'Saravoan Labo'],
]
function CasePost({ n }) {
  const fb = n.startsWith('fb')
  const k = n.slice(-1)
  const t = CASES[k]
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
  return (
    <div className={`cs ${fb ? 'cs-fb' : ''}`}>
      <DarkRibbon offset={fb ? 1080 : t.offset} stretch={fb} />
      <div className="cs-head">
        {fb && <Brand />}
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{Array.isArray(t.title) ? t.title.map((x, i) => <span key={x}>{i > 0 && <br />}{x}</span>) : t.title}</h2>
        <p className="kh-text">{t.text}</p>
      </div>

      <div className={`cs-visual v${k}`}>
        {k === '1' && fb && (
          <>
            <div className="cs-ph p0"><img src="/img/kr-app-home.jpg" alt="" /></div>
            <div className="cs-ph p2"><img src="/img/kr-app-pay.jpg" alt="" /></div>
            <div className="cs-ph p1"><img src="/img/kr-app-hotel.jpg" alt="" /></div>
          </>
        )}
        {k === '1' && !fb && (
          <>
            <img className="cs-shot s0" src="/img/kr-discount.jpg" alt="" />
            <img className="cs-shot s2" src="/img/kr-verified.jpg" alt="" />
            <img className="cs-shot s1" src="/img/kr-tripmatch.jpg" alt="" />
          </>
        )}
        {k === '2' && (
          <>
            <div className="web-browser cs-b2">
              <div className="web-bar"><i /><i /><i /><span>Our tests</span></div>
              <img src="/img/saravoan-web-tests.jpg" alt="" />
            </div>
            <div className="web-browser cs-b1">
              <div className="web-bar"><i /><i /><i /><span>Saravoan Medical Laboratory</span></div>
              <img src="/img/saravoan-web-home.jpg" alt="" />
            </div>
          </>
        )}
        {k === '3' && (
          <ul className="cs-builds">
            {BUILDS.map(([icon, label, ex]) => (
              <li key={label}>
                <span className="cs-ic"><Icon name={icon} size={34} /></span>
                <b>{label}</b>
                <em>{ex}</em>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cs-foot">
        {t.name ? (
          <div className="web-meta">
            <span className="kh-name"><i style={{ background: `linear-gradient(135deg, ${t.sw[0]} 50%, ${t.sw[1]} 50%)` }} />{t.name}</span>
            <ul className="web-tags">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ) : (
          <ul className="web-tags">
            <li>៤ គម្រោងកំពុងប្រើប្រាស់</li>
            <li>វេប · iOS · Android · កុំព្យូទ័រ</li>
          </ul>
        )}
        <div className="kh-cta">
          <b>{t.cta}</b>
          <span className="fb-url">{t.url}</span>
        </div>
      </div>
    </div>
  )
}

// ---------- Telegram story (1080 x 1920, 9:16): websites first ----------
// Top ~250px and bottom ~300px stay free for Telegram's header and reply bar.
const STORY_WAVES = [
  ['M-100 1500 C 300 1700, 700 1200, 1180 1380', 5, 0.85],
  ['M-100 1580 C 340 1780, 740 1300, 1180 1470', 2.5, 0.5],
  ['M-100 380 C 300 260, 700 520, 1180 360', 2, 0.35],
]
const STORY_TEXT = {
  kh: {
    eyebrow: 'គេហទំព័រអាជីវកម្ម', title: <>គេហទំព័រសម្រាប់<br />អាជីវកម្មរបស់អ្នក</>,
    text: 'អតិថិជនរកឃើញអ្នកលើ Google ហើយកក់បានគ្រប់ពេល។',
    points: ['គេហទំព័រលើទូរស័ព្ទ និងកុំព្យូទ័រ', 'កក់តុ ឬកក់ម៉ោងតាមអនឡាញ', 'តម្លៃជាដុល្លារ និងរៀល'], cta: 'សាកល្បងដោយឥតគិតថ្លៃ',
  },
  en: {
    eyebrow: 'Business websites', title: <>We build websites<br />for your business.</>,
    text: 'Customers find you on Google and book any time.',
    points: ['Looks great on phone and computer', 'Online booking for tables and appointments', 'Prices in US dollars and riel'], cta: 'Try it free',
  },
}

function Story({ lang = 'kh' }) {
  const c = STORY_TEXT[lang]
  useEffect(() => {
    if (document.getElementById('moul-font')) return
    const l = document.createElement('link')
    l.id = 'moul-font'; l.rel = 'stylesheet'
    l.href = 'https://fonts.googleapis.com/css2?family=Moul&family=Battambang:wght@400;700&display=swap'
    document.head.appendChild(l)
  }, [])
  return (
    <div className={`story ${lang === 'en' ? 'story-en' : ''}`}>
      <svg className="story-waves" viewBox="0 0 1080 1920" aria-hidden="true">
        <defs>
          <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2bd9f0" stopOpacity="0" />
            <stop offset="0.3" stopColor="#2bd9f0" />
            <stop offset="0.7" stopColor="#5b8cff" />
            <stop offset="1" stopColor="#2bd9f0" stopOpacity="0" />
          </linearGradient>
          <filter id="swg" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>
        <path d={STORY_WAVES[0][0]} stroke="#2bd9f0" strokeWidth="26" opacity="0.3" fill="none" filter="url(#swg)" />
        {STORY_WAVES.map(([d, w, o]) => <path key={d} d={d} stroke="url(#sw)" strokeWidth={w} opacity={o} fill="none" strokeLinecap="round" />)}
      </svg>

      <div className="story-head">
        <div className="ig-brand"><img src="/img/camboweb-pfp-neon-black.png" alt="" /><span><b>cambo</b>web</span></div>
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.title}</h2>
        <p className="kh-text">{c.text}</p>
      </div>

      <div className="story-devices">
        <div className="web-browser">
          <div className="web-bar"><i /><i /><i /><span>kampottable.com</span></div>
          <img src="/img/shot-restaurant.jpg" alt="" />
        </div>
        <div className="inv-phone web-phone"><img src="/img/ig/m-restaurant.jpg" alt="" /></div>
      </div>

      <ul className="story-points">
        {['globe', 'check', 'layers'].map((icon, i) => <li key={icon}><span><Icon name={icon} size={30} /></span>{c.points[i]}</li>)}
      </ul>

      <div className="story-cta">
        <b>{c.cta}</b>
        <span className="story-url">cambo-web.com</span>
      </div>
    </div>
  )
}

export default function IgPost() {
  const { n } = useParams()

  if (n && (n.startsWith('cs') || n.startsWith('fbcs'))) return <CasePost n={n} />

  if (n === 'story') return <Story />
  if (n === 'story-en') return <Story lang="en" />

  if (n && n.startsWith('fb')) return <FbPost n={n} />

  if (n && n.startsWith('pos')) return <Pos n={n} />

  if (n && n.startsWith('web')) return <Web n={n} />

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
