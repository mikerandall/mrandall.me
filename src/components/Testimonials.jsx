import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const sectionRef = useRef(null)
  const testimonialRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        testimonialRefs.current.forEach((testimonial, index) => {
          if (testimonial) {
            gsap.fromTo(testimonial,
              { y: 30, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: testimonial,
                  start: 'top 88%',
                  toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.12,
                ease: 'power2.out'
              }
            )
          }
        })
        ScrollTrigger.refresh()
      }, sectionRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const testimonials = [
    {
      id: 1,
      quote: "Michael's ability to translate complex technical challenges into clear business solutions is exceptional. He took our legacy clinical trial platform and created a modernized MVP, which allowed us to secure the funding to make it happen.",
      author: "Director of Engineering",
      company: "WCG",
      context: "Clinical Trial Platform Modernization",
      highlight: "$10M+ funding secured"
    },
    {
      id: 2,
      quote: "Michael was instrumental in building out our development team. He led over 10 developers while managing relationships with 8 other applications—a complex integration requiring both technical and communication skills. His expertise helped align our team's strategy, and he cleared up process inefficiencies that had been holding us back.",
      author: "Director of Product",
      company: "Cigna",
      context: "Analytics Platform Leadership",
      highlight: "10+ developers led"
    },
    {
      id: 3,
      quote: "Finding someone who truly understands both the technical complexities of healthcare data AND how to build scalable systems is rare. Michael delivered exactly what we needed for our client's challenges.",
      author: "CTO",
      company: "Independent Connections",
      context: "EHR Integration & Data Normalization",
      highlight: "Multi-system interoperability"
    }
  ]

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="section-title">What Clients Say</h2>
          <p className="testimonials-intro">
            Feedback from healthcare technology leaders I've partnered with.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              ref={el => testimonialRefs.current[index] = el}
            >
              <div className="testimonial-quote-mark">"</div>
              
              <blockquote className="testimonial-quote">
                {testimonial.quote}
              </blockquote>
              
              <div className="testimonial-highlight">
                {testimonial.highlight}
              </div>
              
              <div className="testimonial-attribution">
                <div className="testimonial-author">
                  <span className="testimonial-name">{testimonial.author}</span>
                  <span className="testimonial-company">{testimonial.company}</span>
                </div>
                <span className="testimonial-context">{testimonial.context}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-cta">
          <p className="testimonials-cta-text">
            Ready to see similar results for your organization?
          </p>
          <button 
            className="testimonials-cta-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

