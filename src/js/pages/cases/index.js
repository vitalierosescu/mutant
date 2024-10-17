import gsap from 'gsap'

import addSplitText from '../../features/addSplitText'

function cases() {
  addSplitText()

  const imgWraps = document.querySelectorAll('.img-large_wrap')

  imgWraps.forEach((imgWrap) => {
    // const hero = document.querySelector('.section_case-hero')

    if (imgWrap) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: imgWrap,
          start: 'clamp(top bottom)',
          end: 'bottom top',
          scrub: true,
        },
      })

      tl.to(imgWrap, {
        // clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 90%)',
        y: '7.5rem',
      })
    }
  })
}

export default cases
