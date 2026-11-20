import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { invitations, posTemplates, siteUrl, templateUrl, websites } from '../data/templates'
import { projects } from '../data/projects'
import LiveFrame from '../components/LiveFrame'
import Cover from '../components/Cover'
import HeroTech from '../components/HeroTech'
import Icon from '../components/Icon'
import SectionHead from '../components/SectionHead'
import { usePrefs } from '../prefs'

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

// [icon, English title, Khmer title, English text, Khmer text, link]
const SERVICES = [
  ['globe', 'Business websites', 'គេហទំព័រអាជីវកម្ម', 'Fast, phone-first sites with booking, menus and prices in dollars and riel.', 'គេហទំព័រលឿន សម្រាប់ទូរស័ព្ទ មានការកក់ ម៉ឺនុយ និងតម្លៃជាដុល្លារ និងរៀល។', '/#websites'],
  ['pos', 'POS systems', 'ប្រព័ន្ធលក់ POS', 'Tablet point-of-sale for marts, cafés, bars and restaurants.', 'ប្រព័ន្ធលក់លើថេប្លេត សម្រាប់ម៉ាត ហាងកាហ្វេ បារ និងភោជនីយដ្ឋាន។', '/#pos'],
  ['layers', 'Business systems', 'ប្រព័ន្ធអាជីវកម្ម', 'Stock, shifts, staff accounts and reports, built around how you work.', 'ស្តុក វេនការងារ គណនីបុគ្គលិក និងរបាយការណ៍ តាមរបៀបដែលអ្នកធ្វើការ។', '/work/lori-pos'],
  ['desktop', 'Desktop & offline apps', 'កម្មវិធីកុំព្យូទ័រ', 'Software that keeps running when the internet doesn’t.', 'កម្មវិធីដែលនៅតែដំណើរការ ពេលអ៊ីនធឺណិតដាច់។', '/work/saravoan-labo'],
  ['mail', 'E-invitations', 'ធៀបឌីជីថល', 'Weddings, engagements and birthdays, with each guest’s name on the cover.', 'អាពាហ៍ពិពាហ៍ ភ្ជាប់ពាក្យ និងខួបកំណើត មានឈ្មោះភ្ញៀវម្នាក់ៗនៅលើក្រប។', '/#invitations'],
]

const TABS = ['websites', 'pos', 'invitations']

function Templates() {
  const { t } = usePrefs()
  const { hash } = useLocation()
  const [tab, setTab] = useState(() => (TABS.includes(hash.slice(1)) ? hash.slice(1) : 'websites'))
  useEffect(() => { if (TABS.includes(hash.slice(1))) setTab(hash.slice(1)) }, [hash])
  const labels = {
    invitations: [t('E-invitations', 'ធៀបឌីជីថល'), invitations.length],
    websites: [t('Websites', 'គេហទំព័រ'), websites.length],
    pos: [t('POS systems', 'ប្រព័ន្ធលក់ POS'), posTemplates.length],
  }
  return (
    <section className="wrap section" id="templates" aria-labelledby="tpl-h">
      {TABS.map((id) => <span key={id} id={id} className="anchor" />)}
      <SectionHead
        id="tpl-h"
        eyebrow={t('Try before you buy', 'សាកល្បងមុនទិញ')}
        title={t('Live templates you can play with', 'គំរូដែលអ្នកអាចសាកល្បងបានភ្លាមៗ')}
        text={t('Every template here really works. Book a table, ring up a sale, open an invitation.', 'គំរូនីមួយៗដំណើរការពិត។ កក់តុ សាកលក់ ឬបើកធៀប។')}
      />
      <div className="tabs" role="tablist" aria-label={t('Template types', 'ប្រភេទគំរូ')}>
        {TABS.map((id) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
            {labels[id][0]} <span>{labels[id][1]}</span>
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {tab === 'invitations' && <InviteStudio />}
        {tab === 'websites' && <SiteStudio />}
        {tab === 'pos' && <PosStudio />}
      </div>
    </section>
  )
}

export default function Home() {
  const { t, pick } = usePrefs()
  const stats = [
    ['check', '3', t('client systems live', 'ប្រព័ន្ធអតិថិជនកំពុងដំណើរការ')],
    ['layers', '11', t('live templates', 'គំរូដែលសាកល្បងបាន')],
    ['lang', '2', t('languages, Khmer & English', 'ភាសា ខ្មែរ និងអង់គ្លេស')],
    ['shield', '~130', t('automated tests on LoRi POS', 'តេស្តស្វ័យប្រវត្តិលើ LoRi POS')],
    ['bolt', t('7 wks', '៧ សប្តាហ៍'), t('from prototype to launch', 'ពីគំរូដល់ដំណើរការពិត')],
  ]
  return (
    <>
      <section className="hx wrap">
        <div className="hx-text">
          <p className="eyebrow">{t('Web studio in Phnom Penh', 'ស្ទូឌីយោវេបនៅភ្នំពេញ')}</p>
          <h1>{t(<>Software that helps your business <em>grow.</em></>, <>កម្មវិធីដែលជួយឱ្យអាជីវកម្មរបស់អ្នក<em>រីកចម្រើន។</em></>)}</h1>
          <p className="lead">{t(
            'Business websites, POS systems and custom software you can try live before you buy.',
            'គេហទំព័រអាជីវកម្ម ប្រព័ន្ធលក់ POS និងកម្មវិធីតាមតម្រូវការ ដែលអ្នកអាចសាកល្បងផ្ទាល់ មុនពេលទិញ។',
          )}</p>
          <div className="hx-actions">
            <a className="btn btn-ink" href="#templates">{t('Explore templates', 'មើលគំរូ')} <Icon name="arrow" size={18} /></a>
            <Link className="play-link" to="/work"><span className="play"><Icon name="play" size={18} /></span>{t('See our work', 'មើលស្នាដៃ')}</Link>
          </div>
        </div>
        <div className="hx-visual">
          <HeroTech />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="svc-h">
        <SectionHead
          id="svc-h"
          eyebrow={t('What we do', 'អ្វីដែលយើងធ្វើ')}
          title={t('Services that drive real results', 'សេវាកម្មដែលផ្តល់លទ្ធផលពិត')}
          text={t('Clean design and solid engineering, for software Cambodian businesses rely on.', 'ការរចនាស្អាត និងវិស្វកម្មរឹងមាំ សម្រាប់កម្មវិធីដែលអាជីវកម្មខ្មែរពឹងផ្អែកបាន។')}
          action={<Link className="pill" to="/about">{t('About us', 'អំពីយើង')} <Icon name="arrow" size={16} /></Link>}
        />
        <ul className="svc">
          {SERVICES.map(([icon, en, kh, d, dk, href]) => (
            <li key={en}>
              <Link to={href}>
                <span className="svc-ico"><Icon name={icon} /></span>
                <h3>{t(en, kh)}</h3>
                <p>{t(d, dk)}</p>
                <span className="more">{t('Learn more', 'ស្វែងយល់បន្ថែម')} <Icon name="arrow" size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Templates />

      <section className="wrap section" aria-labelledby="work-h">
        <SectionHead
          id="work-h"
          eyebrow={t('Our work', 'ស្នាដៃរបស់យើង')}
          title={t('Featured projects that make an impact', 'គម្រោងលេចធ្លោដែលបង្កើតភាពខុសគ្នា')}
          action={<Link className="btn btn-ink btn-sm" to="/work">{t('View all projects', 'មើលគម្រោងទាំងអស់')} <Icon name="arrow" size={16} /></Link>}
        />
        <div className="proj">
          {projects.map((raw) => {
            const p = pick(raw)
            return (
              <Link key={p.slug} to={`/work/${p.slug}`} className="proj-card">
                <Cover project={raw} />
                <div className="proj-meta">
                  <div><h3>{p.name}</h3><p>{p.type}</p></div>
                  <span className="circle"><Icon name="arrow" size={18} /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="wrap stats-wrap" aria-label={t('CamboWeb in numbers', 'CamboWeb ជាលេខ')}>
        <ul className="stats">
          {stats.map(([icon, n, l]) => (
            <li key={l}><Icon name={icon} size={30} /><div><b>{n}</b><span>{l}</span></div></li>
          ))}
        </ul>
      </section>
    </>
  )
}
