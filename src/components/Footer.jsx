import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/haadit', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/aditya-anjan-jha', label: 'LinkedIn' }
  ]

  // Quick links removed as requested

  return (
    <footer style={{ background: '#111827', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          {/* Brand Section only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(90deg,#6366F1,#A855F7)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Portfolio</h3>
            <p style={{ color: '#9CA3AF', lineHeight: 1.7, marginTop: 8 }}>
              Passionate developer creating digital experiences that make a difference.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  style={{ color: '#9CA3AF', textDecoration: 'none' }}
                  aria-label={social.label}
                >
                  <social.icon style={{ fontSize: 20 }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Minimal bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ borderTop: '1px solid #1F2937', marginTop: 24, paddingTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <p style={{ color: '#9CA3AF', fontSize: 14 }}>© {currentYear} Portfolio</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
