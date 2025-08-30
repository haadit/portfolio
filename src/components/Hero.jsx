import React from 'react'
import LightRays from './LightRays'
import ProfileCard from './ProfileCard'
import avatarImg from '../assets/11015.jpg'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Hero = () => {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 96, // space for fixed header
        background:
          'radial-gradient(1200px 600px at 50% -200px, rgba(99,102,241,0.10), transparent 60%),\
           radial-gradient(1000px 500px at 80% 0, rgba(168,85,247,0.10), transparent 60%)',
      }}
    >
      {/* Background rays */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 1 }}>
        <ProfileCard
          name="Aditya Anjan Jha"
          title="Software Engineer"
          handle="aditya"
          status="Online"
          contactText="Contact Me"
          avatarUrl={avatarImg}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => {
            const el = document.querySelector('#contact');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.hash = '#contact';
            }
          }}
        />

        {/* Social buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://github.com/haadit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 9999,
              background: 'rgba(17,24,39,0.7)',
              color: '#E5E7EB',
              textDecoration: 'none',
              border: '1px solid rgba(99,102,241,0.35)'
            }}
          >
            <FaGithub />
            <span style={{ fontSize: 14 }}>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-anjan-jha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 9999,
              background: 'rgba(17,24,39,0.7)',
              color: '#E5E7EB',
              textDecoration: 'none',
              border: '1px solid rgba(168,85,247,0.35)'
            }}
          >
            <FaLinkedin />
            <span style={{ fontSize: 14 }}>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div style={{ width: 24, height: 40, border: '2px solid #9CA3AF', borderRadius: 9999, display: 'flex', justifyContent: 'center', animation: 'bounce 1.5s infinite' }}>
          <div style={{ width: 4, height: 12, background: '#9CA3AF', borderRadius: 9999, marginTop: 8 }}></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
