import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { invitations, templateUrl, websites } from '../data/templates'
import LiveFrame from '../components/LiveFrame'
import { Tablet } from '../components/Devices'

const EMPTY = { a: '', b: '', guest: '', date: '', venue: '' }

function Studio() {
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
      <div className="picker" role="tablist" aria-label="Invitation templates">
        {invitations.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={t.slug === active.slug}
            className={`pick ${t.slug === active.slug ? 'on' : ''}`}
            onClick={() => setActive(t)}
          >
            <span className="sw" style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }} />
            <span>
              <b>{t.name}</b>
              <small>{t.occasion}, {t.style.toLowerCase()}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="phone">
          <div className="phone-notch" />
          <LiveFrame
            key={active.slug}
            ref={frame}
            src={templateUrl(active.slug)}
            title={`${active.name} invitation template, live preview`}
            onLoad={push}
          />
        </div>
        <p className="phone-hint">This is the real invitation. Tap it, open it, scroll it.</p>
      </div>

      <div className="panel">
        <h3>{active.name}</h3>
        <p className="panel-blurb">{active.blurb}</p>
        <ul className="hl">{active.highlights.map((h) => <li key={h}>{h}</li>)}</ul>

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

export default function Templates() {
  return (
    <>
      <section className="tpl-hero night">
        <div className="wrap">
          <h1>Templates you can try before you buy.</h1>
          <p className="lead">
            Pick an invitation, type your names and watch it change. Every template works on any phone,
            in Khmer and English, with a personal link for each guest.
          </p>
          <nav className="tpl-tabs" aria-label="Template types">
            <a href="#invitations" className="on">E-invitations <span>{invitations.length}</span></a>
            <a href="#websites">Websites <span>soon</span></a>
            <a href="#pos">POS <span>soon</span></a>
          </nav>
        </div>
      </section>

      <section className="night studio-wrap" id="invitations">
        <div className="wrap"><Studio /></div>
      </section>

      <section className="wrap section" id="websites">
        <div className="head-row">
          <h2 className="h-section">Website templates</h2>
          <p className="muted">Coming soon. Ask us and we’ll show you a preview.</p>
        </div>
        <div className="soon-grid">
          {websites.map((w) => (
            <article key={w.name} className="soon">
              <div className="soon-img"><img src={w.img} alt="" loading="lazy" /><span className="badge">Coming soon</span></div>
              <h3>{w.name}</h3>
              <p>{w.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section" id="pos">
        <div className="pos-soon">
          <div>
            <h2 className="h-section">POS template</h2>
            <p className="body-lg">
              The tablet point-of-sale we built for LoRi, ready for your restaurant, bar or café: floor plan,
              kitchen printing, bills in USD and riel, and nightly sales reports.
            </p>
            <a className="btn btn-ink" href="#contact">Ask for a demo</a>
          </div>
          <div className="pos-dev"><Tablet /></div>
        </div>
      </section>
    </>
  )
}
