import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { invitations, posTemplates, siteUrl, templateUrl, websites } from '../data/templates'
import LiveFrame from '../components/LiveFrame'
import { Link } from 'react-router-dom'
import Cover from '../components/Cover'
import { projects } from '../data/projects'

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
  const [active, setActive] = useState(invitations[0])
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
      <Picker items={invitations} active={active} onPick={setActive} label="Invitation templates" sub={(t) => `${t.occasion}, ${t.style.toLowerCase()}`} />

      <div className="phone-stage">
        <div className="phone">
          <div className="phone-notch" />
          <LiveFrame key={active.slug} ref={frame} src={templateUrl(active.slug)} title={`${active.name} invitation template, live preview`} onLoad={push} />
        </div>
        <p className="phone-hint">This is the real invitation. Tap it to open it, with music.</p>
      </div>

      <div className="panel">
        <h3>{active.name}</h3>
        <p className="panel-blurb">{active.blurb}</p>
        <ul className="hl">{active.highlights.map((h) => <li key={h}>{h}</li>)}<li>Background music</li></ul>

        <form className="custom" onSubmit={(e) => e.preventDefault()}>
          <p className="custom-title">Make it yours</p>
          <div className="pair">
            <label>{active.single ? 'Name' : 'First name'}
              <input value={fields.a} onChange={set('a')} placeholder={active.defaults.a} />
            </label>
            {!active.single && (
              <label>Second name
                <input value={fields.b} onChange={set('b')} placeholder={active.defaults.b} />
              </label>
            )}
          </div>
          <label>Guest’s name on the invitation
            <input value={fields.guest} onChange={set('guest')} placeholder="e.g. Mr. Song Dara" />
          </label>
          <div className="pair">
            <label>Date
              <input type="date" value={fields.date} onChange={set('date')} />
            </label>
            {!active.noVenue && (
              <label>Venue
                <input value={fields.venue} onChange={set('venue')} placeholder={active.defaults.venue} />
              </label>
            )}
          </div>
          <div className="panel-actions">
            <a className="btn btn-ink" href={fullUrl} target="_blank" rel="noreferrer">Open full screen</a>
            <Link className="btn btn-line" to={`/contact?need=E-invitation&template=${encodeURIComponent(active.name)}`}>Order this invitation</Link>
          </div>
          <p className="fine">When you order, every guest gets their own link with their name on the cover plus your real KHQR and your own song.</p>
        </form>
      </div>
    </div>
  )
}

function SiteStudio() {
  const [active, setActive] = useState(websites[0])
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
        <Picker items={websites} active={active} onPick={setActive} label="Website templates" sub={(t) => t.name} />
        <div className="site-controls">
          <label className="biz">Your business name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={active.title} />
          </label>
          <div className="seg" role="group" aria-label="Preview size">
            <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>Desktop</button>
            <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>Mobile</button>
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
            <a className="btn btn-ink" href={siteUrl(active.slug, name.trim())} target="_blank" rel="noreferrer">Open full screen</a>
            <Link className="btn btn-line" to={`/contact?need=Website&template=${encodeURIComponent(active.title)}`}>Use this template</Link>
          </div>
          <p className="fine">Try the booking. It’s fully working, just not connected to a real business yet.</p>
        </aside>
      </div>
    </div>
  )
}

function PosStudio() {
  const [active, setActive] = useState(posTemplates[0])
  const [name, setName] = useState('')
  const frame = useRef(null)

  const push = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'cw-fields', fields: { name } }, window.location.origin)
  }, [name])
  useEffect(() => { push() }, [push])

  return (
    <div className="site-studio">
      <div className="site-bar">
        <Picker items={posTemplates} active={active} onPick={setActive} label="POS templates" sub={(t) => t.name} />
        <div className="site-controls">
          <label className="biz">Your business name
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
            <a className="btn btn-ink" href={siteUrl(active.slug, name.trim())} target="_blank" rel="noreferrer">Open full screen</a>
            <Link className="btn btn-line" to={`/contact?need=POS%20system&template=${encodeURIComponent(active.title)}`}>Get this POS</Link>
          </div>
          <p className="fine">Ring up a sale and take payment. It runs on any Android tablet or iPad. Nothing here is saved.</p>
        </aside>
      </div>
    </div>
  )
}

function WorkStrip() {
  return (
    <div className="work-strip">
      {projects.map((p) => (
        <Link key={p.slug} to={`/work/${p.slug}`} className="work-card">
          <Cover project={p} />
          <h3>{p.name}</h3>
          <p>{p.type}</p>
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="page-hero home-hero">
        <div className="wrap page-hero-grid">
          <div>
            <h1>Invitations and websites you can try before you buy.</h1>
            <p className="lead">
              We’re CamboWeb, a small studio in Phnom Penh. Every template here is live: open an invitation,
              book a table, pick a barber. When you find the one, we make it yours.
            </p>
            <nav className="tpl-tabs" aria-label="Template types">
              <a href="#invitations">E-invitations <span>{invitations.length}</span></a>
              <a href="#websites">Websites <span>{websites.length}</span></a>
              <a href="#pos">POS <span>{posTemplates.length}</span></a>
            </nav>
          </div>
          <div className="showcase" aria-hidden="true">
            <figure className="sc-browser sc-back">
              <div className="browser-bar"><i /><i /><i /><span className="url">sharpandco.com</span></div>
              <img src="/img/shot-barber.jpg" alt="" />
            </figure>
            <figure className="sc-browser sc-front">
              <div className="browser-bar"><i /><i /><i /><span className="url">kampottable.com</span></div>
              <img src="/img/shot-restaurant.jpg" alt="" />
            </figure>
            <div className="sc-phone"><img src="/img/shot-golden-lotus.jpg" alt="" /></div>
          </div>
        </div>
      </section>

      <section className="wrap section" id="invitations" aria-labelledby="inv-h">
        <div className="head-row">
          <h2 id="inv-h" className="h-section">E-invitations</h2>
          <p>Weddings, engagements and birthdays. Khmer and English, music, countdown, map and KHQR gift.</p>
        </div>
        <InviteStudio />
      </section>

      <section className="wrap section" id="websites" aria-labelledby="web-h">
        <div className="head-row">
          <h2 id="web-h" className="h-section">Business websites</h2>
          <p>Built for booking. Each one works on phones first, loads fast and shows prices in dollars and riel.</p>
        </div>
        <SiteStudio />
      </section>

      <section className="wrap section" id="pos" aria-labelledby="pos-h">
        <div className="head-row">
          <h2 id="pos-h" className="h-section">POS systems</h2>
          <p>
            Built on the tablet POS we made for <Link className="text-link" to="/work/lori-pos">LoRi</Link>. Prices in dollars
            and riel, KHQR, kitchen printing and daily reports.
          </p>
        </div>
        <PosStudio />
      </section>

      <section className="wrap section" aria-labelledby="clients-h">
        <div className="head-row">
          <h2 id="clients-h" className="h-section">Built for real clients</h2>
          <p>Need something custom? These are in daily use. <Link className="text-link" to="/work">See all client work</Link></p>
        </div>
        <WorkStrip />
      </section>
    </>
  )
}
