import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-container">
        <span className="hero-eyebrow" ref={titleRef}>Available for Engagements</span>
        <h1 className="hero-title">
          Michael Randall
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Fractional CTO for Healthcare, Insurance, & Beyond
        </p>
        <p className="hero-description" ref={descRef}>
          I help healthcare startups and organizations modernize legacy systems, 
          build high-performing engineering teams, and ship HIPAA-compliant products—without 
          the full-time executive cost.
        </p>
        <div className="hero-ctas">
          <button className="hero-cta hero-cta-primary" onClick={scrollToContact}>
            Schedule a Consultation →
          </button>
          <button className="hero-cta hero-cta-secondary" onClick={scrollToServices}>
            View Services
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
