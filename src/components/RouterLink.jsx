import { Icon } from './Icon'

export function navigate(href) {
  if (window.location.pathname === href) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function RouterLink({ href, children, className = '', onClick, showArrow = false, ...props }) {
  const external = /^https?:\/\//.test(href)

  function handleClick(event) {
    if (onClick) onClick(event)
    if (event.defaultPrevented || external || event.metaKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    navigate(href)
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...props}
    >
      {children}
      {showArrow && <Icon name={external ? 'external' : 'arrow'} size={16} />}
    </a>
  )
}
