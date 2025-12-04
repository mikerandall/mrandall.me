import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const skillRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      skillRefs.current.forEach((skill, index) => {
        if (skill) {
          const bar = skill.querySelector('.skill-progress')
          const targetWidth = bar.style.width

          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: skill,
                start: 'top 85%',
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'LangChain/LLM Integration', level: 90 },
        { name: 'RAG Systems', level: 92 },
        { name: 'Vector Databases (Qdrant)', level: 88 },
        { name: 'Model Fine-tuning (LoRA)', level: 85 }
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 93 },
        { name: 'FastAPI/Python', level: 90 },
        { name: 'PostgreSQL', level: 92 },
        { name: 'MongoDB', level: 88 }
      ]
    },
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Angular', level: 93 },
        { name: 'JavaScript/TypeScript', level: 98 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', level: 93 },
        { name: 'Azure', level: 88 },
        { name: 'Docker', level: 90 },
        { name: 'CI/CD', level: 92 }
      ]
    },
    {
      title: 'Leadership & Healthcare',
      skills: [
        { name: 'Team Leadership (40+)', level: 98 },
        { name: 'Healthcare/HIPAA', level: 92 },
        { name: 'Architecture Design', level: 95 },
        { name: 'Agile/SDLC', level: 95 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-item"
                    ref={el => skillRefs.current[catIndex * 10 + skillIndex] = el}
                  >
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
