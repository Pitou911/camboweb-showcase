import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Cover from '../components/Cover'
import Hero3D from '../components/Hero3D'
import { usePrefs } from '../prefs'

export default function Work() {
  const { t, pick } = usePrefs()
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>{t('We build the software Cambodian businesses run on.', 'យើងបង្កើតកម្មវិធីដែលអាជីវកម្មខ្មែរប្រើប្រាស់ប្រចាំថ្ងៃ។')}</h1>
          <p className="lead">{t(
            'A bar’s tablet POS, a medical lab’s desktop app, invitations every guest opens on their phone. Each one is in daily use by a real client.',
            'ប្រព័ន្ធ POS ថេប្លេតរបស់បារ កម្មវិធីកុំព្យូទ័ររបស់មន្ទីរពិសោធន៍វេជ្ជសាស្ត្រ និងធៀបដែលភ្ញៀវបើកលើទូរស័ព្ទ។ ទាំងអស់កំពុងប្រើប្រាស់ពិតប្រាកដដោយអតិថិជន។',
          )}</p>
          <div className="actions">
            <a className="btn btn-ink" href="#work">{t('See the case studies', 'មើលករណីសិក្សា')}</a>
            <Link className="btn btn-line" to="/contact">{t('Start a project', 'ចាប់ផ្តើមគម្រោង')}</Link>
          </div>
        </div>
        <Hero3D />
      </section>

      <section className="wrap section" id="work" aria-labelledby="work-h">
        <div className="head-row">
          <h2 id="work-h" className="h-section">{t('Client work', 'ស្នាដៃ')}</h2>
          <p>{t(
            'Three projects built and shipped in 2026, from a bar in Phnom Penh to a lab that works offline.',
            'គម្រោងបីដែលបានបង្កើត និងដាក់ឱ្យប្រើក្នុងឆ្នាំ 2026 ចាប់ពីបារមួយនៅភ្នំពេញ ដល់មន្ទីរពិសោធន៍ដែលដំណើរការដោយគ្មានអ៊ីនធឺណិត។',
          )}</p>
        </div>
        <div className="chapters">
          {projects.map((raw) => {
            const p = pick(raw)
            return (
              <article key={p.slug} className="chapter">
                <Link to={`/work/${p.slug}`} className="chapter-cover" tabIndex={-1} aria-hidden="true">
                  <Cover project={raw} />
                </Link>
                <div className="chapter-text">
                  <div>
                    <h3><Link to={`/work/${p.slug}`}>{p.name}</Link></h3>
                    <p>{p.tagline}</p>
                    <Link className="text-link" to={`/work/${p.slug}`}>{t('Read the case study', 'អានករណីសិក្សា')}</Link>
                  </div>
                  <dl className="facts">
                    <div><dt>{t('Client', 'អតិថិជន')}</dt><dd>{p.client}</dd></div>
                    <div><dt>{t('Built as', 'ប្រភេទ')}</dt><dd>{p.type}</dd></div>
                    <div><dt>{t('Timeframe', 'រយៈពេល')}</dt><dd>{p.duration}</dd></div>
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
