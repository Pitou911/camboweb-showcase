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

export default function IgPost() {
  const { n } = useParams()

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
