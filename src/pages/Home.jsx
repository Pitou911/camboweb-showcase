import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { invitations, posTemplates, siteUrl, templateUrl, websites } from '../data/templates'
import { projects } from '../data/projects'
import LiveFrame from '../components/LiveFrame'
import Cover from '../components/Cover'
import HeroStack from '../components/HeroStack'
import { usePrefs } from '../prefs'
import Floater from '../components/Floater'

const EMPTY = { a: '', b: '', guest: '', date: '', venue: '' }

function Picker({ items, active, onPick, label, sub }) {
  return (
    <div className="picker" role="tablist" aria-label={label}>
      {items.map((t) => (
        <button
          key={t.slug}
          role="tab"
          aria-selected={t.slug === active.slug}
          className={`pick ${t.slug === active.slug ? 'on' : ''}`}
          onClick={() => onPick(t)}
        >
          <span className="sw" style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }} />
          <span>
            <b>{t.title || t.name}</b>
            <small>{sub(t)}</small>
          </span>
        </button>
      ))}
    </div>
  )
}

function InviteStudio() {
  const { t, pick, lang } = usePrefs()
  const [slug, setSlug] = useState(invitations[0].slug)
  const raw = invitations.find((i) => i.slug === slug)
  const active = pick(raw)
  const [fields, setFields] = useState(EMPTY)
  const frame = useRef(null)

  // Only what the visitor typed is sent; the template keeps its own demo text otherwise.
  const typed = useMemo(() => Object.fromEntries(Object.entries(fields).filter(([, v]) => v.trim())), [fields])
  const push = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'cw-fields', fields: typed }, window.location.origin)
  }, [typed])
  useEffect(() => { push() }, [push])

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }))
  const fullUrl = templateUrl(active.slug, typed)

  return (
    <div className="studio">
      <Picker
        items={invitations.map(pick)}
        active={active}
        onPick={(x) => setSlug(x.slug)}
        label={t('Invitation templates', 'គំរូធៀប')}
        sub={(x) => (lang === 'kh' ? `${x.occasion} ${x.style}` : `${x.occasion}, ${x.style.toLowerCase()}`)}
      />

      <div className="phone-stage">
        <div className="phone">
          <div className="phone-notch" />
          <LiveFrame key={active.slug} ref={frame} src={templateUrl(active.slug)} title={`${raw.name} invitation template, live preview`} onLoad={push} />
        </div>
        <p className="phone-hint">{t('This is the real invitation. Tap it to open it, with music.', 'នេះជាធៀបពិត។ ចុចដើម្បីបើក ជាមួយតន្ត្រី។')}</p>
      </div>

      <div className="panel">
        <h3>{raw.name}</h3>
        <p className="panel-blurb">{active.blurb}</p>
        <ul className="hl">{active.highlights.map((h) => <li key={h}>{h}</li>)}<li>{t('Background music', 'តន្ត្រីផ្ទៃខាងក្រោយ')}</li></ul>

        <form className="custom" onSubmit={(e) => e.preventDefault()}>
          <p className="custom-title">{t('Make it yours', 'កែជារបស់អ្នក')}</p>
          <div className="pair">
            <label>{active.single ? t('Name', 'ឈ្មោះ') : t('First name', 'ឈ្មោះទីមួយ')}
              <input value={fields.a} onChange={set('a')} placeholder={active.defaults.a} />
            </label>
            {!active.single && (
              <label>{t('Second name', 'ឈ្មោះទីពីរ')}
                <input value={fields.b} onChange={set('b')} placeholder={active.defaults.b} />
              </label>
            )}
          </div>
          <label>{t('Guest’s name on the invitation', 'ឈ្មោះភ្ញៀវនៅលើធៀប')}
            <input value={fields.guest} onChange={set('guest')} placeholder={t('e.g. Mr. Song Dara', 'ឧ. លោក សុង ដារ៉ា')} />
          </label>
          <div className="pair">
            <label>{t('Date', 'កាលបរិច្ឆេទ')}
              <input type="date" value={fields.date} onChange={set('date')} />
            </label>
            {!active.noVenue && (
              <label>{t('Venue', 'ទីកន្លែង')}
                <input value={fields.venue} onChange={set('venue')} placeholder={active.defaults.venue} />
              </label>
            )}
          </div>
          <div className="panel-actions">
            <a className="btn btn-ink" href={fullUrl} target="_blank" rel="noreferrer">{t('Open full screen', 'បើកពេញអេក្រង់')}</a>
            <Link className="btn btn-line" to={`/contact?need=E-invitation&template=${encodeURIComponent(raw.name)}`}>{t('Order this invitation', 'កម្ម៉ង់ធៀបនេះ')}</Link>
          </div>
          <p className="fine">{t(
            'When you order, every guest gets their own link with their name on the cover, plus your real KHQR and your own song.',
            'ពេលកម្ម៉ង់ ភ្ញៀវម្នាក់ៗទទួលបានតំណផ្ទាល់ខ្លួន ដែលមានឈ្មោះរបស់គាត់នៅលើក្រប ព្រមទាំង KHQR និងបទចម្រៀងរបស់អ្នក។',
          )}</p>
        </form>
      </div>
    </div>
  )
}

function SiteStudio() {
  const { t, pick } = usePrefs()
  const [slug, setSlug] = useState(websites[0].slug)
  const active = pick(websites.find((w) => w.slug === slug))
  const [device, setDevice] = useState('desktop')
  const [name, setName] = useState('')
  const frame = useRef(null)

  const push = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'cw-fields', fields: { name } }, window.location.origin)
  }, [name])
  useEffect(() => { push() }, [push])

  const src = siteUrl(active.slug)
  const domain = name.trim() ? `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '')}.com` : active.domain

  return (
    <div className="site-studio">
      <div className="site-bar">
        <Picker items={websites.map(pick)} active={active} onPick={(x) => setSlug(x.slug)} label={t('Website templates', 'គំរូគេហទំព័រ')} sub={(x) => x.name} />
        <div className="site-controls">
          <label className="biz">{t('Your business name', 'ឈ្មោះអាជីវកម្មរបស់អ្នក')}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={active.title} />
          </label>
          <div className="seg" role="group" aria-label={t('Preview size', 'ទំហំមើល')}>
            <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>{t('Desktop', 'កុំព្យូទ័រ')}</button>
            <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>{t('Mobile', 'ទូរស័ព្ទ')}</button>
          </div>
        </div>
      </div>

      <div className={`site-view ${device}`}>
        {device === 'desktop' ? (
          <div className="browser">
            <div className="browser-bar"><i /><i /><i /><span className="url">{domain}</span></div>
            <LiveFrame key={active.slug + device} ref={frame} src={src} width={1280} height={800} title={`${active.title} website template, live preview`} onLoad={push} />
          </div>
        ) : (
          <div className="phone site-phone">
            <div className="phone-notch" />
            <LiveFrame key={active.slug + device} ref={frame} src={src} title={`${active.title} website template, mobile preview`} onLoad={push} />
          </div>
        )}
        <aside className="site-info">
          <h3>{active.title}</h3>
          <p>{active.blurb}</p>
          <ul className="hl">{active.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <div className="panel-actions">
            <a className="btn btn-ink" href={siteUrl(active.slug, name.trim())} target="_blank" rel="noreferrer">{t('Open full screen', 'បើកពេញអេក្រង់')}</a>
            <Link className="btn btn-line" to={`/contact?need=Website&template=${encodeURIComponent(active.title)}`}>{t('Use this template', 'ប្រើគំរូនេះ')}</Link>
          </div>
          <p className="fine">{t('Try the booking. It’s fully working, just not connected to a real business yet.', 'សាកល្បងកក់មើល។ វាដំណើរការពេញលេញ គ្រាន់តែមិនទាន់ភ្ជាប់ទៅអាជីវកម្មពិតប៉ុណ្ណោះ។')}</p>
        </aside>
      </div>
    </div>
  )
}

function PosStudio() {
  const { t, pick } = usePrefs()
  const [slug, setSlug] = useState(posTemplates[0].slug)
  const active = pick(posTemplates.find((p) => p.slug === slug))
  const [name, setName] = useState('')
  const frame = useRef(null)

  const push = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'cw-fields', fields: { name } }, window.location.origin)
  }, [name])
  useEffect(() => { push() }, [push])

  return (
    <div className="site-studio">
      <div className="site-bar">
        <Picker items={posTemplates.map(pick)} active={active} onPick={(x) => setSlug(x.slug)} label={t('POS templates', 'គំរូប្រព័ន្ធលក់')} sub={(x) => x.name} />
        <div className="site-controls">
          <label className="biz">{t('Your business name', 'ឈ្មោះអាជីវកម្មរបស់អ្នក')}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={active.title} />
          </label>
        </div>
      </div>
      <div className="site-view">
        <div className="tablet-frame">
          <LiveFrame key={active.slug} ref={frame} src={siteUrl(active.slug)} width={1280} height={800} title={`${active.title} POS template, live preview`} onLoad={push} />
        </div>
        <aside className="site-info">
          <h3>{active.title}</h3>
          <p>{active.blurb}</p>
          <ul className="hl">{active.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <div className="panel-actions">
            <a className="btn btn-ink" href={siteUrl(active.slug, name.trim())} target="_blank" rel="noreferrer">{t('Open full screen', 'បើកពេញអេក្រង់')}</a>
            <Link className="btn btn-line" to={`/contact?need=POS%20system&template=${encodeURIComponent(active.title)}`}>{t('Get this POS', 'យក POS នេះ')}</Link>
          </div>
          <p className="fine">{t('Ring up a sale and take payment. It runs on any Android tablet or iPad. Nothing here is saved.', 'សាកលក់ ហើយទទួលប្រាក់។ ដំណើរការលើថេប្លេត Android ឬ iPad។ គ្មានអ្វីត្រូវបានរក្សាទុកទេ។')}</p>
        </aside>
      </div>
    </div>
  )
}

function WorkStrip() {
  const { pick } = usePrefs()
  return (
    <div className="work-strip">
      {projects.map((raw) => {
        const p = pick(raw)
        return (
          <Link key={p.slug} to={`/work/${p.slug}`} className="work-card">
            <Cover project={raw} />
            <h3>{p.name}</h3>
            <p>{p.type}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default function Home() {
  const { t } = usePrefs()
  return (
    <>
      <section className="page-hero home-hero">
        <div className="wrap page-hero-grid">
          <div>
            <h1>{t('Try it before you buy.', 'សាកល្បងមុនទិញ។')}</h1>
            <p className="lead">{t(
              'Live invitations, websites and POS systems from a Phnom Penh studio.',
              'ធៀបឌីជីថល គេហទំព័រ និងប្រព័ន្ធលក់ POS ដែលដំណើរការពិត ពីស្ទូឌីយោមួយនៅភ្នំពេញ។',
            )}</p>
            <nav className="tpl-tabs" aria-label={t('Template types', 'ប្រភេទគំរូ')}>
              <a href="#invitations">{t('E-invitations', 'ធៀបឌីជីថល')} <span>{invitations.length}</span></a>
              <a href="#websites">{t('Websites', 'គេហទំព័រ')} <span>{websites.length}</span></a>
              <a href="#pos">POS <span>{posTemplates.length}</span></a>
            </nav>
          </div>
          <HeroStack />
        </div>
      </section>

      <section className="wrap section" id="invitations" aria-labelledby="inv-h">
        <Floater kind="ring" side="left" top="8%" />
        <div className="head-row">
          <h2 id="inv-h" className="h-section">{t('E-invitations', 'ធៀបឌីជីថល')}</h2>
          <p>{t(
            'Weddings, engagements and birthdays. Khmer and English, music, countdown, map and KHQR gift.',
            'អាពាហ៍ពិពាហ៍ ភ្ជាប់ពាក្យ និងខួបកំណើត។ ភាសាខ្មែរ និងអង់គ្លេស តន្ត្រី រាប់ថយក្រោយ ផែនទី និង KHQR សម្រាប់ចំណងដៃ។',
          )}</p>
        </div>
        <InviteStudio />
      </section>

      <section className="wrap section" id="websites" aria-labelledby="web-h">
        <Floater kind="cube" side="right" top="10%" />
        <div className="head-row">
          <h2 id="web-h" className="h-section">{t('Business websites', 'គេហទំព័រអាជីវកម្ម')}</h2>
          <p>{t(
            'Built for booking. Each one works on phones first, loads fast and shows prices in dollars and riel.',
            'រចនាសម្រាប់ការកក់។ ដំណើរការល្អលើទូរស័ព្ទ ផ្ទុកលឿន និងបង្ហាញតម្លៃជាដុល្លារ និងរៀល។',
          )}</p>
        </div>
        <SiteStudio />
      </section>

      <section className="wrap section" id="pos" aria-labelledby="pos-h">
        <Floater kind="coin" side="left" top="14%" />
        <div className="head-row">
          <h2 id="pos-h" className="h-section">{t('POS systems', 'ប្រព័ន្ធលក់ POS')}</h2>
          <p>
            {t('Built on the tablet POS we made for ', 'ផ្អែកលើប្រព័ន្ធ POS ថេប្លេតដែលយើងបង្កើតសម្រាប់ ')}
            <Link className="text-link" to="/work/lori-pos">LoRi</Link>
            {t('. Prices in dollars and riel, KHQR, kitchen printing and daily reports.', '។ តម្លៃជាដុល្លារ និងរៀល KHQR ការព្រីនទៅផ្ទះបាយ និងរបាយការណ៍ប្រចាំថ្ងៃ។')}
          </p>
        </div>
        <PosStudio />
      </section>

      <section className="wrap section" aria-labelledby="clients-h">
        <Floater kind="ring" side="right" top="18%" size={64} />
        <div className="head-row">
          <h2 id="clients-h" className="h-section">{t('Built for real clients', 'បង្កើតសម្រាប់អតិថិជនពិត')}</h2>
          <p>
            {t('Need something custom? These are in daily use. ', 'ត្រូវការអ្វីដែលធ្វើតាមតម្រូវការ? ទាំងនេះកំពុងប្រើប្រាស់ជារៀងរាល់ថ្ងៃ។ ')}
            <Link className="text-link" to="/work">{t('See all client work', 'មើលស្នាដៃទាំងអស់')}</Link>
          </p>
        </div>
        <WorkStrip />
      </section>
    </>
  )
}
