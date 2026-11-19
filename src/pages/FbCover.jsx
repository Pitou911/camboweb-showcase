import HeroTech from '../components/HeroTech'

// Dev-only page used to render the Facebook cover (1640 x 624).
// Everything sits inside the centre ~1100px, which Facebook shows on phones and computers;
// the lower-left corner stays quiet because the profile photo overlaps it on desktop.
export default function FbCover() {
  return (
    <div className="fb">
      <div className="fb-text">
        <p className="eyebrow">Web studio in Phnom Penh</p>
        <h1>Software that helps your business <em>grow.</em></h1>
        <p className="fb-sub">Websites, e-invitations and POS systems, in Khmer and English.</p>
        <span className="fb-url">cambo-web.com</span>
      </div>
      <div className="fb-art"><HeroTech /></div>
    </div>
  )
}
