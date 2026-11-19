import ContactForm from '../components/ContactForm'
import { site } from '../data/site'
import { usePrefs } from '../prefs'
import Floater from '../components/Floater'

const NEXT = [
  ['We reply within a day', 'យើងឆ្លើយតបក្នុងមួយថ្ងៃ', 'On Telegram, by phone or by email, in Khmer or English.', 'តាម Telegram ទូរស័ព្ទ ឬអ៊ីមែល ជាភាសាខ្មែរ ឬអង់គ្លេស។'],
  ['We talk it through', 'យើងពិភាក្សាគ្នា', 'A short chat about what you need, who will use it and when you need it.', 'ការជជែកខ្លីអំពីអ្វីដែលអ្នកត្រូវការ អ្នកណាជាអ្នកប្រើ និងពេលណាអ្នកត្រូវការវា។'],
  ['You get a price and a timeline', 'អ្នកទទួលបានតម្លៃ និងពេលវេលា', 'In writing, before any work starts. No surprises later.', 'ជាលាយលក្ខណ៍អក្សរ មុនពេលចាប់ផ្តើមការងារ។ គ្មានការភ្ញាក់ផ្អើលពេលក្រោយ។'],
]

const FAQ = [
  ['How much does it cost?', 'តម្លៃប៉ុន្មាន?',
    'It depends on what you need. Pick a budget range in the form and we’ll tell you honestly what fits it. Templates cost much less than custom software.',
    'អាស្រ័យលើអ្វីដែលអ្នកត្រូវការ។ ជ្រើសចន្លោះថវិកាក្នុងទម្រង់ ហើយយើងនឹងប្រាប់អ្នកដោយស្មោះត្រង់ពីអ្វីដែលសមនឹងថវិកានោះ។ គំរូមានតម្លៃទាបជាងកម្មវិធីធ្វើតាមតម្រូវការច្រើន។'],
  ['Is there a monthly fee for websites?', 'តើគេហទំព័រមានថ្លៃប្រចាំខែទេ?',
    'Yes. Websites have a small monthly maintenance fee. It pays for your domain name and the server your site runs on, and covers updates, backups and fixes so your site stays online and secure.',
    'បាទ/ចាស។ គេហទំព័រមានថ្លៃថែទាំប្រចាំខែតិចតួច។ វាបង់សម្រាប់ឈ្មោះដូមែន និងម៉ាស៊ីនមេដែលគេហទំព័ររបស់អ្នកដំណើរការ ហើយគ្របដណ្តប់ការអាប់ដេត ការបម្រុងទុក និងការជួសជុល ដើម្បីឱ្យគេហទំព័ររបស់អ្នកដំណើរការជានិច្ច និងមានសុវត្ថិភាព។'],
  ['How long does it take?', 'ចំណាយពេលប៉ុន្មាន?',
    'An e-invitation is usually ready in about a week. A custom system takes longer: our LoRi POS took seven weeks. You get a timeline before we start.',
    'ធៀបឌីជីថលជាធម្មតារួចរាល់ក្នុងរយៈពេលប្រហែលមួយសប្តាហ៍។ ប្រព័ន្ធធ្វើតាមតម្រូវការចំណាយពេលយូរជាង៖ ប្រព័ន្ធ POS របស់ LoRi ចំណាយពេលប្រាំពីរសប្តាហ៍។ អ្នកទទួលបានពេលវេលាមុនពេលយើងចាប់ផ្តើម។'],
  ['Who owns the content?', 'តើមាតិកាជាកម្មសិទ្ធិរបស់អ្នកណា?',
    'You do. Your text, photos, menus and customer data belong to you.',
    'ជារបស់អ្នក។ អត្ថបទ រូបថត ម៉ឺនុយ និងទិន្នន័យអតិថិជន ជាកម្មសិទ្ធិរបស់អ្នក។'],
  ['Can it be in Khmer?', 'តើអាចជាភាសាខ្មែរបានទេ?',
    'Yes. Everything we build can be in Khmer, English or both.',
    'បាន។ អ្វីៗដែលយើងបង្កើតអាចជាភាសាខ្មែរ អង់គ្លេស ឬទាំងពីរ។'],
  ['Do you help after launch?', 'តើជួយក្រោយពេលដាក់ឱ្យប្រើទេ?',
    'Yes. We keep fixing and improving things from your feedback after it goes live.',
    'បាទ/ចាស។ យើងបន្តកែកំហុស និងកែលម្អតាមមតិរបស់អ្នក បន្ទាប់ពីដាក់ឱ្យប្រើ។'],
]

export default function Contact() {
  const { t } = usePrefs()
  const ways = [
    site.telegram && ['Telegram', `@${site.telegram}`, `https://t.me/${site.telegram}`],
    site.phone && [t('Phone', 'ទូរស័ព្ទ'), site.phone, `tel:${site.phone.replace(/\s/g, '')}`],
    site.email && [t('Email', 'អ៊ីមែល'), site.email, `mailto:${site.email}`],
  ].filter(Boolean)

  return (
    <>
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="eyebrow">{t('Contact', 'ទំនាក់ទំនង')}</p>
            <h1>{t('Start a project.', 'ចាប់ផ្តើមគម្រោង។')}</h1>
          </div>
          <p className="lead">{t(
            'Tell us what you need in a few lines. A template, a custom website or a full system, we’ll reply within a day with honest advice and a next step.',
            'ប្រាប់យើងពីអ្វីដែលអ្នកត្រូវការបន្តិចបន្តួច។ មិនថាគំរូ គេហទំព័រធ្វើតាមតម្រូវការ ឬប្រព័ន្ធពេញលេញ យើងនឹងឆ្លើយតបក្នុងមួយថ្ងៃ ជាមួយដំបូន្មានស្មោះត្រង់ និងជំហានបន្ទាប់។',
          )}</p>
        </div>
      </section>

      <section className="wrap section contact-grid">
        <Floater kind="ring" side="left" top="10%" />
        <ContactForm />
        <aside className="contact-side">
          <div>
            <h2>{t('What happens next', 'អ្វីដែលកើតឡើងបន្ទាប់')}</h2>
            <ol className="next-steps">
              {NEXT.map(([en, kh, d, dk]) => <li key={en}><h3>{t(en, kh)}</h3><p>{t(d, dk)}</p></li>)}
            </ol>
          </div>
          <div>
            <h2>{t('Other ways to reach us', 'វិធីផ្សេងទៀតដើម្បីទាក់ទងយើង')}</h2>
            <dl className="facts">
              {ways.map(([k, v, href]) => (
                <div key={k}><dt>{k}</dt><dd><a className="text-link" href={href} target="_blank" rel="noreferrer">{v}</a></dd></div>
              ))}
              <div><dt>{t('Studio', 'ស្ទូឌីយោ')}</dt><dd>{t('Phnom Penh, Cambodia', 'ភ្នំពេញ កម្ពុជា')}</dd></div>
              <div><dt>{t('Languages', 'ភាសា')}</dt><dd>{t('Khmer and English', 'ខ្មែរ និងអង់គ្លេស')}</dd></div>
            </dl>
          </div>
        </aside>
      </section>

      <section className="wrap section band" aria-labelledby="faq-h">
        <Floater kind="coin" side="right" top="12%" />
        <div className="head-row">
          <h2 id="faq-h" className="h-section">{t('Questions we often get', 'សំណួរដែលគេសួរញឹកញាប់')}</h2>
          <p>{t('Something else on your mind? Ask it in the form above.', 'មានសំណួរផ្សេងទៀត? សួរក្នុងទម្រង់ខាងលើ។')}</p>
        </div>
        <div className="problems faq">
          {FAQ.map(([q, qk, a, ak], i) => (
            <details key={q} open={i === 0}><summary>{t(q, qk)}</summary><p>{t(a, ak)}</p></details>
          ))}
        </div>
      </section>
    </>
  )
}
