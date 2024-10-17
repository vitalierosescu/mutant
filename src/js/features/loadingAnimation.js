import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { EASE } from '../easings/easing'
EASE

gsap.registerPlugin(ScrollTrigger)

function loadingAnimation() {
  gsap.set('.nav_link', { yPercent: 100 })

  function splitTextIntoSpans(selector) {
    let elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      let text = element.innerText
      let splitText = text
        .split('')
        .map(function (char) {
          return `<span>${char === ' ' ? '&nbsp;&nbsp;' : char}</span>`
        })
        .join('')
      element.innerHTML = splitText
    })
  }
  splitTextIntoSpans('.hero_h1')

  function animateCounter() {
    const counterElement = document.querySelector('.counter p')
    let currentValue = 0
    const updateInterval = 300
    const maxDuration = 1000
    const endValue = 100
    const startTime = Date.now()

    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < maxDuration) {
        currentValue = Math.min(
          currentValue + Math.floor(Math.random() * 30) + 5,
          endValue
        )
        counterElement.textContent = currentValue
        setTimeout(updateCounter, updateInterval)
      } else {
        counterElement.textContent = endValue
        setTimeout(() => {
          gsap.to(counterElement, {
            y: -20,
            duration: 0.5,
            ease: 'power3.inOut',
            onStart: () => {
              revealLandingPage()
            },
          })
        }, -500)
      }
    }

    updateCounter()
  }

  gsap.to('.counter p', {
    y: 0,
    duration: 0.5,
    ease: 'power3.out',
    delay: 0.2,
    onComplete: () => {
      animateCounter()
    },
  })

  const revealLandingPage = () => {
    gsap.to('.section_hero', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 2,
      ease: EASE,
      onStart: () => {
        gsap.to('.section_hero', {
          transform: 'translate(-50%, -50%) scale(1)',
          duration: 2.25,
          ease: 'power3.inOut',
          delay: 0.25,
        })

        gsap.to('.hero_overlay', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 2,
          delay: 0.5,
          ease: EASE,
        })

        gsap.to('.hero_img', {
          transform: 'scale(1)',
          duration: 2.25,
          ease: 'power3.inOut',
          delay: 0.25,
        })
        gsap.to('.hero_img-wrap', {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 2,
          ease: 'power3.inOut',
          delay: 0.25,
        })

        gsap.to('.hero_h1 span', {
          y: 0,
          stagger: 0.1,
          duration: 2,
          ease: 'power4.inOut',
          delay: 0.75,
        })

        gsap.to('.nav_link', {
          yPercent: 0,
          stagger: 0.1,
          duration: 2,
          ease: 'power4.inOut',
          delay: 1,
        })
      },
    })
  }
}

export default loadingAnimation
