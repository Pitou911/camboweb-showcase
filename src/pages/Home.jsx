import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { invitations, templateUrl } from '../data/templates'
import Cover from '../components/Cover'
import Hero3D from '../components/Hero3D'
import LiveFrame from '../components/LiveFrame'
import useScrollProgress from '../components/useScrollProgress'

const STEPS = [
  ['Clickable prototype', 'Within the first week you can tap through a working prototype and tell us what to change.'],
  ['Build in small releases', 'New features arrive every few days, so you see progress and steer it as we go.'],
  ['Test on your own devices', 'We test on your tablet, your printer and your phones before anything goes live.'],
  ['Go live, then keep improving', 'Your data and hosting stay in your name. We keep shipping fixes from your feedback.'],
]

const MARQUEE = ['POS systems', 'Lab software', 'Wedding invitations', 'Restaurant websites', 'Booking systems', 'Khmer & English', 'Android apps', 'Offline desktop apps']

const FAN = ['invite-garden', 'invite-golden-lotus', 'invite-starlight'].map((s) => invitations.find((t) => t.slug === s))

function InviteFan() {
  const ref = useRef(null)
  useScrollProgress(ref)
  return (
    <div className="fan" ref={ref}>
      {FAN.map((t, i) => (
        <Link key={t.slug} to="/templates" className={`fan-phone fan-${i}`} aria-label={`${t.name} template`}>
          <div className="phone">
            <div className="phone-notch" />
            <LiveFrame src={templateUrl(t.slug)} title={`${t.name} preview`} interactive={false} />
          </div>
          <span className="fan-label">{t.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <p className="kicker"><span className="dot" />Web studio in Phnom Penh</p>
          <h1>We build the software Cambodian businesses run on.</h1>
          <p className="lead">
            A bar’s tablet POS, a medical lab’s desktop app, invitations every guest opens on their phone.
            Each one is in daily use by a real client.
          </p>
          <div className="actions">
            <a className="btn btn-ink" href="#work">See the work</a>
            <Link className="btn btn-line" to="/templates">Try our templates</Link>
          </div>
        </div>
        <Hero3D />
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      <section className="wrap section" id="work" aria-labelledby="work-h">
        <div className="head-row">
          <h2 id="work-h" className="h-section">Client work</h2>
          <p className="muted">Built and shipped in 2026</p>
        </div>
        <div className="chapters">
          {projects.map((p) => (
            <article key={p.slug} className="chapter">
              <Link to={`/work/${p.slug}`} className="chapter-cover" tabIndex={-1} aria-hidden="true">
                <Cover project={p} />
              </Link>
              <div className="chapter-text">
                <div>
                  <h3><Link to={`/work/${p.slug}`}>{p.name}</Link></h3>
                  <p>{p.tagline}</p>
                  <Link className="text-link" to={`/work/${p.slug}`}>Read the case study</Link>
                </div>
                <dl className="facts">
                  <div><dt>Client</dt><dd>{p.client}</dd></div>
                  <div><dt>Built as</dt><dd>{p.type}</dd></div>
                  <div><dt>Timeframe</dt><dd>{p.duration}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="night teaser" aria-labelledby="tpl-h">
        <div className="wrap teaser-grid">
          <div className="teaser-text">
            <h2 id="tpl-h">Invitations your guests open, tap and reply to.</h2>
            <p>
              Five ready-made designs for weddings, engagements and birthdays. Type your names, see it
              change live, and send every guest a link with their own name on the cover.
            </p>
            <ul className="ticks">
              <li>Khmer and English</li>
              <li>Countdown, map, KHQR gift and RSVP</li>
              <li>A personal link for each guest</li>
            </ul>
            <Link className="btn btn-neon" to="/templates">Try the templates</Link>
          </div>
          <InviteFan />
        </div>
      </section>

      <section className="wrap section" id="process" aria-labelledby="process-h">
        <h2 id="process-h" className="h-section">How we work</h2>
        <ol className="steps">
          {STEPS.map(([t, d]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
