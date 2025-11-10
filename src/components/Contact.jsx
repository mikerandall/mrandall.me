import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'https://YOUR_API_ENDPOINT/prod/contact'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message || 'Thank you for your message! I\'ll get back to you soon.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again or email me directly at me@mrandall.me' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/michaelrandall' },
    { name: 'GitHub', url: 'https://github.com/mrandall' },
    { name: 'Email', url: 'mailto:michael@mrandall.me' },
    { name: 'Resume (PDF)', url: '/Michael-Randall-Resume.pdf' }
  ]

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-intro">
          Available for engineering leadership roles and consulting opportunities. 
          Let's discuss how I can help drive your next initiative.
        </p>

        <div className="contact-content">
          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="contact-link"
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.name} →
              </a>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus && (
              <div className={`form-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                disabled={isSubmitting}
                placeholder="Tell me about your project or opportunity..."
              ></textarea>
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-footer">
          <p>© 2025 Michael Randall. Engineering Leader.</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
