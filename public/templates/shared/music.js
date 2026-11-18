// CamboWeb generative music for invitation templates.
// No audio files: a soft piece is composed live with the Web Audio API, so there is
// nothing to license. Add <body data-music="lotus|garden|eucalyptus|mono|starlight">.
// Music starts on the guest's first tap (browsers require a gesture) and a floating
// button lets them pause it.
(function () {
  const mood = document.body.dataset.music
  if (!mood) return

  // MIDI note -> frequency
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12)

  // Each mood: tempo, chord roots/shapes (MIDI), scale for melody, voices.
  const MOODS = {
    // Khmer-flavoured pentatonic, plucked like a khim, slow and stately
    lotus: { bpm: 68, chords: [[50, 57, 62, 66], [47, 54, 59, 62], [43, 50, 55, 59], [45, 52, 57, 61]], scale: [62, 64, 66, 69, 71, 74, 76, 78], lead: 'pluck', pad: 0.05, density: 0.55 },
    // Bright music box in a major pentatonic
    garden: { bpm: 84, chords: [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]], scale: [72, 74, 76, 79, 81, 84, 86, 88], lead: 'bell', pad: 0.04, density: 0.7 },
    // Warm, soft piano-like arpeggios
    eucalyptus: { bpm: 72, chords: [[41, 48, 57, 60], [45, 52, 57, 64], [38, 45, 53, 57], [43, 50, 55, 62]], scale: [65, 67, 69, 72, 74, 77, 79, 81], lead: 'keys', pad: 0.05, density: 0.5 },
    // Sparse, modern, minimal piano
    mono: { bpm: 60, chords: [[45, 52, 59, 60], [41, 48, 55, 57], [48, 55, 60, 64], [43, 50, 57, 59]], scale: [69, 71, 72, 76, 79, 81, 83, 84], lead: 'keys', pad: 0.03, density: 0.35 },
    // Dreamy lydian pad with twinkling bells
    starlight: { bpm: 66, chords: [[48, 55, 62, 66], [50, 57, 62, 69], [45, 52, 59, 64], [43, 50, 59, 62]], scale: [74, 76, 78, 79, 81, 83, 86, 88], lead: 'bell', pad: 0.08, density: 0.45 },
  }
  const M = MOODS[mood] || MOODS.garden

  let ctx, master, wet, timer, step = 0, nextTime = 0, playing = false, started = false
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

  function reverb(c) {
    const len = c.sampleRate * 3.2
    const buf = c.createBuffer(2, len, c.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
    }
    const conv = c.createConvolver()
    conv.buffer = buf
    return conv
  }

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain()
    master.gain.value = 0
    const comp = ctx.createDynamicsCompressor()
    master.connect(comp).connect(ctx.destination)
    wet = ctx.createGain()
    wet.gain.value = 0.55
    const rv = reverb(ctx)
    wet.connect(rv).connect(master)
  }

  function out(node, dry = 0.6) {
    const g = ctx.createGain()
    g.gain.value = dry
    node.connect(g).connect(master)
    node.connect(wet)
  }

  // ----- voices -----
  function bell(m, t, v = 0.16) {
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(v, t + 0.005)
    env.gain.exponentialRampToValueAtTime(0.0001, t + 2.4)
    ;[[1, 1], [2.76, 0.25], [5.4, 0.08]].forEach(([r, a]) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = hz(m) * r; g.gain.value = a
      o.connect(g).connect(env); o.start(t); o.stop(t + 2.5)
    })
    out(env)
  }
  function pluck(m, t, v = 0.2) {
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), env = ctx.createGain()
    o.type = 'triangle'; o.frequency.value = hz(m)
    f.type = 'lowpass'; f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.6)
    env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(v, t + 0.004); env.gain.exponentialRampToValueAtTime(0.0001, t + 1.3)
    o.connect(f).connect(env); o.start(t); o.stop(t + 1.4)
    // a soft octave shimmer, like a struck string
    const o2 = ctx.createOscillator(), g2 = ctx.createGain()
    o2.type = 'sine'; o2.frequency.value = hz(m + 12); g2.gain.setValueAtTime(v * 0.25, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
    o2.connect(g2).connect(env); o2.start(t); o2.stop(t + 0.6)
    out(env)
  }
  function keys(m, t, v = 0.14) {
    const env = ctx.createGain(), f = ctx.createBiquadFilter()
    f.type = 'lowpass'; f.frequency.value = 2200
    env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(v, t + 0.01); env.gain.exponentialRampToValueAtTime(0.0001, t + 2.8)
    ;[[0, 'triangle', 1], [7, 'sine', 0.3], [-5, 'sine', 0.3]].forEach(([cents, type, a]) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = type; o.frequency.value = hz(m); o.detune.value = cents; g.gain.value = a
      o.connect(g).connect(f); o.start(t); o.stop(t + 3)
    })
    f.connect(env); out(env)
  }
  function pad(chord, t, dur) {
    const env = ctx.createGain(), f = ctx.createBiquadFilter()
    f.type = 'lowpass'; f.frequency.value = 900
    env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(M.pad, t + 1.6); env.gain.linearRampToValueAtTime(0, t + dur + 1.5)
    chord.forEach((m) => [-6, 6].forEach((d) => {
      const o = ctx.createOscillator()
      o.type = 'triangle'; o.frequency.value = hz(m); o.detune.value = d
      o.connect(f); o.start(t); o.stop(t + dur + 1.6)
    }))
    f.connect(env); out(env, 0.4)
  }
  const LEAD = { bell, pluck, keys }

  // ----- sequencer: 8th notes, 2 bars per chord -----
  function schedule() {
    const eighth = 60 / M.bpm / 2
    while (nextTime < ctx.currentTime + 0.2) {
      const bar = Math.floor(step / 8)
      const chord = M.chords[Math.floor(bar / 2) % M.chords.length]
      const inBar = step % 8
      if (step % 16 === 0) { pad(chord, nextTime, eighth * 16); keys(chord[0] - 12, nextTime, 0.1) }
      // arpeggio: up through the chord on every other 8th
      if (inBar % 2 === 0) (M.lead === 'pluck' ? pluck : keys)(chord[(inBar / 2) % chord.length] + 12, nextTime, 0.07)
      // melody: sparse, stepwise, from the scale
      if (rnd() < M.density && inBar !== 7) {
        const i = Math.floor(rnd() * M.scale.length)
        LEAD[M.lead](M.scale[i], nextTime + (rnd() < 0.2 ? eighth / 2 : 0))
      }
      nextTime += eighth
      step++
    }
  }

  function fade(to, secs) {
    const t = ctx.currentTime
    master.gain.cancelScheduledValues(t)
    master.gain.setValueAtTime(master.gain.value, t)
    master.gain.linearRampToValueAtTime(to, t + secs)
  }

  function play() {
    if (!ctx) init()
    ctx.resume()
    if (!timer) { nextTime = ctx.currentTime + 0.1; timer = setInterval(schedule, 40) }
    fade(0.9, 2)
    playing = true
    btn.classList.add('on')
    btn.setAttribute('aria-pressed', 'true')
  }
  function pause() {
    if (!ctx) return
    fade(0, 0.8)
    setTimeout(() => { if (!playing) { clearInterval(timer); timer = null; ctx.suspend() } }, 900)
    playing = false
    btn.classList.remove('on')
    btn.setAttribute('aria-pressed', 'false')
  }

  // ----- floating button -----
  const css = document.createElement('style')
  css.textContent = `
    .cw-music{position:fixed;top:max(14px,env(safe-area-inset-top));right:14px;z-index:90;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.35);
      background:rgba(20,20,24,.45);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.2)}
    .cw-music i{display:inline-block;width:3px;margin:0 1px;border-radius:2px;background:#fff;height:6px;transition:height .3s}
    .cw-music.on i{animation:cwbar 1s ease-in-out infinite}
    .cw-music.on i:nth-child(2){animation-delay:-.3s}.cw-music.on i:nth-child(3){animation-delay:-.6s}.cw-music.on i:nth-child(4){animation-delay:-.15s}
    .cw-music:not(.on)::after{content:'';position:absolute;width:26px;height:2px;background:#fff;transform:rotate(-40deg);border-radius:2px}
    .cw-music:focus-visible{outline:2px solid #fff;outline-offset:3px}
    @keyframes cwbar{0%,100%{height:6px}50%{height:18px}}
    @media (prefers-reduced-motion:reduce){.cw-music.on i{animation:none;height:12px}}`
  document.head.appendChild(css)
  const btn = document.createElement('button')
  btn.className = 'cw-music'
  btn.type = 'button'
  btn.setAttribute('aria-label', 'Background music')
  btn.setAttribute('aria-pressed', 'false')
  btn.innerHTML = '<span aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
  btn.addEventListener('click', (e) => { e.stopPropagation(); started = true; playing ? pause() : play() })
  document.body.appendChild(btn)

  // Start on the guest's first tap anywhere (opening the invitation), unless they used the button.
  const first = (e) => {
    if (started || e.target.closest('.cw-music')) return
    started = true
    play()
    removeEventListener('pointerdown', first, true)
  }
  addEventListener('pointerdown', first, true)

  // Pause when the tab is hidden; respect the guest's choice when they come back.
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return
    if (document.hidden) ctx.suspend()
    else if (playing) ctx.resume()
  })

  window.CWMusic = { play, pause, get playing() { return playing } }
})()
