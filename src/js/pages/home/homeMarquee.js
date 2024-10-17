import gsap from 'gsap'
// import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeMarquee() {
  // let object = {
  //   value: 1,
  // }

  let tl = gsap.timeline({
    repeat: -1,
    onReverseComplete: () => {
      tl.progress(1)
    },
  })
  tl.fromTo(
    '.marquee_track',
    {
      xPercent: 0,
    },
    {
      xPercent: -50,
      duration: 30,
      ease: 'none',
    }
  )

  // Observer.create({
  //   target: window,
  //   type: 'wheel,scroll,touch',
  //   onChangeY: (self) => {
  //     let v = self.velocityY * 0.006
  //     v = gsap.utils.clamp(-60, 60, v)
  //     tl.timeScale(v)
  //     let resting = 1
  //     if (v < 0) {
  //       resting = -1
  //     }
  //     gsap.fromTo(
  //       object,
  //       { value: v },
  //       {
  //         value: resting,
  //         duration: 1,
  //         onUpdate: () => {
  //           tl.timeScale(object.value)
  //         },
  //       }
  //     )
  //   },
  // })
}

export default homeMarquee
