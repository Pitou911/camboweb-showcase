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
    screens: [
      ['/img/lori-floor.jpg', 'Floor plan: every table’s status and bill at a glance'],
      ['/img/lori-order.jpg', 'Taking an order: menu by category, rounds sent to bar and kitchen'],
    ],
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
    kh: {"tagline": "កម្មវិធីលក់លើថេប្លេត ដែលគ្រប់គ្រងបារទាំងមូល ចាប់ពីភេសជ្ជៈដំបូង រហូតដល់របាយការណ៍ចុងយប់។", "location": "ភ្នំពេញ កម្ពុជា", "type": "កម្មវិធីថេប្លេត Android + API", "duration": "៧ សប្តាហ៍", "goal": "LoRi ជាបារ-ភោជនីយដ្ឋានថ្មីមួយ ដែលត្រូវការវិធីសមរម្យក្នុងការទទួលការកម្ម៉ង់ ផ្ញើប័ណ្ណម្ហូបទៅផ្ទះបាយនៅជាន់ខាងលើ និងបិទវិក្កយបត្រ ដោយមិនចាំបាច់ប្រើក្រដាសកត់ ឬប្រព័ន្ធ POS ជាវប្រចាំខែដែលថ្លៃ។ ម្ចាស់ហាងចង់បានប្រព័ន្ធដែលអ្នកលាយស្រាអាចប្រើបានពីថេប្លេតតែមួយ លើម៉ាស៊ីនមេដែលម្ចាស់ហាងបង់ថ្លៃដោយផ្ទាល់។", "features": [["ប្លង់តុផ្ទាល់", "តុនីមួយៗបង្ហាញស្ថានភាពភ្លាមៗ។ អាចផ្លាស់តុ ភ្ជាប់តុសម្រាប់ក្រុមធំ និងបំបែកវិញបាន។"], ["ការកម្ម៉ង់លឿនលើថេប្លេត", "ប្រអប់ម៉ឺនុយធំៗ ងាយចុច។ ការកម្ម៉ង់ម្ហូបព្រីនដោយស្វ័យប្រវត្តិនៅម៉ាស៊ីនព្រីនផ្ទះបាយជាន់លើ។"], ["វិក្កយបត្រ និងការបង់ប្រាក់", "វិក្កយបត្រព្រីនតាម Wi-Fi មាន VAT ជាដុល្លារ និងរៀល។ សាច់ប្រាក់ KHQR ឬកាត ហើយអាចបំបែកវិក្កយបត្រតាមតុ។"], ["ម៉ឺនុយដែលម្ចាស់គ្រប់គ្រង", "កែតម្លៃ កំណត់មុខម្ហូបអស់ និងតាមដានស្តុក ជាមួយការព្រមាននៅលើអេក្រង់កម្ម៉ង់ពេលស្តុកជិតអស់។"], ["វេនការងារ និងថតប្រាក់", "បុគ្គលិកចូលដោយគណនីផ្ទាល់ខ្លួន។ វេននីមួយៗកត់ត្រាប្រាក់ចូល-ចេញ និងព្រីនរបាយការណ៍។"], ["ការលុបមុខទំនិញការពារការលួច", "ការដកមុខទំនិញត្រូវមានហេតុផល ហើយអ្នកគ្រប់គ្រងទទួលបានការជូនដំណឹងតាម Telegram ភ្លាមៗ។"], ["របាយការណ៍លក់", "ចន្លោះម៉ោងវេនយប់ មុខទំនិញលក់ដាច់ ប្រាក់ដែលនៅជំពាក់ និងប្រាក់ចំណេញតាមមុខទំនិញ។ របាយការណ៍ទាំងអស់អាចព្រីនបាន។"]], "challenges": [["ប័ណ្ណផ្ទះបាយដោយគ្មានខ្សែ", "ម៉ាស៊ីនមេនៅសិង្ហបុរីមិនអាចភ្ជាប់ទៅម៉ាស៊ីនព្រីនក្នុងបណ្តាញរបស់បារបានទេ ដូច្នេះថេប្លេតជាអ្នកព្រីនជំនួស។ កម្មវិធីជំនួយដែលយើងសរសេរ ផ្ញើ ESC/POS ទៅម៉ាស៊ីនព្រីនផ្ទះបាយតាម Wi-Fi ដោយផ្ទាល់ ហើយព្រមានពេលដាច់ការតភ្ជាប់ ដើម្បីកុំឱ្យបាត់ប័ណ្ណណាមួយ។"], ["អក្សរខ្មែរលើម៉ាស៊ីនព្រីនកម្ដៅតម្លៃថោក", "វិក្កយបត្រ និងរបាយការណ៍ត្រូវបានគូរជារូបភាពនៅលើថេប្លេត ហើយផ្ញើជាក្រាហ្វិក ដូច្នេះភាសា និងប្លង់ណាក៏ព្រីនបានលើម៉ាស៊ីនព្រីន 80mm ស្ទើរតែគ្រប់ប្រភេទ។"], ["ថេប្លេតច្រើន ធ្វើសមកាលកម្មជានិច្ច", "ការកម្ម៉ង់ ការលុប ការបង់ប្រាក់ និងការប្រែប្រួលស្តុកនីមួយៗ ត្រូវបានផ្ញើតាម WebSockets ហើយមានការឆែកម្តងៗជាជម្រើសបម្រុង ពេលដាច់ការតភ្ជាប់។"], ["បញ្ឈប់ការបាត់បង់ស្ងាត់ៗ", "ការលុបមុខទំនិញតែងតែបង្វិលស្តុកមកវិញ និងជូនដំណឹងអ្នកគ្រប់គ្រង។ ពេលការរាប់ចុងយប់មិនត្រូវគ្នា គម្លាតនោះបង្ហាញជាការខ្វះខាត។"]], "stats": [["~130", "តេស្តស្វ័យប្រវត្តិ"], ["៧ សប្តាហ៍", "ពីគំរូដល់ដំណើរការពិត"], ["២", "រូបិយប័ណ្ណ"]], "timeline": [["1 តុលា", "ស្វែងយល់ គំរូចុចបាន និងសំណើ"], ["9 តុលា", "កំណែដំបូង៖ ប្លង់តុ ផ្ទះបាយ វិក្កយបត្រ វេនការងារ"], ["28 តុលា", "កម្មវិធី Android ផ្ទាល់ ជាមួយការព្រីនតាម Wi-Fi"], ["10 វិច្ឆិកា", "សាកល្បងលើថេប្លេត និងម៉ាស៊ីនព្រីនរបស់អតិថិជន"], ["18 វិច្ឆិកា", "ដំណើរការលើម៉ាស៊ីនមេផលិតកម្មរបស់អតិថិជន"]], "screens": [["/img/lori-floor.jpg", "ប្លង់តុ៖ ស្ថានភាព និងវិក្កយបត្ររបស់តុនីមួយៗ មើលឃើញភ្លាមៗ"], ["/img/lori-order.jpg", "ការទទួលកម្ម៉ង់៖ ម៉ឺនុយតាមប្រភេទ ផ្ញើជាជុំៗទៅបារ និងផ្ទះបាយ"]], "links": [{"label": "គំរូចុចបានដំបូង", "href": "https://ipad-pos-demo.vercel.app"}]},
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
    kh: {"tagline": "កម្មវិធីកុំព្យូទ័រដែលដំណើរការដោយគ្មានអ៊ីនធឺណិត នាំមន្ទីរពិសោធន៍វេជ្ជសាស្ត្រ ពីការចុះឈ្មោះអ្នកជំងឺ រហូតដល់លទ្ធផលដែលបានព្រីន។", "location": "កម្ពុជា", "type": "កម្មវិធីកុំព្យូទ័រ Windows", "duration": "ប្រហែល ៣ ខែ", "goal": "មន្ទីរពិសោធន៍តូចៗនៅកម្ពុជាច្រើនតែប្រើទម្រង់ស្នើសុំជាក្រដាស បង្កាន់ដៃសរសេរដោយដៃ និងតារាង Excel ហើយអ៊ីនធឺណិតមិនតែងតែមានស្ថិរភាពទេ។ គោលដៅគឺកម្មវិធី Windows តែមួយ ដែលមន្ទីរពិសោធន៍គ្រាន់តែពន្លា ហើយដំណើរការ គ្របដណ្តប់ការងារពេញមួយថ្ងៃ៖ ចុះឈ្មោះ ជ្រើសតេស្ត ទទួលប្រាក់ ព្រីនស្លាកបំពង់ បញ្ចូលលទ្ធផល និងព្រីនរបាយការណ៍ពីរភាសា ខ្មែរ/អង់គ្លេស ដោយគ្មានអ៊ីនធឺណិតទាំងស្រុង។", "features": [["ចុះឈ្មោះក្នុងពីរបីវិនាទី", "ស្វែងរកតាមឈ្មោះខ្មែរ ឬអង់គ្លេស លេខទូរស័ព្ទ ឬលេខសម្គាល់ ហើយជ្រើសតេស្តពីប្លង់ដែលដូចទម្រង់ក្រដាសរបស់មន្ទីរពិសោធន៍។"], ["បង្កាន់ដៃ និងសម្រង់តម្លៃ", "បង្កាន់ដៃ A4 ឬ A5 រក្សាទុកជា PDF ដែលមានសរុបជាដុល្លារ និងរៀល។"], ["ស្លាកបាកូដលើបំពង់", "ស្លាកបាកូដ 50 × 25 mm មួយសម្រាប់បំពង់សំណាកនីមួយៗ ដើម្បីឱ្យសំណាកនីមួយៗត្រូវនឹងអ្នកជំងឺត្រឹមត្រូវ។"], ["លទ្ធផលជាមួយសញ្ញាស្វ័យប្រវត្តិ", "តម្លៃធម្មតាតាមភេទ និងអាយុ។ តម្លៃក្រៅកម្រិតត្រូវបានសម្គាល់ថា ខ្ពស់ ឬទាប ពេលបុគ្គលិកវាយបញ្ចូល។"], ["របាយការណ៍វិជ្ជាជីវៈ", "របាយការណ៍មានក្បាលលិខិតពីរភាសា បាកូដ លទ្ធផលមុនៗ និងកន្លែងចុះហត្ថលេខា។"], ["តម្លៃតាមគ្លីនិក និងវេជ្ជបណ្ឌិត", "បញ្ជីតម្លៃមេ និងតម្លៃផ្ទាល់សម្រាប់គ្លីនិកដៃគូនីមួយៗ អនុវត្តដោយស្វ័យប្រវត្តិ។"], ["ប្រើបានគ្រប់ទីកន្លែង", "គ្មានការចូលគណនី គ្មានអ៊ីនធឺណិត គ្មានការដំឡើង។ ទិន្នន័យបម្រុងនាំចេញជា Excel ឬ PDF។"]], "challenges": [["ការអាប់ដេតដែលមិនប៉ះពាល់ទិន្នន័យ", "ទិន្នន័យទាំងអស់រក្សាទុកក្នុងឯកសារតែមួយ ហើយការអាប់ដេតជំនួសតែកូដកម្មវិធីប៉ុណ្ណោះ។ ទិន្នន័យត្រូវបានផ្ទៀងផ្ទាត់ដោយ hash មុនការចេញផ្សាយនីមួយៗ។"], ["ដែនកំណត់ការព្រីនលើ Windows", "Windows 11 មិនមានការមើលមុនពេលព្រីនសម្រាប់ Electron ទេ ដូច្នេះយើងបង្កើតការមើល PDF មុនក្នុងកម្មវិធី ជាមួយការជ្រើសម៉ាស៊ីនព្រីន និងការព្រីនដោយស្ងាត់។"], ["អក្សរខ្មែរ និងពណ៌ក្នុង PDF", "ពុម្ពអក្សរខ្មែរបម្រុង ហើយ emoji ពណ៌ត្រូវបានជំនួសដោយក្រាហ្វិក ដើម្បីឱ្យពណ៌បំពង់នៅតែឃើញលើក្រដាស។"], ["បាកូដដោយគ្មានបណ្ណាល័យ", "កម្មវិធីបំប្លែង Code128 ដែលសរសេរដោយផ្ទាល់ ហើយផ្ទៀងផ្ទាត់ជាមួយកម្មវិធីអានបាកូដដាច់ដោយឡែក។"]], "stats": [["51", "ការត្រួតពិនិត្យពីដើមដល់ចប់"], ["v4.4", "កំណែបច្ចុប្បន្ន"], ["0", "ម៉ាស៊ីនមេដែលត្រូវការ"]], "timeline": [["កញ្ញា", "កម្មវិធីបង្កាន់ដៃ៖ A4/A5 មើលមុនព្រីន ជ្រើសតេស្តតាមទម្រង់ក្រដាស"], ["12 វិច្ឆិកា", "V2 ទៅមន្ទីរពិសោធន៍ដៃគូ៖ ទម្រង់ស្នើសុំ ទិន្នន័យបម្រុងជា Excel/PDF"], ["17 វិច្ឆិកា", "V3៖ បញ្ជីតម្លៃ គ្លីនិក ផ្ទាំងគ្រប់គ្រង"], ["18 វិច្ឆិកា", "V4៖ ដំណើរការពេញលេញ បាកូដ លទ្ធផល និងរបាយការណ៍"]]},
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
    kh: {"name": "ធៀបភ្ជាប់ពាក្យឌីជីថល", "tagline": "ធៀបឌីជីថលពីរភាសា ដែលបើកដូចស្រោមសំបុត្រពិតនៅលើទូរស័ព្ទរបស់ភ្ញៀវ។", "client": "អតិថិជនឯកជន", "location": "កម្ពុជា", "type": "ធៀបវេបសម្រាប់ទូរស័ព្ទ", "duration": "ប្រហែល ១ សប្តាហ៍", "goal": "គូស្នេហ៍មួយគូចង់បានធៀបភ្ជាប់ពាក្យ ដែលភ្ញៀវអាចបើកពីតំណតែមួយក្នុង Telegram ហើយមានអារម្មណ៍ប្រណីតដូចធៀបក្រដាសបោះពុម្ព។ វាត្រូវតែអានស្រស់ស្អាតជាភាសាខ្មែរផ្លូវការ ដំណើរការលើទូរស័ព្ទគ្រប់ប្រភេទ និងអនុញ្ញាតឱ្យភ្ញៀវដែលមិនអាចចូលរួម ផ្ញើការជូនពរតាម KHQR។", "features": [["ស្រោមសំបុត្របើកបាន", "ចុចត្រាក្រមួន៖ ខ្សែស្រាយចេញ ទ្វារបើក ហើយកាតរុញឡើងមក។"], ["ស្លឹកឈើជ្រុះ", "ស្លឹក eucalyptus និងស្លឹករុក្ខជាតិពិត រសាត់ជាបីស្រទាប់ ជាមួយចលនាកាមេរ៉ាទន់ៗ។"], ["អក្សរខ្មែរផ្លូវការ", "ពាក្យគោរពខ្មែរបែបប្រពៃណី ប្រើពុម្ពអក្សរ Battambang និង Moul ជាមួយឈ្មោះជាអក្សរផ្ចង់អង់គ្លេស។"], ["រាប់ថយក្រោយផ្ទាល់", "ថ្ងៃ ម៉ោង នាទី និងវិនាទី រហូតដល់ពិធី ជាភាសាខ្មែរ។"], ["តន្ត្រីផ្ទៃខាងក្រោយ", "បទភ្លេងទន់ភ្លន់ចាប់ផ្តើមពេលបើក ជាមួយប៊ូតុងបិទសំឡេង។"], ["ចំណងដៃតាម KHQR", "ភ្ញៀវដែលមិនអាចចូលរួម អាចផ្ញើការជូនពរតាមកូដ KHQR។"]], "challenges": [["ក្រដាសដែលមើលទៅដូចពិត", "ស្រមោលច្រើនស្រទាប់តាមប្រភពពន្លឺតែមួយ វាយនភាពក្រដាស និងគ្រាប់ល្អិតៗ ធ្វើឱ្យកាតមើលទៅដូចរូបថត មិនមែនគំនូរ។"], ["រលូនលើទូរស័ព្ទតម្លៃទាប", "ទំព័រតែមួយដែលមានគ្រប់យ៉ាងក្នុងខ្លួន ជាមួយចលនាដែលប្រើ GPU ធ្វើឱ្យរលូនសូម្បីលើទូរស័ព្ទ Android កម្រិតទាប។"]], "stats": [["ខ្មែរ និងអង់គ្លេស", "ភាសា"], ["គ្មាន", "កម្មវិធីត្រូវដំឡើង"]], "timeline": [["2 វិច្ឆិកា", "រចនា ក្រដាស និងរូបស្លឹកឈើ"], ["5 វិច្ឆិកា", "បន្ថែមផ្នែកចំណងដៃ KHQR ហើយចែកជូនភ្ញៀវ"]]},
    links: [], // TODO: add live link only with the couple's permission
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
