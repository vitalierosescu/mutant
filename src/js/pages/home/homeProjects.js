import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import createScrollTrigger from '../../helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeProjects() {
  const wrap = document.querySelector('.home-project_list')

  const images = document.querySelectorAll('.home-project_wrap')

  const tl = gsap.timeline({ paused: true })

  tl.from(
    '.home-project_wrap',
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 2,
      stagger: {
        amount: 0.2,
      },
    },
    '-=0.5'
  )

  tl.from(
    '.home-project_img',
    {
      duration: 2,
      scale: 0.8,
      stagger: {
        amount: 0.2,
      },
    },
    0
  )
  createScrollTrigger(wrap, tl, 'top 88%')

  images.forEach(function (element) {
    let tl = gsap.timeline({ paused: true })

    tl.from(element.querySelectorAll('.home-project_img-hover'), {
      xPercent: 100,
      duration: 1.2,
      stagger: {
        amount: 0.2,
      },
    })

    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())
  })
}

export default homeProjects
