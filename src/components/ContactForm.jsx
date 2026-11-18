import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site } from '../data/site'
import { usePrefs } from '../prefs'

const NEEDS = ['Website', 'E-invitation', 'POS system', 'Business system', 'Something else']
const BUDGETS = ['Under $300', '$300 – $1,000', '$1,000 – $3,000', '$3,000+']
const KH = {
  Website: 'គេហទំព័រ', 'E-invitation': 'ធៀបឌីជីថល', 'POS system': 'ប្រព័ន្ធលក់ POS', 'Business system': 'ប្រព័ន្ធអាជីវកម្ម',
  'Something else': 'ផ្សេងទៀត', 'Under $300': 'ក្រោម $300',
}

// Builds a ready-to-send message and opens Telegram. Nothing is stored or sent by the site.
export default function ContactForm() {
  const { t, lang } = usePrefs()
  const label = (x) => (lang === 'kh' && KH[x]) || x
  // Template pages link here with ?need=…&template=… so the form arrives filled in.
  const [params] = useSearchParams()
  const [need, setNeed] = useState(NEEDS.includes(params.get('need')) ? params.get('need') : 'Website')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState(params.get('template') ? `I like the ${params.get('template')} template.` : '')
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
      setStatus(t('Message copied. Paste it into the Telegram chat that just opened.', 'បានចម្លងសារ។ បិទភ្ជាប់វាក្នុង Telegram ដែលទើបបើក។'))
    } else {
      setStatus(t('Message copied to your clipboard.', 'បានចម្លងសាររួចហើយ។'))
    }
  }

  return (
    <form className="contact" onSubmit={send}>
      <fieldset className="chip-set">
        <legend>{t('What do you need?', 'តើអ្នកត្រូវការអ្វី?')}</legend>
        <div className="chip-row">
          {NEEDS.map((n) => (
            <span key={n} className="chip">
              <input type="radio" name="need" id={`need-${n}`} checked={need === n} onChange={() => setNeed(n)} />
              <label htmlFor={`need-${n}`}>{label(n)}</label>
            </span>
          ))}
        </div>
      </fieldset>
      <fieldset className="chip-set">
        <legend>{t('Budget (optional)', 'ថវិកា (មិនបាច់ក៏បាន)')}</legend>
        <div className="chip-row">
          {BUDGETS.map((b) => (
            <span key={b} className="chip">
              <input type="radio" name="budget" id={`b-${b}`} checked={budget === b} onChange={() => setBudget(b)} />
              <label htmlFor={`b-${b}`}>{label(b)}</label>
            </span>
          ))}
        </div>
      </fieldset>
      <label className="field">{t('Your name', 'ឈ្មោះរបស់អ្នក')}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>
      <label className="field">{t('Tell us a little about it', 'ប្រាប់យើងបន្តិចអំពីវា')}
        <textarea rows="3" value={details} onChange={(e) => setDetails(e.target.value)} placeholder={t('e.g. A website for my café with a menu and table booking', 'ឧ. គេហទំព័រសម្រាប់ហាងកាហ្វេ មានម៉ឺនុយ និងការកក់តុ')} />
      </label>
      <div className="actions">
        <button className="btn btn-ink" type="submit">{site.telegram ? t('Send on Telegram', 'ផ្ញើតាម Telegram') : t('Copy my message', 'ចម្លងសាររបស់ខ្ញុំ')}</button>
      </div>
      <p className="note" aria-live="polite">{status || t('We reply within a day, in Khmer or English.', 'យើងឆ្លើយតបក្នុងរយៈពេលមួយថ្ងៃ ជាភាសាខ្មែរ ឬអង់គ្លេស។')}</p>
    </form>
  )
}
