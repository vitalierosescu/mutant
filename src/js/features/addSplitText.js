import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function addSplitText() {
  let elementsToSplit = $('.split-lines')
  let instancesOfSplit = []
  // Split the text up
  function runSplit() {
    elementsToSplit.each(function (index) {
      let currentElement = $(this)
      instancesOfSplit[index] = new SplitType(currentElement, {
        types: 'lines, words',
      })
    })
    $('.line').each(function () {
      $(this).append("<div class='line-mask'></div>")
    })
  }
  runSplit()
  // Update on window resize
  let windowWidth = $(window).innerWidth()
  window.addEventListener('resize', function () {
    if (windowWidth !== $(window).innerWidth()) {
      windowWidth = $(window).innerWidth()
      elementsToSplit.each(function (index) {
        instancesOfSplit[index].revert()
      })
      runSplit()
      createAnimation()
    }
  })

  gsap.registerPlugin(ScrollTrigger)

  function createAnimation() {
    $('.line').each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top bottom',
          end: 'bottom center',
          scrub: 1,
        },
      })
      tl.to($(this).find('.line-mask'), {
        width: '0%',
        duration: 1,
      })
    })
  }
  createAnimation()

  const hoverText = () => {
    const spans = document.querySelectorAll('.quote-span')

    spans.forEach((span, index) => {
      span.addEventListener('mouseover', () => {
        console.log('mouse entered')
        gsap.to('.quote_img-wrap', {
          yPercent: `-${100 * index}`,
          duration: 0.8,
        })
        gsap.to('.quote_img-list', {
          y: `${6 * index}vh`,
          duration: 0.8,
        })
      })
    })
  }
  hoverText()
}

export default addSplitText
