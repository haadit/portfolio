import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaReact, FaJs, FaNode } from 'react-icons/fa'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const scrollerRef = useRef(null)

  // Fallback demo projects if GitHub API is empty or rate-limited
  const curatedImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop'
  ]
  const sampleProjects = [
    {
      id: 'demo-1',
      title: 'Portfolio Website',
      description: 'A modern responsive portfolio built with React and Tailwind CSS with smooth animations.',
      image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop',
      category: 'javascript',
      technologies: [{ name: 'React', icon: FaReact, color: '#61DAFB' }, { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' }],
      github: 'https://github.com/',
      live: 'https://example.com'
    },
    {
      id: 'demo-2',
      title: 'Node API Boilerplate',
      description: 'Production-ready Node.js REST API with authentication, validation, and testing.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      category: 'node',
      technologies: [{ name: 'Node.js', icon: FaNode, color: '#339933' }, { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' }],
      github: 'https://github.com/',
      live: 'https://example.com'
    },
    {
      id: 'demo-3',
      title: 'React UI Kit',
      description: 'Reusable components with accessible patterns and theme support.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop',
      category: 'react',
      technologies: [{ name: 'React', icon: FaReact, color: '#61DAFB' }],
      github: 'https://github.com/',
      live: 'https://example.com'
    }
  ]

  useEffect(() => {
    let cancelled = false
    async function loadRepos() {
      try {
        setLoading(true)
        setError(null)
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const res = await fetch('https://api.github.com/users/haadit/repos?per_page=100&sort=updated', {
          headers: {
            'Accept': 'application/vnd.github+json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        })
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const repos = await res.json()
        const mapped = repos
          .filter(r => !r.fork)
          .map((r, idx) => {
            const lang = r.language || 'other'
            const techIcon = lang === 'JavaScript' ? FaJs
              : lang === 'TypeScript' ? FaJs
              : lang === 'React' ? FaReact
              : lang === 'Node' || lang === 'Node.js' ? FaNode
              : null
            const techColor = lang === 'JavaScript' ? '#F7DF1E'
              : lang === 'TypeScript' ? '#3178C6'
              : lang === 'Python' ? '#3776AB'
              : lang === 'Java' ? '#EA2D2E'
              : '#6B7280'
            return {
              id: r.id || idx,
              title: r.name,
              description: r.description || 'No description provided.',
              image: curatedImages[idx % curatedImages.length],
              category: (lang || 'other').toLowerCase(),
              technologies: techIcon ? [{ name: lang, icon: techIcon, color: techColor }] : [{ name: lang, icon: FaJs, color: techColor }],
              github: r.html_url,
              live: r.homepage || r.html_url,
              featured: r.stargazers_count > 0
            }
          })
        if (!cancelled) setProjects(mapped)
      } catch (e) {
        console.error(e)
        if (!cancelled) setError(e.message || 'Failed to load repositories')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadRepos()
    return () => { cancelled = true }
  }, [])

  // Precompute data with fallback so something is always shown
  const data = projects.length ? projects : sampleProjects

  // Grid removed; no separate filtered list needed. Use inline filtering where required.

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="projects" style={{ minHeight: '100vh', padding: '60px 16px', paddingTop: 96 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 12 }}>
              My <span style={{ background: 'linear-gradient(90deg,#6366F1,#A855F7)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Projects</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6B7280', margin: '0 auto' }}>
              A showcase of my recent work and personal projects
            </p>
            {loading && (
              <div style={{ marginTop: 12, fontSize: 14, color: '#6B7280' }}>Loading GitHub repositories…</div>
            )}
            {error && (
              <div style={{ marginTop: 12, fontSize: 14, color: '#DC2626' }}>
                {error.includes('403')
                  ? 'GitHub rate limit reached. Add VITE_GITHUB_TOKEN to your environment for higher limits.'
                  : `Failed to load repositories: ${error}`}
              </div>
            )}
          </motion.div>

          {/* Filters removed */}

          {/* One-at-a-time scroll with snap scrolling */}
          <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
            <div
              ref={scrollerRef}
              style={{
                height: 'calc(100vh - 240px)',
                overflowY: 'auto',
                scrollSnapType: 'y mandatory',
                paddingRight: 4
              }}
            >
              {(() => {
                return data.slice(0, 12).map((project, idx) => (
                  <motion.div
                    key={`card-${project.id}`}
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ root: scrollerRef, once: false, amount: 0.6 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 22, delay: Math.min(idx * 0.02, 0.12) }}
                    style={{
                      scrollSnapAlign: 'start',
                      position: 'relative',
                      height: 'calc(100vh - 300px)',
                      marginBottom: 24,
                      borderRadius: 16,
                      overflow: 'hidden',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: '#0f172a'
                    }}
                  >
                    {/* Background image */}
                    <div
                      style={{
                        position: 'absolute', inset: 0,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop'})`
                      }}
                    />
                    {/* Foreground vignettes */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.35), rgba(0,0,0,0))' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0), rgba(0,0,0,0.35))' }} />

                    {/* Index badge */}
                    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
                        Project {(idx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Top-right quick actions */}
                    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', gap: 8 }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:40, height:40, borderRadius:12, color:'#fff', border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.12)', backdropFilter:'blur(6px)' }}
                        title="Source code"
                      >
                        <FaGithub />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:40, height:40, borderRadius:12, color:'#fff', background:'linear-gradient(90deg,#6366F1,#A855F7)' }}
                          title="Live demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>

                    {/* Bottom content */}
                    <div style={{ position:'absolute', left:0, right:0, bottom:0, zIndex:10, padding:'24px 28px' }}>
                      <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>{project.title}</h3>
                      <p style={{ marginTop: 10, maxWidth: 820, fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>{project.description}</p>
                      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {project.technologies?.map((tech) => (
                          <span key={tech.name} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 10px', borderRadius:9999, fontSize: 12, fontWeight:700, color:'#fff', border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(6px)' }}>
                            {tech.icon ? <tech.icon style={{ color: tech.color }} /> : null}
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                        <a
                          href={project.github}
                          style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.25)', color:'#fff', textDecoration:'none', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(4px)' }}
                          target="_blank" rel="noreferrer"
                        >
                          View Code
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            style={{ padding: '10px 16px', borderRadius: 12, color:'#fff', textDecoration:'none', background:'linear-gradient(90deg,#6366F1,#A855F7)' }}
                            target="_blank" rel="noreferrer"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              })()}
            </div>
          </motion.div>

          

          {/* CTA Section removed as requested */}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
