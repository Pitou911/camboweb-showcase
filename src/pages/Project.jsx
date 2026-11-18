import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import Cover from '../components/Cover'

export default function Project() {
  const { slug } = useParams()
  const p = getProject(slug)

  if (!p) {
    return (
      <section className="wrap section">
        <h1 className="h-page">We couldn’t find that project.</h1>
        <p className="lead"><Link className="text-link" to="/#work">See all client work</Link></p>
      </section>
    )
  }

  const next = projects[(projects.indexOf(p) + 1) % projects.length]

  return (
    <article className="project">
      <header className="wrap project-head">
        <Link to="/#work" className="back">All work</Link>
        <h1 className="h-page">{p.name}</h1>
        <p className="lead">{p.tagline}</p>
        <dl className="facts facts-wide">
          <div><dt>Client</dt><dd>{p.client}, {p.location}</dd></div>
          <div><dt>Built as</dt><dd>{p.type}</dd></div>
          <div><dt>Timeframe</dt><dd>{p.duration}, {p.year}</dd></div>
          {p.stats.map(([n, l]) => (
            <div key={l}><dt>{l.charAt(0).toUpperCase() + l.slice(1)}</dt><dd>{n}</dd></div>
          ))}
        </dl>
      </header>

      <div className="wrap">
        <Cover project={p} large />
      </div>

      <section className="wrap row">
        <h2>The goal</h2>
        <p className="body-lg">{p.goal}</p>
      </section>

      <section className="wrap row">
        <h2>What we built</h2>
        <ul className="features">
          {p.features.map(([t, d]) => (
            <li key={t}><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </section>

      <section className="wrap row">
        <h2>Hard problems we solved</h2>
        <div className="problems">
          {p.challenges.map(([t, d], i) => (
            <details key={t} open={i === 0}><summary>{t}</summary><p>{d}</p></details>
          ))}
        </div>
      </section>

      <section className="wrap row">
        <h2>Built with</h2>
        <ul className="chips">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <section className="wrap row">
        <h2>Timeline</h2>
        <ol className="timeline">
          {p.timeline.map(([d, t]) => (
            <li key={d + t}><time>{d}</time><span>{t}</span></li>
          ))}
        </ol>
      </section>

      {p.testimonial && (
        <section className="wrap row">
          <h2>What the client says</h2>
          <blockquote className="quote">{p.testimonial}</blockquote>
        </section>
      )}

      {p.links.length > 0 && (
        <section className="wrap row">
          <h2>See it</h2>
          <div className="actions">
            {p.links.map((l) => (
              <a key={l.href} className="btn btn-line" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </section>
      )}

      <div className="wrap">
        <Link to={`/work/${next.slug}`} className="next">
          <span>Next project</span>
          <strong>{next.name}</strong>
        </Link>
      </div>
    </article>
  )
}
