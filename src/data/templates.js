// Invitation templates live as standalone pages in public/templates/<slug>/index.html.
// Each one reads ?a=&b=&to=&date=&venue= and listens for live updates (see public/templates/shared/invite.js).

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
  },
  {
    slug: 'invite-garden',
    name: 'Garden',
    occasion: 'Engagement',
    style: 'Soft florals & photos',
    swatch: ['#f2d4d2', '#c0727c'],
    blurb: 'Your pre-wedding photo in a floral arch that draws itself, a swipeable gallery and petals that keep falling.',
    highlights: ['Photo gallery', 'Self-drawing arch', 'Monogram'],
    defaults: { a: 'Sokha', b: 'Nary', guest: 'លោក លោកស្រី', date: '2027-04-18', venue: 'Rose Garden Pavilion' },
  },
  {
    slug: 'invite-monochrome',
    name: 'Monochrome',
    occasion: 'Wedding',
    style: 'Modern editorial',
    swatch: ['#ffffff', '#000000'],
    blurb: 'Big type, black and white photography and a clean RSVP. For couples who like things simple and sharp.',
    highlights: ['Editorial type', 'Dress code', 'Guest counter'],
    defaults: { a: 'Lina', b: 'Rithy', guest: 'you', date: '2027-03-21', venue: 'The White Villa' },
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
