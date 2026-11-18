import Hero3D from '../components/Hero3D'

// Dev-only page used to render the Facebook cover (1640 x 624).
// Key content stays inside the centre ~1200px, which Facebook shows on every device.
export default function FbCover() {
  return (
    <div className="fb">
      <div className="fb-text">
        <div className="fb-logo">
          <img src="/img/camboweb-pfp-neon-black.png" alt="" />
          <span><b>cambo</b>web</span>
        </div>
        <h1>We build the software Cambodian businesses run on.</h1>
        <p>Websites, apps and business systems, in Khmer and English.</p>
      </div>
      <div className="fb-stage"><Hero3D /></div>
    </div>
  )
}
