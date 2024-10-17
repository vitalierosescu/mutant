import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)
const EASE = CustomEase.create(
  'hop',
  'M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 '
)
// Configuring GSAP with custom settings that aren't Tween-specific
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
})

// Setting default animation properties that should be inherited by ALL tweens
gsap.defaults({
  duration: 1.5,
  ease: EASE,
})

// Once the desired configurations are set, we simply export what we need to work with in the future.
export { EASE }
