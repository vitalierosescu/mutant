import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Link timelines to scroll position
function createScrollTrigger(triggerElement, timeline, startAnimation) {
  // Reset tl when scroll out of view past bottom of screen
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top bottom',
    onLeaveBack: () => {
      timeline.progress(0)
      timeline.pause()
    },
  })
  // Play tl when scrolled into view (20% offset)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: startAnimation,
    onEnter: () => timeline.play(),
  })
}

export default createScrollTrigger
