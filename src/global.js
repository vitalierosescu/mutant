import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'

import { EASE } from './js/easings/easing'
import nav from './js/features/nav'
import createScrollTrigger from './js/helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function global() {
  const titles = document.querySelectorAll('.tagline')
  const lines = document.querySelectorAll('.divider')

  titles.forEach((item) => {
    let tl = gsap.timeline({ paused: true })
    tl.from(
      item,
      {
        yPercent: 100,
        duration: 1.5,
        ease: EASE,
      },
      0
    )

    createScrollTrigger(item, tl, 'top bottom')
  })

  lines.forEach((item) => {
    let tl = gsap.timeline({ paused: true })
    tl.from(
      item,
      {
        scaleX: 0,
        duration: 2,
        ease: EASE,
      },
      0
    )

    createScrollTrigger(item, tl, 'top bottom')
  })

  // Function to animate the HERO
  const animateHero = () => {
    const hero = document.querySelector('.section_case-hero')

    if (hero) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: hero,
          start: 'clamp(top bottom)',
          end: 'bottom top',
          scrub: true,
        },
      })

      tl.to(hero, {
        yPercent: 30,
      })
    }
  }

  const animateFooter = () => {
    const footerWrap = document.querySelector('.footer_wrap')

    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: footerWrap,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .from('.footer_component', {
        yPercent: -70,
      })
  }

  const displayTime = () => {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    minutes = minutes < 10 ? '0' + minutes : minutes
    const suffix = hours >= 12 ? 'PM' : 'AM'
    if (hours === 0) {
      hours = 12 // Midnight case
    }
    const timeString = hours + ':' + minutes + ' ' + suffix
    document.getElementById('time').innerText = timeString
  }

  // const initSmoothScrolling = () => {
  //   // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
  //   const lenis = new Lenis({ lerp: 0.15 })

  //   // Sync ScrollTrigger with Lenis' scroll updates.
  //   lenis.on('scroll', ScrollTrigger.update)

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000) // Convert GSAP's time to milliseconds for Lenis.
  //   })
  //   gsap.ticker.lagSmoothing(0)
  // }

  const init = () => {
    // initSmoothScrolling()
    setInterval(displayTime, 1000)
    animateFooter()
    nav()
    animateHero()
  }
  init()
}

export default global
