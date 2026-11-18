import { useState } from 'react'
import { site } from '../data/site'

const NEEDS = ['Website', 'E-invitation', 'POS system', 'Business system', 'Something else']
const BUDGETS = ['Under $300', '$300 – $1,000', '$1,000 – $3,000', '$3,000+']

// Builds a ready-to-send message and opens Telegram. Nothing is stored or sent by the site.
export default function ContactForm() {
  const [need, setNeed] = useState('Website')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState('')

  const message = [
    `Hi CamboWeb, I'm ${name || '…'}.`,
    `I'm interested in: ${need}.`,
    budget && `Budget: ${budget}.`,
    details && `Details: ${details}`,
  ].filter(Boolean).join('\n')

  const send = async (e) => {
    e.preventDefault()
    try { await navigator.clipboard.writeText(message) } catch { /* ignore */ }
    if (site.telegram) {
      window.open(`https://t.me/${site.telegram}`, '_blank', 'noopener')
      setStatus('Message copied. Paste it into the Telegram chat that just opened.')
    } else {
      setStatus('Message copied to your clipboard.')
    }
  }

  return (
    <form className="contact" onSubmit={send}>
      <fieldset className="chip-set">
        <legend>What do you need?</legend>
        {NEEDS.map((n) => (
          <span key={n}>
            <input type="radio" name="need" id={`need-${n}`} checked={need === n} onChange={() => setNeed(n)} />
            <label htmlFor={`need-${n}`}>{n}</label>
          </span>
        ))}
      </fieldset>
      <fieldset className="chip-set">
        <legend>Budget (optional)</legend>
        {BUDGETS.map((b) => (
          <span key={b}>
            <input type="radio" name="budget" id={`b-${b}`} checked={budget === b} onChange={() => setBudget(b)} />
            <label htmlFor={`b-${b}`}>{b}</label>
          </span>
        ))}
      </fieldset>
      <label className="field">Your name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>
      <label className="field">Tell us a little about it
        <textarea rows="3" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="e.g. A website for my café with a menu and table booking" />
      </label>
      <div className="actions">
        <button className="btn btn-neon" type="submit">{site.telegram ? 'Send on Telegram' : 'Copy my message'}</button>
      </div>
      <p className="note" aria-live="polite">{status || 'We reply within a day, in Khmer or English.'}</p>
    </form>
  )
}
