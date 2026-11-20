import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Cover from '../components/Cover'
import { usePrefs } from '../prefs'
import Floater from '../components/Floater'

export default function Work() {
  const { t, pick } = usePrefs()
  return (
    <>
      <section className="wk-hero wrap">
        <div className="wk-text">
          <p className="eyebrow">{t('Our work', 'ស្នាដៃរបស់យើង')}</p>
          <h1>{t(<>Software Cambodian businesses <em>run on.</em></>, <>កម្មវិធីដែលអាជីវកម្មខ្មែរ<em>ប្រើប្រាស់ប្រចាំថ្ងៃ។</em></>)}</h1>
          <p className="lead">{t(
            'A hotel booking platform with its own apps, a bar’s tablet POS, and a medical lab’s web and desktop systems. Real projects, used every day.',
            'វេទិកាកក់សណ្ឋាគារ ជាមួយកម្មវិធីទូរស័ព្ទផ្ទាល់ខ្លួន ប្រព័ន្ធ POS ថេប្លេតរបស់បារ និងប្រព័ន្ធវេប និងកុំព្យូទ័ររបស់មន្ទីរពិសោធន៍វេជ្ជសាស្ត្រ។ គម្រោងពិត ដែលប្រើប្រាស់រៀងរាល់ថ្ងៃ។',
          )}</p>
          <div className="actions">
            <a className="btn btn-ink" href="#work">{t('See our projects', 'មើលគម្រោងរបស់យើង')}</a>
            <Link className="btn btn-line" to="/contact">{t('Start a project', 'ចាប់ផ្តើមគម្រោង')}</Link>
          </div>
        </div>

        <div className="wk-visual" aria-hidden="true">
          <svg className="wk-curve" viewBox="0 0 600 520" preserveAspectRatio="none">
            <path d="M-20 430 C 140 520, 300 220, 620 300" />
            <path d="M-20 470 C 170 540, 330 270, 620 350" />
          </svg>
          <Link to="/work/saravoan-labo" className="wk-item wk-window" tabIndex={-1}>
            <div className="wk-bar"><i /><i /><i /></div>
            <img src="/img/saravoan-web-home.jpg" alt="" />
            <span className="wk-tag">Saravoan Labo</span>
          </Link>
          <Link to="/work/lori-pos" className="wk-item wk-tablet" tabIndex={-1}>
            <img src="/img/lori-floor.jpg" alt="" />
            <span className="wk-tag">LoRi POS</span>
          </Link>
          <Link to="/work/khmerrooms" className="wk-item wk-phone" tabIndex={-1}>
            <div className="wk-screen"><img src="/img/kr-app-home.jpg" alt="" /></div>
            <span className="wk-tag">KhmerRooms</span>
          </Link>
        </div>

        <ul className="wk-stats">
          <li><b>4</b><span>{t('projects in daily use', 'គម្រោងកំពុងប្រើប្រាស់')}</span></li>
          <li><b>{t('Web · iOS · Android', 'វេប · iOS · Android')}</b><span>{t('plus Windows desktop', 'និងកុំព្យូទ័រ Windows')}</span></li>
          <li><b>327</b><span>{t('API endpoints on KhmerRooms', 'ចំណុចភ្ជាប់ API លើ KhmerRooms')}</span></li>
          <li><b>{t('Khmer & English', 'ខ្មែរ និងអង់គ្លេស')}</b><span>{t('in every project', 'គ្រប់គម្រោង')}</span></li>
        </ul>
      </section>

      <section className="wrap section" id="work" aria-labelledby="work-h">
        <Floater kind="cube" side="left" top="4%" />
        <Floater kind="coin" side="right" top="46%" size={70} />
        <div className="head-row">
          <h2 id="work-h" className="h-section">{t('Our projects', 'គម្រោងរបស់យើង')}</h2>
          <p>{t(
            'Four projects built and shipped in 2026, from a nationwide booking platform to a lab that works offline.',
            'គម្រោងបួនដែលបានបង្កើត និងដាក់ឱ្យប្រើក្នុងឆ្នាំ 2026 ចាប់ពីវេទិកាកក់ទូទាំងប្រទេស ដល់មន្ទីរពិសោធន៍ដែលដំណើរការដោយគ្មានអ៊ីនធឺណិត។',
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
                    <Link className="text-link" to={`/work/${p.slug}`}>{t('View project', 'មើលគម្រោង')}</Link>
                  </div>
                  <dl className="facts">
                    <div><dt>{t('Built for', 'សម្រាប់')}</dt><dd>{p.client}</dd></div>
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
