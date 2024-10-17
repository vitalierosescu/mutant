import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import heroScroll from './heroScroll'
import homeMarquee from './homeMarquee'
import homeProjects from './homeProjects'
import addSplitText from '../../features/addSplitText'
import loadingAnimation from '../../features/loadingAnimation'

gsap.registerPlugin(ScrollTrigger)

function home() {
  addSplitText()
  loadingAnimation()
  heroScroll()
  homeProjects()
  homeMarquee()
}

export default home
