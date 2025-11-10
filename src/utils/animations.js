import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fade in from bottom animation
export const fadeInUp = (element, options = {}) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger
    },
    ...options
  })
}

// Stagger animation for multiple elements
export const staggerFadeIn = (elements, options = {}) => {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger
    },
    ...options
  })
}

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: 50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

// Scale on scroll
export const scaleOnScroll = (element, options = {}) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger
    },
    ...options
  })
}

// Slide in from side
export const slideIn = (element, direction = 'left', options = {}) => {
  const xValue = direction === 'left' ? -100 : 100
  return gsap.from(element, {
    x: xValue,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options.scrollTrigger
    },
    ...options
  })
}

// Text reveal animation
export const revealText = (element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.05,
    ...options
  })
}

export default {
  fadeInUp,
  staggerFadeIn,
  parallax,
  scaleOnScroll,
  slideIn,
  revealText
}

