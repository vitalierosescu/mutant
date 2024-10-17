import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'

gsap.registerPlugin(ScrollTrigger)

let clickCount = 0
let mm = gsap.matchMedia()
const toggleGridButton = document.querySelector('#toggle-grid-btn')
const cmsListItems = document.querySelectorAll('.cms-list-item')
const toggleElements = document.querySelectorAll(
  '.portfolio-list, .case_img-vid-wrp, .list-item-wrapper, .list-item-wrapper-2, .hover-out-text-grid, .cms-list-item_active, .cms_work-underline, .cms-list'
)
let gridIsOn = false

// Slider Functionality
$('.slider_wrap').each(function () {
  let childArrow = $(this).find('.slider_btn')
  let childItems = $(this).find('.slider_cms_item').hide()
  let childDot = $(this).find('.slider_dot_item').first()
  let totalSlides = childItems.length
  let activeIndex = 0

  childItems.first().css('display', 'flex').css('opacity', 1)
  gsap.set(childDot.find('.slider_dot_line'), { scaleX: 0 })

  // Dot Animation
  let tl2
  function startDotAnimation() {
    if (tl2) tl2.kill()
    gsap.set(childDot.find('.slider_dot_line'), { scaleX: 0 })
    tl2 = gsap.timeline({ onComplete: () => goNext(activeIndex + 1) })
    tl2.to(childDot.find('.slider_dot_line'), {
      scaleX: 1,
      duration: 10,
      ease: 'none',
      onComplete: startDotAnimation,
    })
  }

  function moveSlide(nextIndex) {
    let prevItem = childItems.eq(activeIndex).css('display', 'flex')
    let nextItem = childItems.eq(nextIndex).css('display', 'flex')

    let tl = gsap.timeline({ defaults: { duration: 0 } })
    tl.fromTo(prevItem, { opacity: 1 }, { opacity: 0 }, 0)
    tl.fromTo(nextItem, { opacity: 0 }, { opacity: 1 }, 0)

    activeIndex = nextIndex
    startDotAnimation()
  }

  function goNext(num) {
    let nextIndex = num
    if (nextIndex >= totalSlides) nextIndex = 0
    moveSlide(nextIndex, true)
  }

  // Arrow Click Handlers
  childArrow.filter('.is-next').on('click', () => goNext(activeIndex + 1))
  childArrow.filter('.is-prev').on('click', () => {
    let nextIndex = activeIndex - 1
    if (nextIndex < 0) nextIndex = totalSlides - 1
    moveSlide(nextIndex, false)
  })

  // Dot Click Handler
  childDot.on('click', function () {
    let dotIndex = $(this).index()
    if (activeIndex !== dotIndex) moveSlide(dotIndex, activeIndex < dotIndex)
  })

  startDotAnimation()
})

// const handlePlayState = () => {
//   const videos = document.querySelectorAll('.cms-list-item .cms_video')
//   if (!videos.length) return console.log('No videos found')

//   videos.forEach((video) => {
//     if (video instanceof HTMLVideoElement) {
//       video.addEventListener('mouseenter', () => video.play())
//       video.addEventListener('mouseleave', () => video.pause())
//     } else {
//       console.warn('Element is not a video:', video)
//     }
//   })
// }

// const handlePlayState = (reset) => {
//   console.log(reset)
//   const videos = document.querySelectorAll('.cms-list-item video')
//   if (!videos.length) return console.log('No videos found')

//   cmsListItems.forEach((item) => {
//     const video = item.querySelector('.cms_video')

//     if (video) {
//       // Function to set up event listeners when video is ready
//       const setupVideoEvents = () => {
//         if (gridIsOn) {
//           video.pause() // Pause initially if grid is on

//           const playVideo = () => {
//             if (video.paused) {
//               // Only play if the video is paused
//               video
//                 .play()
//                 .catch((err) => console.error('Error playing video:', err))
//             }
//           }

//           const pauseVideo = () => {
//             if (!video.paused) {
//               // Only pause if the video is playing
//               video.pause()
//             }
//           }

//           item.addEventListener('mouseenter', playVideo)
//           item.addEventListener('mouseleave', pauseVideo)

//           // Store the handlers so they can be removed later
//           item._playVideoHandler = playVideo
//           item._pauseVideoHandler = pauseVideo
//         } else {
//           // Properly remove the stored event listeners
//           item.removeEventListener('mouseenter', item._playVideoHandler)
//           item.removeEventListener('mouseleave', item._pauseVideoHandler)
//           if (video.paused) {
//             video
//               .play()
//               .catch((err) => console.error('Error playing video:', err)) // Play the video only if it's paused
//           }
//         }
//       }

//       // Check if the video has a source and is ready
//       if (video.readyState > 0) {
//         // Video has a source, setup event listeners immediately
//         setupVideoEvents()
//       } else {
//         // Wait for video to load metadata, but only for a maximum of 8 seconds
//         const timeoutId = setTimeout(() => {
//           console.log('Video did not load within 8 seconds:', video)
//         }, 8000) // 8 seconds

//         // Listen for when the video metadata is loaded
//         const onLoadedMetadata = () => {
//           clearTimeout(timeoutId) // Clear the timeout once metadata is loaded
//           setupVideoEvents() // Setup event listeners now that the video is ready
//         }

//         video.addEventListener('loadedmetadata', onLoadedMetadata)
//       }
//     } else {
//       console.log('Video element not found or has no valid source:', video)
//     }
//   })
// }

const toggleGridClass = () => {
  clickCount++
  clickCount % 2 !== 0 ? (gridIsOn = true) : (gridIsOn = false)
  addHoverAnimationDesktop()
  addMobileHoverAnimation()
  document.querySelectorAll('.projects_button-text').forEach((btn) => {
    btn.classList.toggle('is--active')
  })
  // handlePlayState()
  toggleElements.forEach((el) =>
    el.classList.toggle('is--grid', clickCount % 2 !== 0)
  )
  ScrollTrigger.refresh()
}

const addMobileHoverAnimation = () => {
  mm.add('(max-width: 991px)', () => {
    function updateImages(currentItem) {
      $('.cms-list-item').removeClass('is--active')
      currentItem.addClass('is--active')
    }

    $('.cms-list-item').each(function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => updateImages($(this)),
          onEnterBack: () => updateImages($(this)),
        },
      })
      if (clickCount > 0) {
        gsap.set($(this).find('.case_img-vid-wrp'), {
          xPercent: gridIsOn ? 0 : -50,
          yPercent: gridIsOn ? 0 : -100,
          opacity: gridIsOn ? 1 : 0,
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  })
}

/**
 *
 * Hover Interaction - DESKTOP
 *
 */

let targetX = 0,
  targetY = 0

// When mouse moves
const onMouseMove = (e) => {
  const videoWrap = e.currentTarget.querySelector('.case_img-vid-wrp')
  const rect = videoWrap.getBoundingClientRect()
  targetX = (e.clientX - rect.left - rect.width / 2) * 0.2
  targetY = (e.clientY - rect.top - rect.height / 2) * 0.2

  // Animate to new target positions
  gsap.to(videoWrap, {
    x: targetX,
    y: targetY,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

// When hovering over the item
const onMouseEnter = (e) => {
  const videoWrap = e.currentTarget.querySelector('.case_img-vid-wrp')
  const item = e.currentTarget
  gsap.to(videoWrap, { opacity: 1, duration: 0.1 })
  cmsListItems.forEach((otherItem) => {
    if (otherItem !== item) {
      gsap.to(otherItem.querySelector('.case_img-vid-wrp'), {
        opacity: 0,
        duration: 0.01,
      })
    }
  })
}

// When hovering out of the item
const onMouseLeave = (e) => {
  const videoWrap = e.currentTarget.querySelector('.case_img-vid-wrp')
  gsap.to(videoWrap, { opacity: 0, duration: 0.01, overwrite: 'auto' })
}

const removeHoverAnimationDesktop = (stoppedMatching) => {
  console.log('reset')
  cmsListItems.forEach((item) => {
    const videoWrap = item.querySelector('.case_img-vid-wrp')

    item.removeEventListener('mousemove', onMouseMove)
    item.removeEventListener('mouseenter', onMouseEnter)
    item.removeEventListener('mouseleave', onMouseLeave)

    targetX = 0
    targetY = 0
    if (stoppedMatching) {
      gsap.set(videoWrap, {
        xPercent: 0,
        yPercent: 0,
        opacity: gridIsOn ? 1 : 0,
      })
    } else {
      gsap.set(videoWrap, {
        xPercent: 0,
        yPercent: 0,
        opacity: gridIsOn ? 1 : 0,
      })
    }

    // Animate to new target positions
    gsap.to(videoWrap, {
      x: 0,
      y: 0,
      duration: 0,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.killTweensOf(videoWrap)
  })
}

const addHoverAnimationDesktop = () => {
  if (gridIsOn) {
    removeHoverAnimationDesktop()
    // return
  }
  mm.add('(min-width: 992px)', () => {
    // This function runs only on screens with a minimum width of 992px

    cmsListItems.forEach((item) => {
      const videoWrap = item.querySelector('.case_img-vid-wrp')
      gsap.set(videoWrap, {
        xPercent: 0,
        yPercent: 0,
        opacity: gridIsOn ? 1 : 0,
      })

      // Add event listeners
      if (!gridIsOn) {
        item.addEventListener('mousemove', onMouseMove)
        item.addEventListener('mouseenter', onMouseEnter)
        item.addEventListener('mouseleave', onMouseLeave)
      }
    })

    // Cleanup hover interaction when media query is no longer matched
    return () => {
      removeHoverAnimationDesktop(true)
    }
  })
}

const init = () => {
  console.log('lesgo')
  // handlePlayState()
  toggleGridButton.addEventListener('click', toggleGridClass)
  addMobileHoverAnimation()
  addHoverAnimationDesktop()

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh()
    // handlePlayState(true)
  })
}

init()