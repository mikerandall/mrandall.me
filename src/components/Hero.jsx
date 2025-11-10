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

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-container">
        <h1 className="hero-title" ref={titleRef}>
          Michael Randall
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Engineering Leader
        </p>
        <p className="hero-description" ref={descRef}>
          Driving scalable web solutions in healthcare & enterprise.<br />
          17+ years leading teams, securing funding, and delivering results.
        </p>
        <button className="hero-cta" onClick={scrollToContact}>
          Get In Touch →
        </button>
      </div>
    </section>
  )
}

export default Hero
