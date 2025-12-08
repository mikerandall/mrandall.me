import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CaseStudies.css'

gsap.registerPlugin(ScrollTrigger)

const CaseStudies = () => {
  const sectionRef = useRef(null)
  const caseRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        caseRefs.current.forEach((caseStudy, index) => {
          if (caseStudy) {
            gsap.fromTo(caseStudy,
              { y: 40, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: caseStudy,
                  start: 'top 85%',
                  toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: index * 0.15,
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

  const caseStudies = [
    {
      id: 1,
      industry: 'Clinical Trials',
      title: 'Legacy Platform Replacement for Global IRB Provider',
      challenge: 'A leading institutional review board (IRB) provider needed to replace their 30-year-old clinical trial management system. The legacy platform was hindering growth, creating compliance risks, and couldn\'t support modern collaboration requirements.',
      solution: 'Built a proof-of-concept in 30 days demonstrating a modern, real-time web application. Architected the solution using FastAPI, Angular, and Azure services including Web PubSub for real-time collaboration. Integrated Kafka for legacy system communication during migration.',
      outcome: [
        '$10M+ funding secured based on POC',
        'Led team of 40+ developers through implementation',
        'Real-time collaboration replacing manual workflows',
        'Modernized architecture enabling future AI integration'
      ],
      technologies: ['FastAPI', 'Angular', 'PostgreSQL', 'Azure', 'Kafka', 'Terraform', 'Docker'],
      icon: '🧬'
    },
    {
      id: 2,
      industry: 'Health Insurance',
      title: 'Analytics Platform Transformation for Major Payer',
      challenge: 'A Fortune 50 health insurer\'s analytics team was struggling with slow development velocity (10 story points/sprint), high AWS costs, and fragmented tooling across their provider network analytics platform.',
      solution: 'Took over technical leadership of 20+ developers. Consolidated development tools, formalized SDLC processes, implemented CI/CD pipelines, and optimized AWS infrastructure. Mentored team on modern development practices.',
      outcome: [
        '7x velocity improvement (10 → 70 points/sprint)',
        '30% reduction in AWS infrastructure costs',
        'Standardized CI/CD across all services',
        'Improved team retention through mentorship'
      ],
      technologies: ['React', 'AWS', 'Node.js', 'CI/CD', 'CloudWatch'],
      icon: '📊'
    },
    {
      id: 3,
      industry: 'Health Insurance',
      title: '$90B Contract Strategy Platform',
      challenge: 'The same health insurer needed a new platform for managing $90B worth of provider contracts. Multiple teams needed to collaborate in real-time with strict role-based access controls and audit requirements.',
      solution: 'Architected a React-based application with WebSocket communication for real-time collaboration. Implemented granular role-based access controls, async updates via SNS/SQS, and comprehensive audit logging for compliance.',
      outcome: [
        'Handles $90B in contract negotiations',
        'Real-time multi-user collaboration',
        'Complete audit trail for compliance',
        'Scalable architecture for future growth'
      ],
      technologies: ['React', 'AWS', 'SNS/SQS', 'WebSockets', 'PostgreSQL'],
      icon: '📝'
    },
    {
      id: 4,
      industry: 'Healthcare Interoperability',
      title: 'Multi-EHR Patient Record Consolidation',
      challenge: 'Healthcare organizations needed to consolidate patient records from multiple EHR systems into unified views. Data arrived in various formats (CCDA, HL7) with duplicates, inconsistencies, and varying quality levels.',
      solution: 'Designed and built a de-duplication engine using Node.js and MongoDB that intelligently merged records from multiple EHRs. Processed complex medical data formats and normalized them into standardized patient records.',
      outcome: [
        'Unified patient view across multiple EHRs',
        'Automated de-duplication reducing manual work',
        'Standardized CCDA/HL7 data processing',
        'React interface for clinical staff'
      ],
      technologies: ['Node.js', 'MongoDB', 'React', 'HL7', 'CCDA', 'FHIR'],
      icon: '🏥'
    }
  ]

  return (
    <section id="case-studies" className="case-studies" ref={sectionRef}>
      <div className="case-studies-container">
        <div className="case-studies-header">
          <h2 className="section-title">Proven Results</h2>
          <p className="case-studies-intro">
            Real-world healthcare technology challenges I've solved. 
            Client names anonymized where required by NDA.
          </p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="case-study-card"
              ref={el => caseRefs.current[index] = el}
            >
              <div className="case-study-header">
                <span className="case-study-icon">{study.icon}</span>
                <span className="case-study-industry">{study.industry}</span>
              </div>
              
              <h3 className="case-study-title">{study.title}</h3>
              
              <div className="case-study-section">
                <h4 className="case-study-label">Challenge</h4>
                <p className="case-study-text">{study.challenge}</p>
              </div>
              
              <div className="case-study-section">
                <h4 className="case-study-label">Solution</h4>
                <p className="case-study-text">{study.solution}</p>
              </div>
              
              <div className="case-study-section">
                <h4 className="case-study-label">Outcome</h4>
                <ul className="case-study-outcomes">
                  {study.outcome.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="case-study-technologies">
                {study.technologies.map((tech, i) => (
                  <span key={i} className="case-study-tech">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies

