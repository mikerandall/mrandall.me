import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const statsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        <h2 className="section-title">About</h2>
        
        <div className="about-content">
          <p className="about-text about-lead">
            I partner with healthcare organizations as a fractional CTO to solve their toughest 
            technology challenges—from clinical trial platforms to payer systems.
          </p>
          <p className="about-text">
            My track record speaks through results: <strong>millions of dollars in funding secured</strong> for products 
            I built, <strong>7x velocity improvements</strong> for engineering teams I led, and <strong>30% 
            infrastructure cost reductions</strong> through smart architecture decisions.
          </p>
          <p className="about-text">
            With deep expertise in <strong>Protected Health Information (PHI)</strong>, <strong>EHR/EMR 
            systems</strong>, <strong>HL7/CCDA standards</strong>, and <strong>clinical trial data</strong>, 
            I understand the unique compliance and integration challenges healthcare organizations face.
          </p>
        </div>

        <div className="trust-signals">
          <p className="trust-label">Trusted by teams at</p>
          <div className="trust-logos">
            <span className="trust-logo">Cigna</span>
            <span className="trust-logo">WCG</span>
            <span className="trust-logo">CGI</span>
            <span className="trust-logo">Diameter Health</span>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item" ref={el => statsRef.current[0] = el}>
            <div className="stat-number">25+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item" ref={el => statsRef.current[1] = el}>
            <div className="stat-number">40+</div>
            <div className="stat-label">Team Size Led</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item" ref={el => statsRef.current[2] = el}>
            <div className="stat-number">$10M+</div>
            <div className="stat-label">Funding Secured</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
