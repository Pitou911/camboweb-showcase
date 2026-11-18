// Invitation templates live as standalone pages in public/templates/<slug>/index.html.
// Each one reads ?a=&b=&to=&date=&venue= and listens for live updates (see public/templates/shared/invite.js).
// Every entry has a `kh` block with the Khmer text shown when the visitor switches to ខ្មែរ.

export const invitations = [
  {
    slug: 'invite-golden-lotus',
    name: 'Golden Lotus',
    occasion: 'Wedding',
    style: 'Traditional Khmer',
    swatch: ['#6e0b18', '#d9b26a'],
    blurb: 'Crimson and gold doors swing open in 3D to a shower of petals. Formal Khmer wording, full programme, gold-foil names.',
    highlights: ['3D door opening', 'Khmer programme', 'Gold foil names'],
    defaults: { a: 'Vibol', b: 'Chanthy', guest: 'លោក លោកស្រី', date: '2027-03-13', venue: 'Lotus Garden Hall' },
    kh: {
      occasion: 'អាពាហ៍ពិពាហ៍',
      style: 'បែបខ្មែរបុរាណ',
      blurb: 'ទ្វារពណ៌ក្រហម និងមាសបើកចេញជា 3D ជាមួយផ្កាធ្លាក់ចុះ។ ពាក្យពេចន៍ខ្មែរផ្លូវការ កម្មវិធីពេញលេញ និងឈ្មោះពណ៌មាស។',
      highlights: ['ទ្វារបើកជា 3D', 'កម្មវិធីជាភាសាខ្មែរ', 'ឈ្មោះពណ៌មាស'],
    },
  },
  {
    slug: 'invite-eucalyptus',
    name: 'Eucalyptus',
    occasion: 'Engagement',
    style: 'Paper & greenery',
    swatch: ['#e8e6df', '#6d8a6c'],
    blurb: 'A real-feeling envelope: tap the wax seal, the twine snaps and the card rises out while leaves drift past.',
    highlights: ['Envelope that opens', 'Falling leaves', 'Live countdown'],
    defaults: { a: 'Dara', b: 'Sophea', guest: 'ភ្ញៀវកិត្តិយស', date: '2027-02-14', venue: '' },
    noVenue: true,
    kh: {
      occasion: 'ភ្ជាប់ពាក្យ',
      style: 'ក្រដាស និងស្លឹកឈើ',
      blurb: 'ស្រោមសំបុត្រដូចពិត៖ ចុចត្រាក្រមួន ខ្សែស្រាយចេញ ហើយកាតរុញឡើងមក ខណៈស្លឹកឈើរសាត់កាត់។',
      highlights: ['ស្រោមសំបុត្របើកបាន', 'ស្លឹកឈើជ្រុះ', 'រាប់ថយក្រោយផ្ទាល់'],
    },
  },
  {
    slug: 'invite-garden',
    name: 'Garden',
    occasion: 'Engagement',
    style: 'Soft florals & photos',
    swatch: ['#f2d4d2', '#c0727c'],
    blurb: 'Your pre-wedding photo in a soft floral arch, a swipeable gallery and petals that keep falling.',
    highlights: ['Photo gallery', 'Arch photo frame', 'Monogram'],
    defaults: { a: 'Sokha', b: 'Nary', guest: 'លោក លោកស្រី', date: '2027-04-18', venue: 'Rose Garden Pavilion' },
    kh: {
      occasion: 'ភ្ជាប់ពាក្យ',
      style: 'ផ្កា និងរូបថត',
      blurb: 'រូបថតមុនរៀបការរបស់អ្នកក្នុងស៊ុមរាងទ្វារ វិចិត្រសាលរូបថតអូសមើលបាន និងផ្កាធ្លាក់ឥតឈប់។',
      highlights: ['វិចិត្រសាលរូបថត', 'ស៊ុមរូបរាងទ្វារ', 'អក្សរកាត់ឈ្មោះ'],
    },
  },
  {
    slug: 'invite-monochrome',
    name: 'Monochrome',
    occasion: 'Wedding',
    style: 'Modern editorial',
    swatch: ['#ffffff', '#000000'],
    blurb: 'Big type, black and white photography and plenty of room to breathe. For couples who like things simple and sharp.',
    highlights: ['Editorial type', 'Dress code', 'Scrolling ticker'],
    defaults: { a: 'Lina', b: 'Rithy', guest: 'you', date: '2027-03-21', venue: 'The White Villa' },
    kh: {
      occasion: 'អាពាហ៍ពិពាហ៍',
      style: 'ទំនើប ស និងខ្មៅ',
      blurb: 'អក្សរធំៗ រូបថតស-ខ្មៅ និងចន្លោះទំនេរស្រស់ស្រាយ។ សម្រាប់គូស្វាមីភរិយាដែលចូលចិត្តភាពសាមញ្ញ និងស្អាតស្អំ។',
      highlights: ['អក្សរបែបទស្សនាវដ្តី', 'សម្លៀកបំពាក់', 'អក្សររត់'],
    },
  },
  {
    slug: 'invite-starlight',
    name: 'Starlight',
    occasion: 'Birthday',
    style: 'Night sky & gold',
    swatch: ['#070d26', '#e8c77d'],
    blurb: 'A live starry sky with shooting stars. Guests tap the candle to blow it out and make a wish.',
    highlights: ['Live starry sky', 'Blow out the candle', 'Glass cards'],
    defaults: { a: 'Malis', b: '', guest: 'friend', date: '2027-04-24', venue: 'Skyline Rooftop' },
    single: true,
    kh: {
      occasion: 'ខួបកំណើត',
      style: 'មេឃពេលយប់ និងមាស',
      blurb: 'មេឃពោរពេញដោយផ្កាយ និងផ្កាយដុះកន្ទុយ។ ភ្ញៀវចុចលើទៀនដើម្បីផ្លុំ ហើយបន់ស្រន់។',
      highlights: ['មេឃផ្កាយផ្ទាល់', 'ផ្លុំទៀន', 'កាតកញ្ចក់'],
    },
  },
]

export const websites = [
  {
    slug: 'site-restaurant',
    name: 'Restaurant',
    title: 'Kampot Table',
    domain: 'kampottable.com',
    img: '/img/tpl-restaurant.jpg',
    swatch: ['#14110f', '#d99a3d'],
    blurb: 'A warm, cinematic site for a restaurant. Guests browse the menu in USD or riel and book a table in a few taps.',
    highlights: ['Table booking', 'Menu in USD & riel', 'Open-now status', 'Add to calendar'],
    kh: {
      name: 'ភោជនីយដ្ឋាន',
      blurb: 'គេហទំព័រកក់ក្តៅ និងទាក់ទាញសម្រាប់ភោជនីយដ្ឋាន។ ភ្ញៀវមើលម៉ឺនុយជាដុល្លារ ឬរៀល ហើយកក់តុបានក្នុងពីរបីជំហាន។',
      highlights: ['កក់តុ', 'ម៉ឺនុយជាដុល្លារ និងរៀល', 'ស្ថានភាពបើក/បិទ', 'បញ្ចូលក្នុងប្រតិទិន'],
    },
  },
  {
    slug: 'site-barber',
    name: 'Barbershop',
    title: 'Sharp & Co.',
    domain: 'sharpandco.com',
    img: '/img/tpl-barber.jpg',
    swatch: ['#0f0f0f', '#c39a5b'],
    blurb: 'Bold and confident. Clients pick a service, a barber and a free time slot, then get a booking code.',
    highlights: ['4-step booking', 'Choose your barber', 'Live free slots', 'Price list'],
    kh: {
      name: 'ហាងកាត់សក់',
      blurb: 'ដិត និងមានទំនុកចិត្ត។ អតិថិជនជ្រើសសេវា ជាងកាត់សក់ និងម៉ោងទំនេរ រួចទទួលបានលេខកូដកក់។',
      highlights: ['កក់ ៤ ជំហាន', 'ជ្រើសជាងកាត់សក់', 'ម៉ោងទំនេរផ្ទាល់', 'បញ្ជីតម្លៃ'],
    },
  },
  {
    slug: 'site-bar',
    name: 'Bar & lounge',
    title: 'Lantern Rooftop',
    domain: 'lanternrooftop.com',
    img: '/img/tpl-bar.jpg',
    swatch: ['#170c1c', '#f2a65a'],
    blurb: 'Moody and glowing. A live happy-hour clock, a cocktail menu you can filter, weekly events and table reservations.',
    highlights: ['Event reservations', 'Happy-hour clock', 'Cocktail filters', 'Floating lanterns'],
    kh: {
      name: 'បារ និងឡោន',
      blurb: 'បរិយាកាសស្រទន់ និងភ្លឺស្រស់។ នាឡិកាម៉ោងបញ្ចុះតម្លៃ ម៉ឺនុយស្រាក្រឡុកច្រោះបាន ព្រឹត្តិការណ៍ប្រចាំសប្តាហ៍ និងការកក់តុ។',
      highlights: ['កក់ព្រឹត្តិការណ៍', 'នាឡិកាម៉ោងបញ្ចុះតម្លៃ', 'ច្រោះស្រាក្រឡុក', 'គោមអណ្តែត'],
    },
  },
]

// POS templates live in public/templates/pos-<kind>/ and share public/templates/shared/pos.js.
export const posTemplates = [
  {
    slug: 'pos-mart',
    name: 'Mart',
    title: 'Sunrise Mart',
    swatch: ['#0f4d32', '#ffc93c'],
    blurb: 'For minimarts and shops. Scan a barcode or tap a product, see stock as you sell, and give change in dollars or riel.',
    highlights: ['Barcode scanning', 'Live stock count', 'Low-stock warnings', 'Change in USD & riel'],
    kh: {
      name: 'ម៉ាត',
      blurb: 'សម្រាប់ម៉ាត និងហាងលក់ទំនិញ។ ស្កេនបាកូដ ឬចុចលើទំនិញ មើលស្តុកពេលលក់ និងអាប់លុយជាដុល្លារ ឬរៀល។',
      highlights: ['ស្កេនបាកូដ', 'ស្តុកផ្ទាល់', 'ព្រមានពេលស្តុកជិតអស់', 'អាប់លុយជាដុល្លារ និងរៀល'],
    },
  },
  {
    slug: 'pos-cafe',
    name: 'Café',
    title: 'Mekong Brew',
    swatch: ['#2b1d14', '#c4692e'],
    blurb: 'For coffee shops. Size, sugar and ice on every drink, dine-in or takeaway, and an order number for the pickup queue.',
    highlights: ['Size, sugar & ice', 'Order numbers', 'Pickup queue', 'KHQR & cash'],
    kh: {
      name: 'ហាងកាហ្វេ',
      blurb: 'សម្រាប់ហាងកាហ្វេ។ ជ្រើសទំហំ ស្ករ និងទឹកកកសម្រាប់ភេសជ្ជៈនីមួយៗ ញ៉ាំនៅហាង ឬខ្ចប់ និងលេខរៀងសម្រាប់ជួររង់ចាំ។',
      highlights: ['ទំហំ ស្ករ និងទឹកកក', 'លេខរៀងការកម្ម៉ង់', 'ជួររង់ចាំ', 'KHQR និងសាច់ប្រាក់'],
    },
  },
  {
    slug: 'pos-restaurant',
    name: 'Restaurant',
    title: 'Riverside Kitchen',
    swatch: ['#141a26', '#e4572e'],
    blurb: 'For table service. Pick a table, send rounds to the kitchen printer, then print the bill and take payment.',
    highlights: ['Tables at a glance', 'Send to kitchen', 'Bill & pay', 'Khmer dish names'],
    kh: {
      name: 'ភោជនីយដ្ឋាន',
      blurb: 'សម្រាប់ការបម្រើតាមតុ។ ជ្រើសតុ ផ្ញើការកម្ម៉ង់ទៅម៉ាស៊ីនព្រីនផ្ទះបាយ រួចព្រីនវិក្កយបត្រ និងទទួលប្រាក់។',
      highlights: ['មើលតុទាំងអស់ភ្លាមៗ', 'ផ្ញើទៅផ្ទះបាយ', 'វិក្កយបត្រ និងបង់ប្រាក់', 'ឈ្មោះម្ហូបជាខ្មែរ'],
    },
  },
]

export const templateUrl = (slug, fields = {}) => {
  const q = new URLSearchParams()
  if (fields.a) q.set('a', fields.a)
  if (fields.b) q.set('b', fields.b)
  if (fields.guest) q.set('to', fields.guest)
  if (fields.date) q.set('date', fields.date)
  if (fields.venue) q.set('venue', fields.venue)
  const qs = q.toString()
  return `/templates/${slug}/index.html${qs ? `?${qs}` : ''}`
}

export const siteUrl = (slug, name) => `/templates/${slug}/index.html${name ? `?name=${encodeURIComponent(name)}` : ''}`
