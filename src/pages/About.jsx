import { Link } from 'react-router-dom'

const BUILD = [
  ['Websites with booking', 'Restaurants, barbershops, bars and clinics. Customers see your menu or prices and book in a few taps.', '/#websites', 'See website templates'],
  ['E-invitations', 'Weddings, engagements and birthdays, in Khmer and English, with each guest’s name on the cover.', '/#invitations', 'Try an invitation'],
  ['POS and business systems', 'Tablet point-of-sale, kitchen printing, stock and nightly reports, built around how your staff work.', '/work/lori-pos', 'Read the LoRi POS story'],
  ['Desktop and offline apps', 'Software that keeps working when the internet doesn’t, like the lab system we built for Saravoan.', '/work/saravoan-labo', 'Read the Saravoan story'],
]

const STEPS = [
  ['Clickable prototype', 'Within the first week you can tap through a working prototype and tell us what to change.'],
  ['Build in small releases', 'New features arrive every few days, so you see progress and steer it as we go.'],
  ['Test on your own devices', 'We test on your tablet, your printer and your phones before anything goes live.'],
  ['Go live, then keep improving', 'We keep shipping fixes and small improvements from your feedback.'],
]

const PROMISES = [
  ['You own it', 'Your data, your domain and your hosting stay in your name. Nothing is locked to us.'],
  ['Khmer and English', 'Everything we build can be in Khmer, English or both, for your staff and your customers.'],
  ['Made for your devices', 'We build for the phones, tablets and printers you already use, not a demo laptop.'],
  ['Plain answers', 'A clear price and timeline before work starts, and progress you can see every week.'],
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <h1>A small studio building software for Cambodian businesses.</h1>
          <div>
            <p className="lead">
              CamboWeb is based in Phnom Penh. We design and build websites, e-invitations and the systems
              businesses run on every day, from a bar’s tablet POS to a medical lab’s desktop app.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/work">See our work</Link>
              <Link className="btn btn-line" to="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="build-h">
        <div className="head-row">
          <h2 id="build-h" className="h-section">What we build</h2>
          <p>Ready-made templates when you need something fast, custom software when you need it to fit exactly.</p>
        </div>
        <ul className="features features-4">
          {BUILD.map(([t, d, href, label]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
              <Link className="text-link" to={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" id="process" aria-labelledby="process-h">
        <div className="head-row">
          <h2 id="process-h" className="h-section">How we work</h2>
          <p>The same four steps for every project, whether it’s an invitation or a full POS.</p>
        </div>
        <ol className="steps">
          {STEPS.map(([t, d]) => (
            <li key={t}><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="promise-h">
        <div className="head-row">
          <h2 id="promise-h" className="h-section">What you can count on</h2>
          <p>Small businesses can’t afford software that stops working or gets held hostage. So we work like this.</p>
        </div>
        <ul className="features features-4">
          {PROMISES.map(([t, d]) => (
            <li key={t}><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </section>
    </>
  )
}
