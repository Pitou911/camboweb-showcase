import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import Cover from '../components/Cover'

export default function Project() {
  const { slug } = useParams()
  const p = getProject(slug)

  if (!p) {
    return (
      <section className="wrap section">
        <h1>Project not found</h1>
        <Link to="/">← Back to all work</Link>
      </section>
    )
  }

  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]

  return (
    <article className="project" style={{ '--accent': p.accent }}>
      <section className="wrap project-head">
        <Link to="/#work" className="back">← All work</Link>
        <p className="eyebrow"><span className="dot" /> {p.industry} · {p.type}</p>
        <h1>{p.name}</h1>
        <p className="lead">{p.tagline}</p>
        <dl className="meta">
          <div><dt>Client</dt><dd>{p.client}</dd></div>
          <div><dt>Location</dt><dd>{p.location}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          <div><dt>Timeframe</dt><dd>{p.duration}</dd></div>
        </dl>
      </section>

      <section className="wrap">
        <div className="project-cover"><Cover project={p} /></div>
      </section>

      <section className="wrap section two-col">
        <h2>The goal</h2>
        <div>
          <p className="body-lg">{p.goal}</p>
          <div className="stats">
            {p.stats.map(([n, l]) => (
              <div key={l}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section two-col">
        <h2>What we built</h2>
        <ul className="features">
          {p.features.map(([t, d]) => (
            <li key={t}><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </section>

      <section className="wrap section two-col">
        <h2>Challenges we solved</h2>
        <ol className="challenges">
          {p.challenges.map(([t, d]) => (
            <li key={t}><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section two-col">
        <h2>Tech stack</h2>
        <div className="chips">
          {p.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
      </section>

      <section className="wrap section two-col">
        <h2>Timeline</h2>
        <ol className="timeline">
          {p.timeline.map(([d, t]) => (
            <li key={d + t}><time>{d}</time><span>{t}</span></li>
          ))}
        </ol>
      </section>

      {p.testimonial && (
        <section className="wrap section">
          <blockquote className="quote">“{p.testimonial}”</blockquote>
        </section>
      )}

      {p.links.length > 0 && (
        <section className="wrap section two-col">
          <h2>Links</h2>
          <div className="hero-actions">
            {p.links.map((l) => (
              <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
        </section>
      )}

      <section className="wrap section">
        <Link to={`/work/${next.slug}`} className="next">
          <span>Next project</span>
          <strong>{next.name} →</strong>
        </Link>
      </section>
    </article>
  )
}
