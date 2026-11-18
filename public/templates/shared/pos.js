// Shared engine for the CamboWeb POS templates (mart, café, restaurant).
// Each page sets window.POS = { mode, brand, rate, cashier, categories, items, tables? } and
// its theme as CSS variables. Everything runs in the browser; nothing is saved or sent.
(function () {
  const C = window.POS
  const $ = (s, r = document) => r.querySelector(s)
  const usd = (n) => '$' + n.toFixed(2)
  const khr = (n) => (Math.round((n * C.rate) / 100) * 100).toLocaleString('en-US') + '៛'
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const byId = Object.fromEntries(C.items.map((i) => [i.id, i]))
  const isCafe = C.mode === 'cafe', isMart = C.mode === 'mart', isRest = C.mode === 'restaurant'

  const S = {
    cat: 'all', q: '', type: 'Dine in', orderNo: 24, receiptNo: 1042,
    queue: [{ n: 21, s: 'Ready' }, { n: 22, s: 'Preparing' }, { n: 23, s: 'Preparing' }],
    table: null, tabs: {}, cart: [],
  }
  if (isRest) {
    // two tables already eating, so the floor looks like a real lunch service
    S.tabs = {
      T2: { guests: 2, lines: [line('r-amok', 1, '', true), line('r-coco', 2, '', true)] },
      T5: { guests: 4, lines: [line('r-loklak', 2, '', true), line('r-rice', 1, '', true), line('r-icedtea', 4, '', true)] },
    }
    S.table = 'T5'
  }
  // open mid-sale so the screen looks like a real shift
  if (isMart) S.cart = [line('m-water15', 2), line('m-noodle', 5), line('m-eggs', 1), line('m-ice', 1)]
  if (isCafe) S.cart = [line('c-khmer', 2, 'Medium · 50% sugar · Normal ice', false, 0.5), line('c-numpang', 1)]
  function line(id, qty = 1, note = '', sent = false, extra = 0) {
    return { key: id + '|' + note, id, qty, note, sent, unit: byId[id].price + extra }
  }
  const cart = () => (isRest ? (S.tabs[S.table] ||= { guests: 2, lines: [] }).lines : S.cart)
  const total = () => cart().reduce((t, l) => t + l.unit * l.qty, 0)

  // ---------- shell ----------
  document.body.innerHTML = `
  <div class="pos">
    <header class="bar">
      <div class="brand"><span class="mark">${esc(C.brand.mark)}</span><div><b>${esc(C.brand.name)}</b><small>${esc(C.brand.sub)}</small></div></div>
      <div class="bar-mid" id="mid"></div>
      <div class="bar-end"><span class="who">${esc(C.cashier)}</span><span class="clock" id="clock"></span></div>
    </header>
    <nav class="cats" id="cats" aria-label="Categories"></nav>
    <main class="items">
      <div class="search"><input id="q" type="search" placeholder="${isMart ? 'Search products or type a barcode' : 'Search the menu'}" autocomplete="off"></div>
      <div class="grid" id="grid"></div>
    </main>
    <section class="cart" aria-label="Current order">
      <div class="cart-head" id="head"></div>
      <ul class="lines" id="lines"></ul>
      <div class="totals" id="totals"></div>
      <div class="cart-actions" id="actions"></div>
    </section>
  </div>
  <div class="modal" id="modal" hidden><div class="sheet" id="sheet" role="dialog" aria-modal="true"></div></div>
  <div class="toast" id="toast" role="status"></div>`

  // ---------- top bar middle ----------
  function renderMid() {
    const m = $('#mid')
    if (isMart) {
      m.innerHTML = `<form class="scan" id="scan"><span class="scan-ico" aria-hidden="true"></span><input id="code" inputmode="numeric" placeholder="Scan barcode" aria-label="Barcode"><button>Add</button></form>`
      $('#scan').onsubmit = (e) => {
        e.preventDefault()
        const code = $('#code').value.trim()
        const it = C.items.find((i) => i.code === code)
        if (it) { add(it.id); $('#code').value = '' } else toast(code ? `No product with barcode ${code}` : 'Type a barcode, e.g. ' + C.items[0].code)
      }
    } else if (isCafe) {
      m.innerHTML = `<div class="seg" id="type">${['Dine in', 'Takeaway'].map((t) => `<button aria-pressed="${S.type === t}">${t}</button>`).join('')}</div>
        <div class="queue">${S.queue.map((q) => `<span class="${q.s === 'Ready' ? 'ready' : ''}">#${q.n} ${q.s}</span>`).join('')}</div>`
      m.querySelectorAll('#type button').forEach((b) => (b.onclick = () => { S.type = b.textContent; renderMid(); renderCart() }))
    } else {
      m.innerHTML = `<div class="tables">${C.tables.map((t) => {
        const busy = S.tabs[t]?.lines.length
        return `<button class="${t === S.table ? 'on' : ''} ${busy ? 'busy' : ''}" data-t="${t}">${t}${busy ? `<small>${usd(S.tabs[t].lines.reduce((a, l) => a + l.unit * l.qty, 0))}</small>` : ''}</button>`
      }).join('')}</div>`
      m.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => { S.table = b.dataset.t; renderMid(); renderCart() }))
    }
  }

  // ---------- categories + grid ----------
  function renderCats() {
    const all = [{ id: 'all', name: isMart ? 'All products' : 'All' }, ...C.categories]
    $('#cats').innerHTML = all.map((c) => `<button data-c="${c.id}" class="${S.cat === c.id ? 'on' : ''}" style="--h:${c.hue ?? 200}">${esc(c.name)}</button>`).join('')
    $('#cats').querySelectorAll('button').forEach((b) => (b.onclick = () => { S.cat = b.dataset.c; renderCats(); renderGrid() }))
  }
  function renderGrid() {
    const q = S.q.toLowerCase()
    const list = C.items.filter((i) => (S.cat === 'all' || i.cat === S.cat) && (!q || i.name.toLowerCase().includes(q) || (i.kh || '').includes(S.q) || (i.code || '').includes(q)))
    const hue = Object.fromEntries(C.categories.map((c) => [c.id, c.hue]))
    $('#grid').innerHTML = list.length ? list.map((i) => {
      const low = isMart && i.stock <= 5
      return `<button class="tile" data-i="${i.id}" style="--h:${hue[i.cat]}" ${isMart && i.stock <= 0 ? 'disabled' : ''}>
        <span class="t-name">${esc(i.name)}</span>${i.kh ? `<span class="t-kh">${i.kh}</span>` : ''}${isMart ? `<span class="t-code">${i.code}</span>` : ''}
        <span class="t-foot"><b>${usd(i.price)}</b>${isMart ? `<small class="${low ? 'low' : ''}">${i.stock <= 0 ? 'Sold out' : i.stock + ' left'}</small>` : i.opts ? '<small>Options</small>' : ''}</span>
      </button>`
    }).join('') : `<p class="empty">Nothing matches “${esc(S.q)}”.</p>`
    $('#grid').querySelectorAll('.tile').forEach((b) => (b.onclick = () => (isCafe && byId[b.dataset.i].opts ? options(b.dataset.i) : add(b.dataset.i))))
  }

  // ---------- cart ----------
  function add(id, note = '', extra = 0) {
    const it = byId[id]
    if (isMart) { if (it.stock <= 0) return toast(`${it.name} is sold out`); it.stock-- }
    const lines = cart()
    const key = id + '|' + note
    const found = lines.find((l) => l.key === key && !l.sent)
    if (found) found.qty++
    else lines.push(line(id, 1, note, false, extra))
    renderCart(); if (isMart) renderGrid(); if (isRest) renderMid()
    bump()
  }
  function change(i, d) {
    const lines = cart(), l = lines[i]
    if (l.sent && d < 0) return toast('Already sent to the kitchen. Ask a manager to void it.')
    if (isMart) byId[l.id].stock -= d
    l.qty += d
    if (l.qty <= 0) lines.splice(i, 1)
    renderCart(); if (isMart) renderGrid(); if (isRest) renderMid()
  }
  function renderCart() {
    const lines = cart()
    const count = lines.reduce((n, l) => n + l.qty, 0)
    $('#head').innerHTML = isRest
      ? `<div><b>Table ${S.table}</b><small>${S.tabs[S.table].guests} guests</small></div><span class="count">${count} items</span>`
      : isCafe
        ? `<div><b>Order #${S.orderNo}</b><small>${S.type}</small></div><span class="count">${count} items</span>`
        : `<div><b>Sale ${S.receiptNo}</b><small>Walk-in customer</small></div><span class="count">${count} items</span>`
    $('#lines').innerHTML = lines.length ? lines.map((l, i) => `
      <li class="${l.sent ? 'sent' : ''}">
        <div class="l-main"><b>${esc(byId[l.id].name)}</b>${l.note ? `<small>${esc(l.note)}</small>` : ''}${l.sent ? '<small class="tag">Sent to kitchen</small>' : ''}</div>
        <div class="qty"><button data-d="-1" data-i="${i}" aria-label="One less">−</button><span>${l.qty}</span><button data-d="1" data-i="${i}" aria-label="One more">+</button></div>
        <span class="l-sum">${usd(l.unit * l.qty)}</span>
      </li>`).join('') : `<li class="none">${isMart ? 'Scan a barcode or tap a product.' : isRest ? 'Tap dishes to start this table’s order.' : 'Tap a drink or snack to start.'}</li>`
    $('#lines').querySelectorAll('[data-d]').forEach((b) => (b.onclick = () => change(+b.dataset.i, +b.dataset.d)))
    const t = total()
    $('#totals').innerHTML = `<div><span>Subtotal</span><span>${usd(t)}</span></div>
      <div class="grand"><span>Total</span><span><b>${usd(t)}</b><small>${khr(t)}</small></span></div>`
    const unsent = lines.some((l) => !l.sent)
    $('#actions').innerHTML = isRest
      ? `<button class="ghost" id="send" ${unsent ? '' : 'disabled'}>Send to kitchen</button><button class="primary" id="pay" ${lines.length ? '' : 'disabled'}>Bill & pay</button>`
      : `<button class="ghost" id="clear" ${lines.length ? '' : 'disabled'}>Clear</button><button class="primary" id="pay" ${lines.length ? '' : 'disabled'}>Charge ${usd(t)}</button>`
    $('#pay').onclick = pay
    if ($('#clear')) $('#clear').onclick = () => { if (isMart) lines.forEach((l) => (byId[l.id].stock += l.qty)); lines.length = 0; renderCart(); if (isMart) renderGrid() }
    if ($('#send')) $('#send').onclick = () => { lines.forEach((l) => (l.sent = true)); renderCart(); toast(`Table ${S.table}: order sent to the kitchen printer`) }
  }
  function bump() { const h = $('.cart-head'); h.classList.remove('bump'); void h.offsetWidth; h.classList.add('bump') }

  // ---------- café options ----------
  function options(id) {
    const it = byId[id]
    const sizes = [['Small', 0], ['Medium', 0.5], ['Large', 1]], sugars = ['0%', '25%', '50%', '100%'], ices = ['No ice', 'Less ice', 'Normal ice']
    let sz = 1, sg = 2, ic = 2
    open(`<h2>${esc(it.name)}</h2><p class="muted">${usd(it.price)} for small</p>
      <div class="opt"><span>Size</span><div class="seg" id="o-size">${sizes.map(([n, p], i) => `<button aria-pressed="${i === sz}">${n}${p ? ` +${usd(p)}` : ''}</button>`).join('')}</div></div>
      <div class="opt"><span>Sugar</span><div class="seg" id="o-sugar">${sugars.map((s, i) => `<button aria-pressed="${i === sg}">${s}</button>`).join('')}</div></div>
      <div class="opt"><span>Ice</span><div class="seg" id="o-ice">${ices.map((s, i) => `<button aria-pressed="${i === ic}">${s}</button>`).join('')}</div></div>
      <div class="sheet-actions"><button class="ghost" data-close>Cancel</button><button class="primary" id="o-add">Add to order</button></div>`)
    const seg = (sel, set) => $(sel).querySelectorAll('button').forEach((b, i) => (b.onclick = () => { set(i); $(sel).querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', i === j)) }))
    seg('#o-size', (i) => (sz = i)); seg('#o-sugar', (i) => (sg = i)); seg('#o-ice', (i) => (ic = i))
    $('#o-add').onclick = () => { close(); add(id, `${sizes[sz][0]} · ${sugars[sg]} sugar · ${ices[ic]}`, sizes[sz][1]) }
  }

  // ---------- payment ----------
  function pay() {
    const t = total()
    let method = 'Cash', cur = 'USD', given = 0
    const quickUsd = [...new Set([Math.ceil(t), 5, 10, 20, 50].filter((v) => v >= t))].slice(0, 4)
    const quickKhr = [...new Set([Math.ceil((t * C.rate) / 1000) * 1000, 10000, 20000, 50000, 100000].filter((v) => v >= t * C.rate))].slice(0, 4)
    const draw = () => {
      const due = t, paid = cur === 'USD' ? given : given / C.rate, ch = paid - due
      $('#sheet').innerHTML = `<h2>${isRest ? `Table ${S.table} bill` : 'Payment'}</h2>
        <div class="due"><b>${usd(t)}</b><span>${khr(t)}</span></div>
        <div class="seg wide" id="m">${['Cash', 'KHQR', 'Card'].map((x) => `<button aria-pressed="${x === method}">${x}</button>`).join('')}</div>
        ${method === 'Cash' ? `
          <div class="seg" id="cur"><button aria-pressed="${cur === 'USD'}">Paid in dollars</button><button aria-pressed="${cur === 'KHR'}">Paid in riel</button></div>
          <div class="quick">${(cur === 'USD' ? quickUsd : quickKhr).map((v) => `<button data-v="${v}" aria-pressed="${v === given}">${cur === 'USD' ? usd(v) : v.toLocaleString('en-US') + '៛'}</button>`).join('')}</div>
          <div class="change ${ch >= 0 && given ? 'ok' : ''}"><span>Change</span><b>${given ? (ch >= 0 ? `${usd(ch)} <small>or ${khr(ch)}</small>` : 'Not enough yet') : 'Tap the cash received'}</b></div>`
        : method === 'KHQR' ? `<div class="qr"><img src="../invite-eucalyptus/assets/demo-qr.svg" alt="Demo KHQR code"><p>Customer scans with any Cambodian bank app.<br><span class="muted">Waiting for payment…</span></p></div>`
        : `<div class="qr card"><div class="term"></div><p>Ask the customer to tap or insert their card on the terminal.</p></div>`}
        <div class="sheet-actions"><button class="ghost" data-close>Back</button><button class="primary" id="done" ${method === 'Cash' && (!given || ch < 0) ? 'disabled' : ''}>${method === 'Cash' ? 'Complete sale' : 'Mark as paid'}</button></div>`
      $('#m').querySelectorAll('button').forEach((b) => (b.onclick = () => { method = b.textContent; given = 0; draw() }))
      if ($('#cur')) $('#cur').querySelectorAll('button').forEach((b, i) => (b.onclick = () => { cur = i ? 'KHR' : 'USD'; given = 0; draw() }))
      document.querySelectorAll('.quick [data-v]').forEach((b) => (b.onclick = () => { given = +b.dataset.v; draw() }))
      $('#done').onclick = () => receipt({ method, paid: method === 'Cash' ? (cur === 'USD' ? usd(given) : given.toLocaleString('en-US') + '៛') : usd(t), change: method === 'Cash' ? usd(Math.max(0, paid - due)) : '' })
      bindClose()
    }
    open(''); draw()
  }

  function receipt({ method, paid, change }) {
    const lines = cart(), t = total(), now = new Date()
    const no = isCafe ? S.orderNo : S.receiptNo
    open(`<div class="paper">
        <b class="p-brand">${esc(C.brand.name)}</b><small>${esc(C.brand.address)}</small>
        ${isCafe ? `<div class="p-order">Order #${no}<small>${S.type}</small></div>` : ''}
        <div class="p-meta"><span>${isRest ? `Table ${S.table}` : `Receipt ${no}`}</span><span>${now.toLocaleDateString('en-GB')} ${now.toTimeString().slice(0, 5)}</span></div>
        <ul>${lines.map((l) => `<li><span>${l.qty} × ${esc(byId[l.id].name)}${l.note ? `<small>${esc(l.note)}</small>` : ''}</span><span>${usd(l.unit * l.qty)}</span></li>`).join('')}</ul>
        <div class="p-tot"><span>Total</span><span>${usd(t)}</span></div>
        <div class="p-row"><span>In riel</span><span>${khr(t)}</span></div>
        <div class="p-row"><span>${method}</span><span>${paid}</span></div>
        ${change ? `<div class="p-row"><span>Change</span><span>${change}</span></div>` : ''}
        <p class="p-thanks">Thank you · អរគុណ</p>
      </div>
      <div class="sheet-actions"><button class="ghost" id="print">Print receipt</button><button class="primary" id="next">New ${isRest ? 'table' : 'sale'}</button></div>`)
    $('#print').onclick = () => toast('Sent to the receipt printer (demo)')
    $('#next').onclick = () => {
      if (isCafe) { S.queue = [...S.queue.slice(-2), { n: S.orderNo, s: 'Preparing' }]; S.orderNo++ }
      if (isRest) delete S.tabs[S.table]; else S.cart = []
      S.receiptNo++; close(); renderMid(); renderCart()
      toast(isCafe ? `Order #${S.orderNo - 1} sent to the barista` : 'Sale complete')
    }
  }

  // ---------- modal + toast ----------
  function open(html) { $('#sheet').innerHTML = html; $('#modal').hidden = false; bindClose() }
  function close() { $('#modal').hidden = true }
  function bindClose() { document.querySelectorAll('[data-close]').forEach((b) => (b.onclick = close)) }
  $('#modal').onclick = (e) => { if (e.target.id === 'modal') close() }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
  let tt
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2400) }

  // ---------- clock + search ----------
  const tick = () => ($('#clock').textContent = new Date().toTimeString().slice(0, 5))
  tick(); setInterval(tick, 10000)
  $('#q').oninput = (e) => { S.q = e.target.value.trim(); renderGrid() }
  $('#q').onkeydown = (e) => {
    if (isMart && e.key === 'Enter') { const it = C.items.find((i) => i.code === S.q); if (it) { add(it.id); e.target.value = ''; S.q = ''; renderGrid() } }
  }

  // business name from the showcase (?name=)
  const nm = new URLSearchParams(location.search).get('name')
  const applyName = (n) => { if (!n) return; C.brand.name = n; $('.brand b').textContent = n; $('.mark').textContent = n.trim()[0].toUpperCase() }
  applyName(nm)
  window.addEventListener('message', (e) => { if (e.origin === location.origin && e.data?.type === 'cw-fields') applyName((e.data.fields || {}).name) })

  renderMid(); renderCats(); renderGrid(); renderCart()
})()
