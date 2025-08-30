import React, { useState, useEffect } from 'react'
import GooeyNav from './GooeyNav'
import logo from '../assets/logo.png'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track viewport to switch to hamburger on small screens
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const items = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 300ms',
        background: scrolled ? 'rgba(17,24,39,0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.25)' : 'none'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, width: 'auto', display: 'block' }}
          />

          {/* Right section: GooeyNav on desktop, Hamburger on mobile */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {!isMobile ? (
              <div style={{ position: 'relative' }}>
                <GooeyNav
                  items={items}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <button
                  aria-label="Toggle menu"
                  onClick={() => setMenuOpen(v => !v)}
                  style={{
                    background: 'rgba(17,24,39,0.7)',
                    color: '#E5E7EB',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 12,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'inline-block', width: 18 }}>
                    <span style={{ display: 'block', height: 2, background: '#E5E7EB', marginBottom: 4 }} />
                    <span style={{ display: 'block', height: 2, background: '#E5E7EB', marginBottom: 4 }} />
                    <span style={{ display: 'block', height: 2, background: '#E5E7EB' }} />
                  </span>
                </button>

                {menuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      marginTop: 12,
                      background: 'rgba(17,24,39,0.95)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                      overflow: 'hidden',
                      minWidth: 180
                    }}
                  >
                    {items.map((it) => (
                      <a
                        key={it.href}
                        href={it.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: '#E5E7EB',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
