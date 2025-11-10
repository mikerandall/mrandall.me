import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
  const sectionRef = useRef(null)
  const [expandedCGI, setExpandedCGI] = useState(false)

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [expandedCGI])

  const cgiProjects = [
    {
      title: 'WCG - eReviewManager (Clinical Trial Platform)',
      period: 'April 2023 - Present',
      description: 'Built POC using FastAPI and Angular within 30 days, securing $10M+ funding. Led and managed team of 40+ developers. Architected real-time messaging with Azure Web PubSub and integrated Kafka for legacy system communication.',
      technologies: ['FastAPI', 'Angular', 'PostgreSQL', 'Azure', 'Docker', 'Kafka', 'Terraform']
    },
    {
      title: 'Cigna - Analytics Management Platform (AMP)',
      period: 'May 2022 - April 2023',
      description: 'Led team of 20+ developers building analytics portal for Cigna\'s provider networks. Improved team velocity from 10 to 70 points per sprint and reduced AWS costs by 30%. Formalized SDLC and CI/CD processes.',
      technologies: ['React', 'React UI', 'AWS', 'Node.js', 'CI/CD']
    },
    {
      title: 'Cigna - Contract Strategy ($90B Platform)',
      period: 'Nov 2020 - April 2022',
      description: 'Led team of 10+ developers building contract strategy tool handling $90B of Cigna\'s business. Architected application with AWS SNS/SQS for async updates and implemented real-time websocket communication for collaboration.',
      technologies: ['React', 'React UI', 'AWS', 'SNS', 'SQS', 'WebSockets', 'Jest']
    },
    {
      title: 'Cigna - Client Management Platform (CMP)',
      period: 'Jan 2020 - Nov 2020',
      description: 'Developed Story Builder combining analytics metrics into graphs and PowerPoint documents. Built AWS Lambda microservices using Sequelize with Postgres on RDS. Frontend developed in Angular 10 with Tailwind, Material UI, Bootstrap, and PrimeNg.',
      technologies: ['Angular', 'AWS Lambda', 'Sequelize', 'PostgreSQL', 'Tailwind', 'Material UI']
    },
    {
      title: 'Cigna - Client Access Platform (CAP)',
      period: 'May 2019 - Jan 2020',
      description: 'Provided tools allowing clients to build metrics without Data & Analytics requests. Users could build numerical or categorical metrics for Clinical, Financial, or Membership categories with custom conditions and actions.',
      technologies: ['Angular', 'Protractor', 'E2E Testing']
    }
  ]

  const otherExperiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Diameter Health',
      period: 'Aug 2017 - Sept 2018',
      highlights: [
        'Designed and implemented a de-duplication tool using Node.js and MongoDB to merge multiple EHRs into a unified patient record.',
        'Processed complex medical data formats, including CCDA and HL7, ensuring accurate and standardized health information.',
        'Built a React-based frontend interface, enabling users to interact seamlessly with consolidated medical records.'
      ]
    },
    {
      title: 'Senior Software Engineer / Team Lead',
      company: 'EXOS',
      period: 'Aug 2008 - Aug 2017',
      highlights: [
        'Led development of Exos\' digital platforms, including teamexos.com, athletesperformance.com, and coreperformance.com, while managing a team of engineers.',
        'Built and launched the MyCP platform as a solo developer, redesigning coreperformance.com with a custom JavaScript/AJAX interface that drove a 20% increase in membership.',
        'Created Ocelot, a prototype mobile app using Ionic and Angular, enabling Chromecast streaming of workouts in Exos Microgyms.',
        'Developed Exos Journey, a corporate wellness product used by major clients like Google, Intel, and Tesla, featuring interactive training programs, challenges, and educational content.',
        'Played a key role in digital innovation, helping evolve Exos\' offerings across mobile, web, and enterprise wellness platforms over nine years.'
      ]
    },
    {
      title: 'Senior Web Developer',
      company: 'WWE',
      period: 'Aug 2006 - Aug 2008',
      highlights: [
        'Developed and optimized high-traffic frontend features, including news interfaces, online voting platforms, and mobile alerts with media purchases.',
        'Reduced website load times by 60% through performance optimization and latency mitigation efforts.',
        'Modernized the WWE website by replacing Flash with HTML/CSS/JavaScript and integrating a Java-based CMS for streamlined content management.'
      ]
    }
  ]

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience-container">
        <h2 className="section-title">Experience</h2>

        {/* CGI - Expandable */}
        <div className="experience-item">
          <div className="experience-header">
            <div className="experience-main">
              <h3 className="experience-title">Director / Subject Matter Expert</h3>
              <div className="experience-company">CGI</div>
              <div className="experience-period">May 2019 - Present</div>
            </div>
          </div>

          <div className="cgi-overview">
            <ul className="cgi-highlights">
              <li>Led and scaled teams across multiple enterprise-level projects (up to 40+ developers), improving output and velocity while formalizing SDLC and CI/CD processes.</li>
              <li>Architected and delivered critical applications for both healthcare and clinical trial platforms using modern stacks like FastAPI, Angular, React, AWS, and Kafka.</li>
              <li>Successfully launched a $10M+ funded product (eReviewManager) for WCG, replacing legacy systems with a scalable, real-time web application.</li>
              <li>Cut infrastructure costs and improved engineering efficiency at Cigna by consolidating tools, improving team velocity, and reducing AWS spend by 30%.</li>
              <li>Implemented advanced tech solutions, including real-time collaboration via websockets, microservices with AWS Lambda, and role-based access control.</li>
            </ul>
          </div>

          <button 
            className="expand-button"
            onClick={() => setExpandedCGI(!expandedCGI)}
            aria-label={expandedCGI ? "Collapse projects" : "Expand projects"}
          >
            {expandedCGI ? '−' : '+'} {cgiProjects.length} Projects
          </button>

          <div className={`cgi-projects ${expandedCGI ? 'expanded' : ''}`}>
            {cgiProjects.map((project, index) => (
              <div key={index} className="cgi-project">
                <div className="project-header">
                  <h4 className="project-title">{project.title}</h4>
                  <div className="project-period">{project.period}</div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Experiences */}
        {otherExperiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div className="experience-main">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-company">{exp.company}</div>
                <div className="experience-period">{exp.period}</div>
              </div>
            </div>
            <ul className="experience-highlights">
              {exp.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
