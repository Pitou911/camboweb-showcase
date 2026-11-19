import { Link } from 'react-router-dom'
import { usePrefs } from '../prefs'
import Floater from '../components/Floater'

// [English title, Khmer title, English text, Khmer text, link, English link text, Khmer link text]
const BUILD = [
  ['Websites with booking', 'គេហទំព័រជាមួយការកក់',
    'Restaurants, barbershops, bars and clinics. Customers see your menu or prices and book in a few taps.',
    'ភោជនីយដ្ឋាន ហាងកាត់សក់ បារ និងគ្លីនិក។ អតិថិជនមើលម៉ឺនុយ ឬតម្លៃ ហើយកក់បានក្នុងពីរបីជំហាន។',
    '/#websites', 'See website templates', 'មើលគំរូគេហទំព័រ'],
  ['E-invitations', 'ធៀបឌីជីថល',
    'Weddings, engagements and birthdays, in Khmer and English, with each guest’s name on the cover.',
    'អាពាហ៍ពិពាហ៍ ភ្ជាប់ពាក្យ និងខួបកំណើត ជាភាសាខ្មែរ និងអង់គ្លេស ដែលមានឈ្មោះភ្ញៀវម្នាក់ៗនៅលើក្រប។',
    '/#invitations', 'Try an invitation', 'សាកល្បងធៀប'],
  ['POS and business systems', 'ប្រព័ន្ធលក់ និងប្រព័ន្ធអាជីវកម្ម',
    'Tablet point-of-sale, kitchen printing, stock and nightly reports, built around how your staff work.',
    'ប្រព័ន្ធលក់លើថេប្លេត ការព្រីនទៅផ្ទះបាយ ស្តុក និងរបាយការណ៍ប្រចាំយប់ រចនាតាមរបៀបដែលបុគ្គលិករបស់អ្នកធ្វើការ។',
    '/#pos', 'Try a POS', 'សាកល្បង POS'],
  ['Desktop and offline apps', 'កម្មវិធីកុំព្យូទ័រ និងគ្មានអ៊ីនធឺណិត',
    'Software that keeps working when the internet doesn’t, like the lab system we built for Saravoan.',
    'កម្មវិធីដែលនៅតែដំណើរការពេលអ៊ីនធឺណិតដាច់ ដូចប្រព័ន្ធមន្ទីរពិសោធន៍ដែលយើងបង្កើតសម្រាប់ Saravoan។',
    '/work/saravoan-labo', 'Read the Saravoan story', 'អានរឿង Saravoan'],
]

const STEPS = [
  ['Clickable prototype', 'គំរូដែលចុចបាន', 'Within the first week you can tap through a working prototype and tell us what to change.', 'ក្នុងសប្តាហ៍ដំបូង អ្នកអាចចុចសាកល្បងគំរូដែលដំណើរការ ហើយប្រាប់យើងពីអ្វីដែលត្រូវកែ។'],
  ['Build in small releases', 'បង្កើតជាជំហានតូចៗ', 'New features arrive every few days, so you see progress and steer it as we go.', 'មុខងារថ្មីមកដល់រៀងរាល់ពីរបីថ្ងៃម្តង ដូច្នេះអ្នកឃើញវឌ្ឍនភាព និងអាចកែទិសដៅបាន។'],
  ['Test on your own devices', 'សាកល្បងលើឧបករណ៍របស់អ្នក', 'We test on your tablet, your printer and your phones before anything goes live.', 'យើងសាកល្បងលើថេប្លេត ម៉ាស៊ីនព្រីន និងទូរស័ព្ទរបស់អ្នក មុនពេលដាក់ឱ្យប្រើពិត។'],
  ['Go live, then keep improving', 'ដាក់ឱ្យប្រើ ហើយបន្តកែលម្អ', 'We keep shipping fixes and small improvements from your feedback.', 'យើងបន្តកែកំហុស និងកែលម្អតាមមតិរបស់អ្នក។'],
]

const PROMISES = [
  ['Your content is yours', 'មាតិកាជារបស់អ្នក', 'Your text, photos, menus and customer data belong to you, always.', 'អត្ថបទ រូបថត ម៉ឺនុយ និងទិន្នន័យអតិថិជន ជាកម្មសិទ្ធិរបស់អ្នកជានិច្ច។'],
  ['One simple monthly plan', 'គម្រោងប្រចាំខែសាមញ្ញមួយ', 'For websites, one monthly fee covers your domain, hosting, updates and fixes. No surprise bills.', 'សម្រាប់គេហទំព័រ ថ្លៃប្រចាំខែតែមួយគ្របដណ្តប់ដូមែន ម៉ាស៊ីនមេ ការអាប់ដេត និងការជួសជុល។ គ្មានវិក្កយបត្រភ្ញាក់ផ្អើល។'],
  ['Khmer and English', 'ខ្មែរ និងអង់គ្លេស', 'Everything we build can be in Khmer, English or both, for your staff and your customers.', 'អ្វីៗដែលយើងបង្កើតអាចជាភាសាខ្មែរ អង់គ្លេស ឬទាំងពីរ សម្រាប់បុគ្គលិក និងអតិថិជនរបស់អ្នក។'],
  ['Plain answers', 'ចម្លើយច្បាស់លាស់', 'A clear price and timeline before work starts, and progress you can see every week.', 'តម្លៃ និងពេលវេលាច្បាស់លាស់មុនចាប់ផ្តើម និងវឌ្ឍនភាពដែលអ្នកឃើញរៀងរាល់សប្តាហ៍។'],
]

export default function About() {
  const { t } = usePrefs()
  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="eyebrow">{t('About us', 'អំពីយើង')}</p>
            <h1>{t('A small studio building software for Cambodian businesses.', 'ស្ទូឌីយោតូចមួយ ដែលបង្កើតកម្មវិធីសម្រាប់អាជីវកម្មខ្មែរ។')}</h1>
          </div>
          <div>
            <p className="lead">{t(
              'CamboWeb is based in Phnom Penh. We design and build websites, e-invitations and the systems businesses run on every day, from a bar’s tablet POS to a medical lab’s desktop app.',
              'CamboWeb មានទីតាំងនៅភ្នំពេញ។ យើងរចនា និងបង្កើតគេហទំព័រ ធៀបឌីជីថល និងប្រព័ន្ធដែលអាជីវកម្មប្រើប្រាស់ជារៀងរាល់ថ្ងៃ ចាប់ពីប្រព័ន្ធ POS ថេប្លេតរបស់បារ ដល់កម្មវិធីកុំព្យូទ័ររបស់មន្ទីរពិសោធន៍វេជ្ជសាស្ត្រ។',
            )}</p>
            <div className="actions">
              <Link className="btn btn-ink" to="/work">{t('See our work', 'មើលស្នាដៃ')}</Link>
              <Link className="btn btn-line" to="/contact">{t('Contact us', 'ទាក់ទងយើង')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="build-h">
        <Floater kind="coin" side="right" top="12%" />
        <div className="head-row">
          <h2 id="build-h" className="h-section">{t('What we build', 'អ្វីដែលយើងបង្កើត')}</h2>
          <p>{t('Ready-made templates when you need something fast, custom software when you need it to fit exactly.', 'គំរូរួចរាល់ពេលអ្នកត្រូវការលឿន និងកម្មវិធីធ្វើតាមតម្រូវការពេលអ្នកត្រូវការឱ្យត្រូវនឹងការងារពិតប្រាកដ។')}</p>
        </div>
        <ul className="features features-4">
          {BUILD.map(([en, kh, d, dk, href, le, lk]) => (
            <li key={en}>
              <h3>{t(en, kh)}</h3>
              <p>{t(d, dk)}</p>
              <Link className="text-link" to={href}>{t(le, lk)}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section band" id="process" aria-labelledby="process-h">
        <Floater kind="ring" side="left" top="14%" />
        <div className="head-row">
          <h2 id="process-h" className="h-section">{t('How we work', 'របៀបយើងធ្វើការ')}</h2>
          <p>{t('The same four steps for every project, whether it’s an invitation or a full POS.', 'បួនជំហានដូចគ្នាសម្រាប់គ្រប់គម្រោង មិនថាធៀប ឬប្រព័ន្ធ POS ពេញលេញ។')}</p>
        </div>
        <ol className="steps">
          {STEPS.map(([en, kh, d, dk]) => (
            <li key={en}><h3>{t(en, kh)}</h3><p>{t(d, dk)}</p></li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="promise-h">
        <Floater kind="cube" side="right" top="16%" />
        <div className="head-row">
          <h2 id="promise-h" className="h-section">{t('What you can count on', 'អ្វីដែលអ្នកអាចទុកចិត្តបាន')}</h2>
          <p>{t('Small businesses need software that keeps working and costs they can plan for. So we work like this.', 'អាជីវកម្មតូចៗត្រូវការកម្មវិធីដែលដំណើរការជានិច្ច និងចំណាយដែលអាចគ្រោងទុកបាន។ ដូច្នេះយើងធ្វើការបែបនេះ។')}</p>
        </div>
        <ul className="features features-4">
          {PROMISES.map(([en, kh, d, dk]) => (
            <li key={en}><h3>{t(en, kh)}</h3><p>{t(d, dk)}</p></li>
          ))}
        </ul>
      </section>
    </>
  )
}
