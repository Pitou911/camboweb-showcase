import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Cover from '../components/Cover'
import Hero3D from '../components/Hero3D'

const STEPS = [
  ['Clickable prototype', 'Within the first week you can tap through a working prototype and tell us what to change.'],
  ['Build in small releases', 'New features arrive every few days, so you see progress and steer it as we go.'],
  ['Test on your own devices', 'We test on your tablet, your printer and your PCs before anything goes live.'],
  ['Go live, then keep improving', 'Your data and hosting stay in your name. We keep shipping fixes from your feedback.'],
]

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>We build the software Cambodian businesses run on.</h1>
          <p className="lead">
            A bar’s tablet POS, a medical lab’s desktop app, an invitation every guest opens on their
            phone. Each one is in daily use by a real client.
          </p>
          <div className="actions">
            <a className="btn btn-ink" href="#work">See the work</a>
            <a className="btn btn-line" href="#contact">Start a project</a>
          </div>
        </div>
        <Hero3D />
      </section>

      <section className="wrap section" id="work" aria-labelledby="work-h">
        <h2 id="work-h" className="h-section">Client work</h2>
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
