import React from 'react'
import MagicBento from './MagicBento'

const About = () => {
  return (
    <section
      id="about"
      style={{ minHeight: '100vh', padding: '60px 16px', paddingTop: 96 }}
    >
      <div className="container">
        <div className="max-w-6xl mx-auto flex justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
            cards={[
              {
                color: '#060010',
                label: 'About',
                title: 'About Me',
                description:
                  "I'm a software engineer focused on building reliable, user‑centric applications across the stack. I enjoy bridging polished React frontends with scalable Node/Express and database backends, and I explore ML to solve practical problems. Recently, I've shipped internal tools, automated workflows, and collaborated in fast-moving environments to deliver features under production constraints.",
                posClass: 'card--pos-right-top',
              },
              
              {
                color: '#060010',
                label: 'Experience',
                title: 'Experience',
                span: { cols: 2, rows: 2 },
                posClass: 'card--pos-middle-2x2',
                items: [
                  {
                    title: 'Tata Cummins — Internship',
                    period: 'July 2024 · 1 month',
                    subtitle: 'Microsoft Power Apps',
                    description:
                      'Built an internal app using Microsoft Power Apps and automated workflows to streamline team processes.',
                  },
                  {
                    title: 'Nokia — Internship',
                    period: 'Aug 2024 – Present · 1 year (ongoing)',
                    subtitle: 'Product Engineering Internship',
                    description:
                      'Focusing on scalable solutions, collaboration, and modern engineering practices.',
                  },
                ],
              },
              {
                color: '#060010',
                label: 'Journey',
                title: 'Journey',
                posClass: 'card--pos-left-top',
                description:
                  'It started with curiosity about how websites work and evolved into crafting digital experiences.',
              },
              {
                color: '#060010',
                label: 'Values',
                title: 'Values',
                posClass: 'card--pos-left-bottom',
                description:
                  "Clean, maintainable code and staying current with trends. I explore tech, contribute to OSS, and share knowledge.",
              },
              {
                color: '#060010',
                label: 'Goal',
                title: 'Goal',
                posClass: 'card--pos-right-bottom',
                description:
                  'Build applications that look great and deliver meaningful value to users and businesses.',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default About
