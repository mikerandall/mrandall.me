import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const projectRefs = useRef([])

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        projectRefs.current.forEach((project, index) => {
          if (project) {
            gsap.fromTo(project, 
              { y: 30, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: project,
                  start: 'top 90%',
                  toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
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

  const featuredProject = {
    title: 'HealthQuo.AI',
    tagline: 'AI-Powered Healthcare Platform',
    description: 'A comprehensive AI health management system demonstrating advanced LLM integration, custom agent architecture, and HIPAA-compliant design patterns.',
    link: 'https://healthquo.ai',
    year: '2025',
    aiFeatures: [
      {
        title: 'ReAct Agent Architecture',
        description: 'Built a sophisticated Reasoning & Acting agent using LangChain that intelligently selects tools, maintains conversation memory, and provides structured medical responses with confidence scoring.'
      },
      {
        title: 'RAG System with Medical Knowledge',
        description: 'Implemented Retrieval-Augmented Generation using Qdrant vector database with 15+ medical documents, enabling evidence-based responses grounded in clinical guidelines.'
      },
      {
        title: 'Disease Capability Fardels',
        description: 'Designed a plugin-based system that automatically detects user health conditions and applies disease-specific overlays for CKD, Diabetes, and Hypertension management.'
      },
      {
        title: 'Fine-Tuned LLM with LoRA',
        description: 'Fine-tuned TinyLlama model using Low-Rank Adaptation (LoRA) for healthcare domain expertise, with quantization and caching optimizations for production inference.'
      }
    ],
    technologies: ['LangChain', 'Qdrant', 'TinyLlama', 'LoRA', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS']
  }

  const projects = [
    {
      title: 'Deathwink',
      tagline: '"Death can\'t stop you from getting the last word."',
      description: 'A fully serverless web application for sending posthumous messages. Users create "winks" with attachments (audio, video, documents) and designate recipients. Automated lifecheck monitoring triggers message delivery after 90 days of inactivity. Built with a complete AWS serverless architecture including scheduled Lambda workers, Stripe payments, and Cognito authentication.',
      technologies: ['Angular 20', 'NgRX Signals', 'Node.js 22', 'AWS Lambda', 'PostgreSQL', 'Drizzle ORM', 'Cognito', 'S3', 'SES', 'Stripe', 'SAM/CloudFormation'],
      link: 'https://deathwink.com',
      year: '2025'
    }
  ]

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="section-title">AI & Technical Projects</h2>

        {/* Featured AI Project */}
        <div className="featured-project" ref={el => projectRefs.current[0] = el}>
          <div className="featured-header">
            <div className="featured-meta">
              <span className="featured-badge">Featured AI Project</span>
              <span className="project-year">{featuredProject.year}</span>
            </div>
            <h3 className="featured-title">{featuredProject.title}</h3>
            <p className="featured-tagline">{featuredProject.tagline}</p>
            <p className="featured-description">{featuredProject.description}</p>
          </div>

          <div className="ai-features-grid">
            {featuredProject.aiFeatures.map((feature, index) => (
              <div key={index} className="ai-feature-card">
                <h4 className="ai-feature-title">{feature.title}</h4>
                <p className="ai-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="featured-footer">
            <div className="project-technologies">
              {featuredProject.technologies.map((tech, i) => (
                <span key={i} className="tech-badge">{tech}</span>
              ))}
            </div>
            <a href={featuredProject.link} className="project-link" target="_blank" rel="noopener noreferrer">
              View Project →
            </a>
          </div>
        </div>
        
        {/* Other Projects */}
        <h3 className="other-projects-title">Other Projects</h3>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              ref={el => projectRefs.current[index + 1] = el}
            >
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              {project.tagline && <p className="project-tagline">{project.tagline}</p>}
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
