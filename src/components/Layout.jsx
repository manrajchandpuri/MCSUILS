import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { RouterLink } from './RouterLink'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Committee', href: '/committee' },
  { label: 'Competitions', href: '/competitions' },
  { label: 'Resources', href: '/resources' },
  { label: 'Training', href: '/training' },
  { label: 'Selected Teams', href: '/selected-teams' },
  { label: 'Notices', href: '/notices' },
]

function Header({ path }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])

  return (
    <>
      <div className="official-strip">
        <div className="shell official-strip__inner">
          <span>Prototype portal · Academic Session 2026–27</span>
          <a href="https://www.uils.puchd.ac.in/" target="_blank" rel="noreferrer">
            Official UILS website <Icon name="external" size={13} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <RouterLink href="/" className="brand" aria-label="Moot Court Society UILS home">
            <span className="brand-mark"><img src="/assets/mcs-uils-logo.png" alt="Moot Court Society UILS emblem" /></span>
            <span className="brand-copy">
              <strong>Moot Court Society</strong>
              <span>UILS · Panjab University</span>
            </span>
          </RouterLink>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <RouterLink
                key={item.href}
                href={item.href}
                className={path === item.href ? 'active' : ''}
                aria-current={path === item.href ? 'page' : undefined}
              >
                {item.label}
              </RouterLink>
            ))}
          </nav>

          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="shell">
              {navItems.map((item, index) => (
                <RouterLink
                  key={item.href}
                  href={item.href}
                  className={path === item.href ? 'active' : ''}
                  aria-current={path === item.href ? 'page' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{item.label}<Icon name="chevron" size={18} />
                </RouterLink>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-identity">
          <div className="footer-logos">
            <img src="/assets/mcs-uils-logo.png" alt="MCS UILS" />
            <img className="white-logo" src="/assets/uils-logo.png" alt="University Institute of Legal Studies" />
            <img className="pu-seal" src="/assets/panjab-university-seal.png" alt="Panjab University seal" />
          </div>
          <h2>Moot Court Society</h2>
          <p>University Institute of Legal Studies<br />Panjab University, Chandigarh</p>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Navigate</p>
          <RouterLink href="/about">About the Society</RouterLink>
          <RouterLink href="/competitions">Competitions & eliminations</RouterLink>
          <RouterLink href="/selected-teams">Guidance for selected teams</RouterLink>
          <RouterLink href="/notices">Notices & updates</RouterLink>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Official sources</p>
          <a href="https://www.uils.puchd.ac.in/" target="_blank" rel="noreferrer">UILS website <Icon name="external" size={13} /></a>
          <a href="https://www.uils.puchd.ac.in/show-noticeboard.php?nbid=1" target="_blank" rel="noreferrer">UILS notice board <Icon name="external" size={13} /></a>
          <a href="https://puchd.ac.in/" target="_blank" rel="noreferrer">Panjab University <Icon name="external" size={13} /></a>
          <a href="https://www.uils.puchd.ac.in/show-contactus.php" target="_blank" rel="noreferrer">Contact UILS <Icon name="external" size={13} /></a>
        </div>
      </div>

      <div className="shell disclaimer-box">
        <Icon name="shield" size={20} />
        <p><strong>Important</strong> This is a non-official prototype prepared as a working demonstration. In every case, notices, rules, emails, and directions issued through official UILS/MCS channels prevail over the content displayed here.</p>
      </div>

      <div className="shell footer-bottom">
        <span>Prototype · Academic Session 2026–27</span>
        <span>Designed for clarity, accessibility & careful maintenance</span>
      </div>
    </footer>
  )
}

export function Layout({ children, path }) {
  return (
    <div className="app-shell">
      <Header path={path} />
      <main id="main-content" key={path}>{children}</main>
      <Footer />
    </div>
  )
}
