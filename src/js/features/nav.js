export default function nav() {
  const sectionQuote = document.querySelector('.section_quote')
  const nav = document.querySelector('.nav_component')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the section is in view (even partially)
          nav.classList.add('is-active')
        } else if (entry.boundingClientRect.top < 0) {
          // When the section is completely passed
          nav.classList.add('is-past')
        } else {
          // Remove classes when not intersecting and not fully passed
          nav.classList.remove('is-active')
          nav.classList.remove('is-past')
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px -100% 0px' }
  )
  observer.observe(sectionQuote)
}
