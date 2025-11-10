import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const projectRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            scrollTrigger: {
              trigger: project,
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

  const projects = [
    {
      title: 'HealthQuo.AI',
      description: 'AI-powered micronutrient management system with Disease Capability Fardels for CKD, Diabetes, and Hypertension. Features ReAct Agent with RAG, real-time recommendations, and HIPAA-compliant microservices architecture.',
      technologies: ['FastAPI', 'React', 'PostgreSQL', 'Docker', 'Mistral AI', 'Langchain', 'Qdrant', 'Redis'],
      link: 'https://healthquo.ai',
      year: '2025'
    },
    {
      title: 'Deathwink',
      description: 'Serverless web app allowing users to send posthumous messages. "Death can\'t stop you from getting the last word." Features automated lifecheck monitoring, scheduled message delivery, and secure file storage with one-time membership payments.',
      technologies: ['Angular 20', 'Node.js', 'AWS Lambda', 'PostgreSQL', 'Cognito', 'Stripe'],
      link: 'https://deathwink.com',
      year: '2025'
    }
  ]

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="section-title">Personal Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              ref={el => projectRefs.current[index] = el}
            >
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
