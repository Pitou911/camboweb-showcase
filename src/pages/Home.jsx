import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Cover from '../components/Cover'

const SERVICES = [
  ['Business systems', 'POS, inventory, lab and booking systems built around how your team actually works.'],
  ['Mobile & desktop apps', 'Android tablet apps and offline Windows apps that work without reliable internet.'],
  ['Websites & invitations', 'Fast, beautiful sites and digital invitations, designed for Khmer and English.'],
]

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <p className="eyebrow"><span className="dot" /> Web studio · Phnom Penh</p>
          <h1>
            Software that runs<br />real Cambodian <span className="neon-text">businesses.</span>
          </h1>
          <p className="lead">
            From a bar’s point-of-sale to a medical lab’s reports, CamboWeb designs and builds
            tools that people use every day, in Khmer and English.
          </p>
          <div className="hero-actions">
            <a className="btn btn-dark" href="#work">See our work</a>
            <a className="btn btn-ghost" href="#contact">Start a project</a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <div className="glow-tile">
            <img src="/img/camboweb-pfp-neon-black.png" alt="" />
          </div>
        </div>
      </section>

      <section className="wrap section" id="work">
        <div className="section-head">
          <h2>Selected work</h2>
          <p>{projects.length} projects delivered in 2026</p>
        </div>
        <div className="grid">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className={`card ${i === 0 ? 'card-wide' : ''}`}>
              <Cover project={p} />
              <div className="card-body">
                <div className="tags">
                  <span>{p.industry}</span>
                  <span>{p.type}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <span className="more">View case study <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section" id="services">
        <div className="section-head">
          <h2>What we build</h2>
        </div>
        <div className="services">
          {SERVICES.map(([t, d], i) => (
            <div key={t} className="service">
              <span className="num">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
