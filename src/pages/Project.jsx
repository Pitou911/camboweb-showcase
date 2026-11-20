import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import Cover from '../components/Cover'
import { usePrefs } from '../prefs'
import Icon from '../components/Icon'

export default function Project() {
  const { slug } = useParams()
  const { t, pick, lang } = usePrefs()
  const raw = getProject(slug)

  if (!raw) {
    return (
      <section className="wrap section">
        <h1 className="h-page">{t('We couldn’t find that project.', 'រកមិនឃើញគម្រោងនោះទេ។')}</h1>
        <p className="lead"><Link className="text-link" to="/work">{t('See all our projects', 'មើលគម្រោងទាំងអស់')}</Link></p>
      </section>
    )
  }

  const p = pick(raw)
  const next = pick(projects[(projects.indexOf(raw) + 1) % projects.length])
  const cap = (s) => (lang === 'kh' ? s : s.charAt(0).toUpperCase() + s.slice(1))

  return (
    <article className="project">
      <header className="wrap project-head">
        <Link to="/work" className="back">{t('All work', 'ស្នាដៃទាំងអស់')}</Link>
        <h1 className="h-page">{p.name}</h1>
        <p className="lead">{p.tagline}</p>
        <dl className="facts facts-wide">
          <div><dt>{t('Built for', 'សម្រាប់')}</dt><dd>{p.client}, {p.location}</dd></div>
          <div><dt>{t('Built as', 'ប្រភេទ')}</dt><dd>{p.type}</dd></div>
          <div><dt>{t('Timeframe', 'រយៈពេល')}</dt><dd>{p.duration}, {p.year}</dd></div>
          {p.stats.map(([n, l]) => (
            <div key={l}><dt>{cap(l)}</dt><dd>{n}</dd></div>
          ))}
        </dl>
      </header>

      <div className="wrap">
        <Cover project={raw} large />
      </div>

      <section className="wrap row">
        <h2>{t('The goal', 'គោលដៅ')}</h2>
        <p className="body-lg">{p.goal}</p>
      </section>

      <section className="wrap row">
        <h2>{t('What we built', 'អ្វីដែលយើងបានបង្កើត')}</h2>
        <ul className="features">
          {p.features.map(([h, d]) => (
            <li key={h}><h3>{h}</h3><p>{d}</p></li>
          ))}
        </ul>
      </section>

      {p.screens && (
        <section className="wrap row">
          <h2>{t('Real screens', 'អេក្រង់ពិត')}</h2>
          <div className={`screens ${raw.screensLayout === 'phones' ? 'screens-phones' : ''}`}>
            {p.screens.map(([src, c]) => (
              <figure key={src}><img src={src} alt={c} loading="lazy" /><figcaption>{c}</figcaption></figure>
            ))}
          </div>
        </section>
      )}

      <section className="wrap row">
        <h2>{t('Hard problems we solved', 'បញ្ហាពិបាកដែលយើងបានដោះស្រាយ')}</h2>
        <div className="problems">
          {p.challenges.map(([h, d], i) => (
            <details key={h} open={i === 0}><summary>{h}</summary><p>{d}</p></details>
          ))}
        </div>
      </section>

      <section className="wrap row">
        <h2>{t('Built with', 'បច្ចេកវិទ្យាដែលប្រើ')}</h2>
        <ul className="chips">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <section className="wrap row">
        <h2>{t('Timeline', 'ពេលវេលា')}</h2>
        <ol className="timeline">
          {p.timeline.map(([d, s]) => (
            <li key={d + s}><time>{d}</time><span>{s}</span></li>
          ))}
        </ol>
      </section>

      {p.testimonial && (
        <section className="wrap row">
          <h2>{t('What the client says', 'មតិរបស់អតិថិជន')}</h2>
          <blockquote className="quote">{p.testimonial}</blockquote>
        </section>
      )}

      {p.links.length > 0 && (
        <section className="wrap row">
          <h2>{t('See it', 'មើលផ្ទាល់')}</h2>
          <div className="actions">
            {p.links.map((l) => (
              <a key={l.href} className="btn btn-line" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </section>
      )}

      <div className="wrap">
        <Link to={`/work/${next.slug}`} className="next">
          <div>
            <span>{t('Next project', 'គម្រោងបន្ទាប់')}</span>
            <strong>{next.name}</strong>
            <em>{next.type}</em>
          </div>
          <span className="circle"><Icon name="arrow" size={20} /></span>
        </Link>
      </div>
    </article>
  )
}
