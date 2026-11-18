// All showcase content lives here. Edit this file to update the site.
// Fields marked TODO need confirmation before publishing.

export const projects = [
  {
    slug: 'lori-pos',
    name: 'LoRi POS',
    tagline: 'A tablet point-of-sale app that runs the whole bar, from the first drink to the end-of-night report.',
    client: 'LoRi Bar & Restaurant',
    location: 'Phnom Penh, Cambodia',
    industry: 'Hospitality',
    type: 'Android tablet app + API',
    year: '2026',
    duration: '7 weeks',
    cover: 'lori',
    accent: '#073D20',
    logo: '/img/lori-wordmark.png',
    testimonial: null, // TODO: add client quote
    goal:
      'LoRi was a new bar-restaurant that needed an affordable way to take orders, get food tickets to a kitchen one floor up, and close out bills without paper notes or a costly subscription POS. The owner wanted a system the bartender could run from a single tablet, on hosting the owner pays for directly.',
    features: [
      ['Live table floor plan', 'Every table shows its state at a glance. Tables can be moved, joined for large groups, and separated again.'],
      ['Fast tablet ordering', 'Big, touch-friendly menu tiles. Food orders print automatically on the kitchen printer upstairs.'],
      ['Bills & payments', 'Wi-Fi printed bills with VAT in USD and riel. Cash, KHQR or card, and bills can be split by table.'],
      ['Owner-controlled menu', 'Edit prices, mark items sold out and track stock, with low-stock warnings on the order screen.'],
      ['Shifts & cash drawer', 'Staff sign in with their own accounts. Each shift tracks cash in and out and prints a report.'],
      ['Theft-resistant voids', 'Removing an item needs a reason, and managers get an instant Telegram alert.'],
      ['Sales reporting', 'Night-shift time ranges, best sellers, money still owed and profit per item. Every report can be printed.'],
    ],
    stack: ['React 19', 'TypeScript', 'Capacitor (Android)', 'Laravel 13', 'Laravel Reverb', 'PostgreSQL', 'ESC/POS printing', 'DigitalOcean'],
    challenges: [
      ['Kitchen tickets with no cabling', 'The server in Singapore can’t reach a printer on the bar’s network, so the tablet prints instead. A custom native plugin sends ESC/POS straight to the kitchen printer over Wi-Fi, with an offline warning so no ticket is lost.'],
      ['Khmer on cheap thermal printers', 'Bills and reports are drawn as images on the tablet and sent as raster graphics, so any language and layout prints on almost any 80mm printer.'],
      ['Several tablets, always in sync', 'Every order, void, payment and stock change goes out over WebSockets, with a polling fallback if the connection drops.'],
      ['Stopping silent losses', 'Voids always return stock and alert managers. When the end-of-night count doesn’t match, the gap shows up as a shortage.'],
    ],
    stats: [['~130', 'automated tests'], ['7 wks', 'prototype to live'], ['2', 'currencies']],
    timeline: [
      ['Oct 1', 'Discovery, clickable prototype & proposal'],
      ['Oct 9', 'First build: floor plan, kitchen, billing, shifts'],
      ['Oct 28', 'Dedicated Android app with Wi-Fi printing'],
      ['Nov 10', 'Tested on the client’s tablet & printer'],
      ['Nov 18', 'Live on the client’s production server'],
    ],
    links: [{ label: 'Early clickable prototype', href: 'https://ipad-pos-demo.vercel.app' }],
  },
  {
    slug: 'saravoan-labo',
    name: 'Saravoan Labo',
    tagline: 'An offline desktop app that takes a medical lab from patient registration to printed results.',
    client: 'Saravoan Medical Laboratory', // TODO: confirm public client name
    location: 'Cambodia',
    industry: 'Healthcare',
    type: 'Windows desktop app',
    year: '2026',
    duration: '~3 months',
    cover: 'saravoan',
    accent: '#d7262e',
    logo: '/img/saravoan_logo.png',
    screenshot: '/img/saravoan-register.jpg',
    testimonial: null, // TODO: add client quote
    goal:
      'Small labs in Cambodia often run on paper request forms, hand-written receipts and spreadsheets, and internet access isn’t always reliable. The goal was a single Windows app the lab can unzip and run, covering the whole day: register, pick tests, take payment, print tube labels, enter results and print a bilingual Khmer/English report, fully offline.',
    features: [
      ['Registration in seconds', 'Search by Khmer or English name, phone or ID, and pick tests from a layout that mirrors the lab’s paper form.'],
      ['Receipts & quotations', 'A4 or A5 receipts saved as PDF, with totals in US dollars and Khmer riel.'],
      ['Barcode tube labels', 'One 50 × 25 mm barcode label per sample tube, so every sample matches the right patient.'],
      ['Results with auto flags', 'Normal ranges by sex and age. Out-of-range values are flagged High or Low as staff type.'],
      ['Professional reports', 'Bilingual letterhead reports with barcodes, previous results and signature blocks.'],
      ['Clinic & doctor pricing', 'Master price lists plus custom prices per partner clinic, applied automatically.'],
      ['Works anywhere', 'No login, no internet, no install. Backups export to Excel or PDF.'],
    ],
    stack: ['React 18', 'Vite', 'Electron 33', 'Portable JSON storage', 'Chromium PDF', 'Custom Code128 encoder'],
    challenges: [
      ['Updates that never touch data', 'All data lives in one portable file, and updates replace only the app code. Data is hash-checked before each release.'],
      ['Windows printing limits', 'Windows 11 has no print preview for Electron, so we built an in-app PDF preview with printer picker and silent printing.'],
      ['Khmer text & colour in PDFs', 'Khmer fallback fonts, and colour emoji swapped for inline graphics so tube colours survive on paper.'],
      ['Barcodes with no libraries', 'A hand-written Code128 encoder, verified with a separate barcode reader.'],
    ],
    stats: [['51', 'end-to-end checks'], ['v4.4', 'current release'], ['0', 'servers needed']],
    timeline: [
      ['Sep', 'Receipt app: A4/A5, print preview, paper-form test picker'],
      ['Nov 12', 'V2 to partner lab: request forms, Excel/PDF backups'],
      ['Nov 17', 'V3: price lists, clinics, dashboard'],
      ['Nov 18', 'V4: full workflow, barcodes, results & reports'],
    ],
    links: [],
  },
  {
    slug: 'engagement-invitation',
    name: 'Engagement E-Invitation',
    tagline: 'A cinematic, bilingual digital invitation that opens like a real envelope on the guest’s phone.',
    client: 'Private client', // names kept private on purpose
    location: 'Cambodia',
    industry: 'Events',
    type: 'Mobile web invitation',
    year: '2026',
    duration: '~1 week',
    cover: 'invite',
    accent: '#8fb3a5',
    testimonial: null, // TODO: add client quote
    goal:
      'A couple wanted an engagement invitation guests could open from a single link in Telegram, one that feels as tactile and elegant as printed stationery. It had to read beautifully in formal Khmer, work on any phone, and let guests who couldn’t attend send their wishes by KHQR.',
    features: [
      ['Envelope that opens', 'Tap the wax seal: the twine snaps loose, the doors swing open and the card rises out.'],
      ['Falling leaves', 'Real eucalyptus and fern leaves drift in three layers of depth, with a soft camera sway.'],
      ['Formal Khmer typography', 'Traditional Khmer honorifics set in Battambang and Moul, with English script names.'],
      ['Live countdown', 'Days, hours, minutes and seconds to the ceremony, in Khmer.'],
      ['Background music', 'A gentle soundtrack that starts on open, with a mute button.'],
      ['KHQR gifting', 'Guests who can’t attend can send wishes through a KHQR code.'],
    ],
    stack: ['HTML', 'CSS animation', 'Vanilla JavaScript', 'Vercel'],
    challenges: [
      ['Paper that feels real', 'Layered shadows that follow a single light source, a paper texture and grain make the card look photographed, not drawn.'],
      ['Smooth on budget phones', 'One self-contained page with GPU-friendly transforms keeps the animation smooth on low-end Android phones.'],
    ],
    stats: [['Khmer & English', 'languages'], ['None', 'apps to install']],
    timeline: [
      ['Nov 2', 'Design, paper & leaf assets'],
      ['Nov 5', 'KHQR gifting section added, shared with guests'],
    ],
    links: [], // TODO: add live link only with the couple's permission
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
