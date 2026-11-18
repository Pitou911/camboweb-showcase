import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Cover from '../components/Cover'
import Hero3D from '../components/Hero3D'

export default function Work() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>We build the software Cambodian businesses run on.</h1>
          <p className="lead">
            A bar’s tablet POS, a medical lab’s desktop app, invitations every guest opens on their phone.
            Each one is in daily use by a real client.
          </p>
          <div className="actions">
            <a className="btn btn-ink" href="#work">See the case studies</a>
            <Link className="btn btn-line" to="/contact">Start a project</Link>
          </div>
        </div>
        <Hero3D />
      </section>

      <section className="wrap section" id="work" aria-labelledby="work-h">
        <div className="head-row">
          <h2 id="work-h" className="h-section">Client work</h2>
          <p>Three projects built and shipped in 2026, from a bar in Phnom Penh to a lab that works offline.</p>
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

    </>
  )
}
