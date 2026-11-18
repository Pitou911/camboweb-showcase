import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { invitations, siteUrl, templateUrl, websites } from '../data/templates'
import LiveFrame from '../components/LiveFrame'
import { Tablet } from '../components/Devices'

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
  const [copied, setCopied] = useState(false)
  const frame = useRef(null)

  // Only what the visitor typed is sent; the template keeps its own demo text otherwise.
  const typed = useMemo(() => Object.fromEntries(Object.entries(fields).filter(([, v]) => v.trim())), [fields])
  const push = useCallback(() => {
    frame.current?.contentWindow?.postMessage({ type: 'cw-fields', fields: typed }, window.location.origin)
  }, [typed])
  useEffect(() => { push() }, [push])

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }))
  const fullUrl = templateUrl(active.slug, typed)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(new URL(fullUrl, window.location.origin).href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked; the open link still works */ }
  }

  return (
    <div className="studio">
      <Picker items={invitations} active={active} onPick={setActive} label="Invitation templates" sub={(t) => `${t.occasion}, ${t.style.toLowerCase()}`} />

      <div className="phone-stage">
        <div className="phone-glow" />
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
            <a className="btn btn-neon" href={fullUrl} target="_blank" rel="noreferrer">Open full screen</a>
            <button type="button" className="btn btn-glass" onClick={copy}>{copied ? 'Link copied' : 'Copy guest link'}</button>
          </div>
          <p className="fine">Each guest gets their own link with their name on the cover.</p>
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
            <a className="btn btn-neon" href={siteUrl(active.slug, name.trim())} target="_blank" rel="noreferrer">Open full screen</a>
            <a className="btn btn-glass" href="#contact">Use this template</a>
          </div>
          <p className="fine">Try the booking. It’s fully working, just not connected to a real business yet.</p>
        </aside>
      </div>
    </div>
  )
}

export default function Templates() {
  return (
    <>
      <section className="tpl-hero night">
        <div className="wrap">
          <h1>Templates you can try before you buy.</h1>
          <p className="lead">
            Every template here is live. Open an invitation, book a table, pick a barber. Type your own
            names and watch it change. When you find the one, we make it yours.
          </p>
          <nav className="tpl-tabs" aria-label="Template types">
            <a href="#invitations">E-invitations <span>{invitations.length}</span></a>
            <a href="#websites">Websites <span>{websites.length}</span></a>
            <a href="#pos">POS <span>soon</span></a>
          </nav>
        </div>
      </section>

      <section className="night studio-wrap" id="invitations">
        <div className="wrap">
          <div className="studio-head">
            <h2>E-invitations</h2>
            <p>Weddings, engagements and birthdays. Khmer and English, music, countdown, map, KHQR gift and RSVP.</p>
          </div>
          <InviteStudio />
        </div>
      </section>

      <section className="night studio-wrap alt" id="websites">
        <div className="wrap">
          <div className="studio-head">
            <h2>Business websites</h2>
            <p>Built for booking. Each one works on phones first, loads fast and shows prices in dollars and riel.</p>
          </div>
          <SiteStudio />
        </div>
      </section>

      <section className="wrap section" id="pos">
        <div className="pos-soon">
          <div>
            <h2 className="h-section">POS template</h2>
            <p className="body-lg">
              The tablet point-of-sale we built for LoRi, ready for your restaurant, bar or café: floor plan,
              kitchen printing, bills in USD and riel, and nightly sales reports. Live preview coming soon.
            </p>
            <a className="btn btn-ink" href="#contact">Ask for a demo</a>
          </div>
          <div className="pos-dev"><Tablet /></div>
        </div>
      </section>
    </>
  )
}
