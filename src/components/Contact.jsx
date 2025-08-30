import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import Galaxy from './Galaxy'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your .env file.')
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey)

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email, // if your template uses this variable
        reply_to: formData.email,   // EmailJS-recommended variable for Reply-To
        to_email: 'work.adityaajha@gmail.com', // ensure recipient
        message: formData.message
      }

      console.log('Sending email with params:', { serviceId, templateId, templateParams })

      const result = await emailjs.send(serviceId, templateId, templateParams)
      console.log('Email sent successfully:', result)
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(''), 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text
      })
      setIsSubmitting(false)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(''), 5000)
    }
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'work.adityaajha@gmail.com',
      link: 'mailto:work.adityaajha@gmail.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Bangalore, India',
      link: '#'
    }
  ]

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
    <section
      id="contact"
      style={{ position: 'relative', padding: '60px 16px', paddingTop: 96, overflow: 'hidden', minHeight: '100vh' }}
    >
      {/* Galaxy background layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.9 }}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.3}
          glowIntensity={0.45}
          saturation={0.8}
          hueShift={240}
          transparent={true}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 12, color: '#fff' }}>
              Get In <span style={{ background: 'linear-gradient(90deg,#6366F1,#A855F7)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Touch</span>
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', margin: '0 auto', maxWidth: 720 }}>
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {/* Left column */}
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#fff' }}>Let's start a conversation</h3>
              
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    whileHover={{ x: 10 }}
                    style={{ display:'flex', alignItems:'center', gap: 12, padding: 16, background:'rgba(0,0,0,0.45)', borderRadius: 14, boxShadow: '0 10px 25px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', textDecoration:'none' }}
                  >
                    <div style={{ background:'linear-gradient(90deg,#6366F1,#A855F7)', color:'#fff', padding: 10, borderRadius: 10 }}>
                      <info.icon style={{ fontSize: 18 }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>{info.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* 'Why work with me?' section removed as requested */}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} style={{ background:'rgba(0,0,0,0.45)', padding: 24, borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:16, marginBottom: 16 }}>
                  <div>
                    <label htmlFor="name" style={{ display:'block', fontSize: 14, fontWeight:600, color:'#fff', marginBottom:8 }}>Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ width:'100%', padding:'12px 14px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:10, background:'rgba(0,0,0,0.35)', color:'#fff' }}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display:'block', fontSize: 14, fontWeight:600, color:'#fff', marginBottom:8 }}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ width:'100%', padding:'12px 14px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:10, background:'rgba(0,0,0,0.35)', color:'#fff' }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>


                <div className="mb-6">
                  <label htmlFor="message" style={{ display:'block', fontSize: 14, fontWeight:600, color:'#fff', marginBottom:8 }}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{ width:'100%', padding:'12px 14px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:10, background:'rgba(0,0,0,0.35)', color:'#fff', resize:'none' }}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width:'100%', background:'linear-gradient(90deg,#6366F1,#A855F7)', color:'#fff', padding:'12px 16px', borderRadius:12, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 10px 25px rgba(0,0,0,0.25)', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{ width:20, height:20, borderRadius:'50%', borderBottom:'2px solid #fff', animation:'spin 1s linear infinite' }}></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 16, padding: 16, background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.45)', color:'#d1fae5', borderRadius:10 }}
                  >
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 16, padding: 16, background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.45)', color:'#fecaca', borderRadius:10 }}
                  >
                    Sorry, there was an error sending your message. Please try again or contact me directly at work.adityaajha@gmail.com
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
