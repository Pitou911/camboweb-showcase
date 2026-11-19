// Section heading used on every page: small label + headline on the left, a short line and/or action on the right.
export default function SectionHead({ eyebrow, title, text, action, id }) {
  return (
    <div className="sh">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="h-section">{title}</h2>
      </div>
      {(text || action) && (
        <div className="sh-side">
          {text && <p>{text}</p>}
          {action}
        </div>
      )}
    </div>
  )
}
