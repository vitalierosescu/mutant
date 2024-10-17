import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'

gsap.registerPlugin(ScrollTrigger)

function heroScroll() {
  // get elements
  let component = $('.hero-scroll_component')
  let list = component.find('.hero-scroll_img-list')
  // set item total
  let itemTotal = list.children().length
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal)
  // create trigger divs & spacer
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first()
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component)
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']")
  firstTrigger.css('margin-top', '-100vh')

  let minWidth = 0
  let trMinWidth = component.attr('tr-min-width')
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth
  }
  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    function makeItemActive(activeIndex) {
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css('transform', `translateY(${activeIndex * -100}%)`)
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css('transform', `translateX(${activeIndex * -100}%)`)

      list.children().removeClass('is-active')
      list.children().eq(activeIndex).addClass('is-active')
    }
    makeItemActive(0)
    // scroll to trigger div on click of anchor
    let anchorLinks = component.find('[tr-anchors]').children()
    anchorLinks.on('click', function () {
      let myIndex = $(this).index()
      let scrollDistance =
        triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1
      $('html, body').animate({ scrollTop: scrollDistance })
    })
    // triggers timeline
    triggers.each(function (index) {
      let triggerIndex = index
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onToggle: ({ isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex)
            }
          },
        },
        defaults: {
          ease: 'none',
        },
      })

      let childItem = list.children().eq(triggerIndex)
      tl.to(childItem.find('.hero-scroll_img-overflow'), { scale: 0.6 }, 0)
      tl.to(childItem.find('.hero-scroll_img-photo'), { scale: 1 }, 0)
    })

    let tlH1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section_hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      defaults: {
        ease: 'none',
      },
    })

    tlH1.fromTo('.hero_svg', { x: '-20vw' }, { x: '20vw' })

    // smaller screen sizes
    return () => {
      // trSpacer.hide()
      component
        .find("[tr-scroll-toggle='transform-y']")
        .css('transform', 'translateY(0%)')
      component
        .find("[tr-scroll-toggle='transform-x']")
        .css('transform', 'translateX(0%)')

      list.children().removeClass('is-active')
    }
  })
}

export default heroScroll
