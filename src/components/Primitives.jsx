import { Icon } from './Icon'
import { RouterLink } from './RouterLink'

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  )
}

export function PageHero({ index, eyebrow, title, intro, aside }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div className="page-number" aria-hidden="true">{index}</div>
        <div className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  )
}

export function TextLink({ href, children, className = '' }) {
  return <RouterLink href={href} className={`text-link ${className}`} showArrow>{children}</RouterLink>
}

export function NoticeRow({ notice }) {
  const prototype = notice.status === 'Prototype'
  return (
    <article className={`notice-row ${notice.featured ? 'notice-row--featured' : ''}`}>
      <div className="notice-date">
        <span>{notice.date}</span>
        <Badge tone={prototype ? 'demo' : 'official'}>{notice.status}</Badge>
      </div>
      <div className="notice-content">
        <p className="eyebrow">{notice.category}</p>
        <h3>{notice.title}</h3>
        <p>{notice.summary}</p>
      </div>
      <RouterLink href={notice.href} className="notice-action" aria-label={`${notice.cta}. ${notice.title}`}>
        <span>{notice.cta}</span><Icon name={/^https?:/.test(notice.href) ? 'external' : 'arrow'} size={18} />
      </RouterLink>
    </article>
  )
}

export function DemoNote({ children }) {
  return (
    <div className="demo-note">
      <Badge tone="demo">Prototype content</Badge>
      <p>{children}</p>
    </div>
  )
}

export function Callout({ eyebrow, title, text, href, label }) {
  return (
    <section className="shell callout">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{text}</p>
        {href && <TextLink href={href}>{label}</TextLink>}
      </div>
    </section>
  )
}
