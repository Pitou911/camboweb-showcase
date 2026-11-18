// "Demo by CamboWeb" ribbon shown on every template page (invitations and websites).
// The page sets <body data-order="Order this invitation"> or the script picks a default.
(function () {
  function mount() {
    if (document.querySelector('.cw-demo')) return
    const label = document.body.dataset.order || (document.body.dataset.music ? 'Order this invitation' : 'Get this website')
    const css = document.createElement('style')
    css.textContent = `
      .cw-demo{position:fixed;left:50%;bottom:max(12px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483000;
        display:flex;align-items:center;gap:12px;padding:6px 6px 6px 14px;border-radius:999px;white-space:nowrap;
        background:rgba(0,24,32,.88);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
        border:1px solid rgba(43,217,240,.35);box-shadow:0 8px 28px rgba(0,0,0,.28);
        font:500 13px/1 Lexend,system-ui,-apple-system,sans-serif;color:#e6f6f9;letter-spacing:0}
      .cw-demo i{width:8px;height:8px;border-radius:50%;background:#2bd9f0;box-shadow:0 0 8px #2bd9f0;flex:none}
      .cw-demo a{display:inline-block;padding:9px 14px;border-radius:999px;background:#2bd9f0;color:#001820;text-decoration:none;font-weight:500}
      .cw-demo a:hover{background:#6be6f6}
      .cw-demo a:focus-visible{outline:2px solid #fff;outline-offset:2px}
      @media (max-width:360px){.cw-demo{gap:8px;padding-left:10px;font-size:12px}.cw-demo a{padding:8px 11px}}`
    document.head.appendChild(css)
    const bar = document.createElement('div')
    bar.className = 'cw-demo'
    bar.innerHTML = `<i aria-hidden="true"></i><span>Demo by CamboWeb</span><a target="_top" href="/contact?need=${document.body.dataset.music ? "E-invitation" : "Website"}&template=${encodeURIComponent(document.title.split(" · ")[0].trim())}">${label}</a>`
    document.body.appendChild(bar)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount)
  else mount()
})()
