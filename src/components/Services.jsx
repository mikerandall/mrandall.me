import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const serviceRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      serviceRefs.current.forEach((service, index) => {
        if (service) {
          gsap.from(service, {
            scrollTrigger: {
              trigger: service,
              start: 'top 85%',
            },
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: '🤖',
      title: 'AI & LLM Integration',
      description: 'Build intelligent AI-powered features for healthcare applications. From ReAct agents to RAG systems, I architect production-ready AI solutions that understand medical context.',
      highlights: ['LangChain agents', 'RAG systems', 'LLM fine-tuning', 'Vector databases']
    },
    {
      icon: '🎯',
      title: 'Technical Leadership',
      description: 'Strategic technology roadmaps, architecture reviews, and executive-level guidance to align your engineering with business goals.',
      highlights: ['Tech strategy & roadmaps', 'Architecture decisions', 'Vendor evaluation', 'Board presentations']
    },
    {
      icon: '🏥',
      title: 'Healthcare Compliance',
      description: 'Build HIPAA-compliant architecture from day one. Deep expertise in EHR/EMR systems, HL7, FHIR, and clinical trial data management.',
      highlights: ['HIPAA architecture', 'EHR/HL7/FHIR integration', 'PHI data handling', 'Compliance audits']
    },
    {
      icon: '🔄',
      title: 'Legacy Modernization',
      description: 'Transform aging systems into modern, cloud-native solutions. I\'ve replaced 30-year-old applications with platforms that secured $10M+ in funding.',
      highlights: ['System assessment', 'Migration planning', 'Risk mitigation', 'Incremental rollouts']
    },
    {
      icon: '👥',
      title: 'Team Building & Scaling',
      description: 'Recruit, mentor, and accelerate engineering teams. I\'ve scaled teams from 0 to 40+ developers while improving velocity 7x.',
      highlights: ['Hiring strategy', 'Team structure', 'Process optimization', 'Velocity improvement']
    },
    {
      icon: '☁️',
      title: 'Cloud & Infrastructure',
      description: 'Design scalable, cost-efficient cloud architecture on AWS or Azure. I\'ve reduced infrastructure costs by 30% while improving reliability.',
      highlights: ['AWS/Azure architecture', 'Cost optimization', 'DevOps & CI/CD', 'Security hardening']
    }
  ]

  const engagementModels = [
    {
      title: 'Advisory',
      hours: '5-10 hrs/month',
      description: 'Strategic guidance, architecture reviews, and on-call expertise for your leadership team.',
      best: 'Early-stage startups needing experienced guidance'
    },
    {
      title: 'Part-Time CTO',
      hours: '20-40 hrs/month',
      description: 'Hands-on technical leadership, team management, and active participation in your engineering org.',
      best: 'Growing companies building their engineering function'
    },
    {
      title: 'Project-Based',
      hours: 'Fixed scope',
      description: 'Targeted engagements for specific initiatives: migrations, audits, team builds, or fundraising prep.',
      best: 'Organizations with defined technical challenges'
    }
  ]

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">Fractional CTO Services</h2>
          <p className="services-intro">
            Get the strategic technology leadership your organization needs—without 
            the $300K+ salary. I work with startups, digital health systems, and insurance companies 
            to solve their toughest technical challenges.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              ref={el => serviceRefs.current[index] = el}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-highlights">
                {service.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="engagement-section">
          <h3 className="engagement-title">Engagement Models</h3>
          <p className="engagement-subtitle">Flexible arrangements designed to fit your needs and budget</p>
          
          <div className="engagement-grid">
            {engagementModels.map((model, index) => (
              <div key={index} className="engagement-card">
                <div className="engagement-header">
                  <h4 className="engagement-name">{model.title}</h4>
                  <span className="engagement-hours">{model.hours}</span>
                </div>
                <p className="engagement-description">{model.description}</p>
                <p className="engagement-best"><strong>Best for:</strong> {model.best}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services

