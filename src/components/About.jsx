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
          <p className="about-text">
            Influential, trusted tech leader with extensive healthcare leadership in Startups 
            and Fortune 500 companies. As a Software Engineering Director & Senior Full Stack Engineer, 
            I bring expertise in diverse coding languages and cloud architectures.
          </p>
          <p className="about-text">
            Known for architecting quality solutions for healthcare and enterprise clients, managing 
            Protected Health Info (EHR) and Clinical Trial Data. My track record includes replacing 
            legacy apps, securing millions in funding, and significantly improving team velocity.
          </p>
          <p className="about-text">
            I excel at driving impactful initiatives with ambiguous requirements using a "get it done" 
            approach, leading large globally distributed teams, and ensuring stable code with consistent 
            releases in rapidly changing environments.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-item" ref={el => statsRef.current[0] = el}>
            <div className="stat-number">17+</div>
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
