import React from 'react'
import ElectricBorder from './ElectricBorder'
import TiltedCard from './TiltedCard'
import './Skills.css'

const Skills = () => {

  return (
    <section
      id="skills"
      style={{ minHeight: '100vh', padding: '60px 16px', paddingTop: 96 }}
    >
      <div className="container">
        <div>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          {/* Removed category cards; keeping only Tools & Technologies grid below */}

          {/* Tools / Technology Logos */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">
              Tools & Technologies
            </h3>

            {(() => {
              const cdn = (name, variant) =>
                `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
              // Only the requested set
              const tools = [
                { name: 'React', src: cdn('react', 'original') },
                { name: 'Expo', src: 'https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg' },
                { name: 'Node.js', src: cdn('nodejs', 'original') },
                { name: 'JavaScript', src: cdn('javascript', 'original') },
                { name: 'Python', src: cdn('python', 'original') },
                { name: 'HTML', src: cdn('html5', 'original') },
                { name: 'CSS', src: cdn('css3', 'original') },
                { name: 'Express', src: cdn('express', 'original') },
                { name: 'MongoDB', src: cdn('mongodb', 'original') },
                { name: 'PostgreSQL', src: cdn('postgresql', 'original') },
                { name: 'Docker', src: cdn('docker', 'original') },
                { name: 'Ethereum', src: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg' },
                { name: 'Solidity', src: cdn('solidity', 'original') },
                { name: 'Flask', src: cdn('flask', 'original') },
                { name: 'TensorFlow', src: cdn('tensorflow', 'original') },
                { name: 'Machine Learning', src: cdn('pytorch', 'original') },
                { name: 'Git', src: cdn('git', 'original') },
                { name: 'GitHub', src: cdn('github', 'original') },
                { name: 'Supabase', src: cdn('supabase', 'original') },
                { name: 'Linux', src: cdn('linux', 'original') },
              ];

              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {tools.map((tool) => (
                    <ElectricBorder
                      key={tool.name}
                      color="#7df9ff"
                      speed={1}
                      chaos={0.5}
                      thickness={2}
                      style={{ borderRadius: 16 }}
                    >
                      <div className="p-4 bg-white rounded-2xl">
                        <TiltedCard
                          imageSrc={tool.src}
                          altText={tool.name}
                          captionText={tool.name}
                          containerHeight="180px"
                          imageHeight="120px"
                          imageWidth="120px"
                          showMobileWarning={false}
                          showTooltip={true}
                          scaleOnHover={1.06}
                          rotateAmplitude={10}
                        />
                      </div>
                    </ElectricBorder>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
