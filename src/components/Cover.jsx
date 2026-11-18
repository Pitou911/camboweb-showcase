// Visual "cover" for each project, built in CSS so no screenshots are required.

const TABLES = ['free', 'seated', 'new', 'free', 'billed', 'seated', 'free', 'new', 'seated']

function LoriCover() {
  return (
    <div className="cover cover-lori">
      <img className="lori-mark" src="/img/lori-wordmark.png" alt="LoRi" />
      <div className="tablet">
        <div className="tablet-grid">
          {TABLES.map((s, i) => (
            <span key={i} className={`tbl tbl-${s}`}>T{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SaravoanCover({ project }) {
  return (
    <div className="cover cover-saravoan">
      <div className="window">
        <div className="window-bar"><i /><i /><i /></div>
        <img src={project.screenshot} alt="Result template editor in Saravoan Labo" />
      </div>
      <img className="sara-logo" src={project.logo} alt="Saravoan Medical Laboratory" />
    </div>
  )
}

function InviteCover() {
  return (
    <div className="cover cover-invite">
      <img className="leaf leaf-a" src="/img/eucalyptus.png" alt="" />
      <img className="leaf leaf-b" src="/img/eucalyptus.png" alt="" />
      <div className="paper">
        <span className="eyebrow-sm">ENGAGEMENT</span>
        <span className="script">Save the date</span>
        <span className="kh">សូមគោរពអញ្ជើញ</span>
        <span className="pdate">06 • 12 • 2026</span>
      </div>
    </div>
  )
}

export default function Cover({ project }) {
  if (project.cover === 'lori') return <LoriCover />
  if (project.cover === 'saravoan') return <SaravoanCover project={project} />
  return <InviteCover />
}
