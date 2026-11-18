import ContactForm from '../components/ContactForm'
import { site } from '../data/site'

const NEXT = [
  ['We reply within a day', 'On Telegram, by phone or by email, in Khmer or English.'],
  ['We talk it through', 'A short chat about what you need, who will use it and when you need it.'],
  ['You get a price and a timeline', 'In writing, before any work starts. No surprises later.'],
]

const FAQ = [
  ['How much does it cost?', 'It depends on what you need. Pick a budget range in the form and we’ll tell you honestly what fits it. Templates cost much less than custom software.'],
  ['How long does it take?', 'An e-invitation is usually ready in about a week. A custom system takes longer: our LoRi POS took seven weeks. You get a timeline before we start.'],
  ['Who owns the website or app?', 'You do. Your data, domain and hosting stay in your name.'],
  ['Can it be in Khmer?', 'Yes. Everything we build can be in Khmer, English or both.'],
  ['Do you help after launch?', 'Yes. We keep fixing and improving things from your feedback after it goes live.'],
]

export default function Contact() {
  const ways = [
    site.telegram && ['Telegram', `@${site.telegram}`, `https://t.me/${site.telegram}`],
    site.phone && ['Phone', site.phone, `tel:${site.phone.replace(/\s/g, '')}`],
    site.email && ['Email', site.email, `mailto:${site.email}`],
  ].filter(Boolean)

  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <h1>Start a project.</h1>
          <p className="lead">
            Tell us what you need in a few lines. A template, a custom website or a full system, we’ll reply
            within a day with honest advice and a next step.
          </p>
        </div>
      </section>

      <section className="wrap section contact-grid">
        <ContactForm />
        <aside className="contact-side">
          <div>
            <h2>What happens next</h2>
            <ol className="next-steps">
              {NEXT.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
            </ol>
          </div>
          <div>
            <h2>Other ways to reach us</h2>
            <dl className="facts">
              {ways.map(([k, v, href]) => (
                <div key={k}><dt>{k}</dt><dd><a className="text-link" href={href} target="_blank" rel="noreferrer">{v}</a></dd></div>
              ))}
              <div><dt>Studio</dt><dd>Phnom Penh, Cambodia</dd></div>
              <div><dt>Languages</dt><dd>Khmer and English</dd></div>
            </dl>
          </div>
        </aside>
      </section>

      <section className="wrap section" aria-labelledby="faq-h">
        <div className="head-row">
          <h2 id="faq-h" className="h-section">Questions we often get</h2>
          <p>Something else on your mind? Ask it in the form above.</p>
        </div>
        <div className="problems faq">
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>
    </>
  )
}
