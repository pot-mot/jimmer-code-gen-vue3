import {onUnmounted, readonly, ref, watch} from "vue";
import {createStore} from "@/utils/store/createStore.ts";
import {throttle} from "lodash-es";

const isTouchDevice = ref('ontouchstart' in window)
const visualHeight = ref(window.visualViewport ? Math.min(window.visualViewport.height, window.innerHeight) : window.innerHeight)
const visualTop = ref(0)
const visualLeft = ref(0)

watch(() => visualHeight.value, (value) => {
    const vh = value * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    document.documentElement.style.setProperty('--visual-height', `${value}px`)
}, {immediate: true})

watch(() => visualTop.value, (value) => {
    document.documentElement.style.setProperty('--visual-top', `${value}px`)
}, {immediate: true})

watch(() => visualLeft.value, (value) => {
    document.documentElement.style.setProperty('--visual-left', `${value}px`)
}, {immediate: true})

const handleResize = throttle(() => {
    // 通过动态属性修正 vh 在移动端的问题
    if (window.visualViewport) {
        visualHeight.value = Math.min(window.visualViewport.height, window.innerHeight)
    } else {
        visualHeight.value = window.innerHeight
    }
}, 200)

const handleScroll = async () => {
    // 通过动态属性修正元素聚焦等原因导致的 visualViewport scroll 问题
    for (let i = 0; i < 5; i++) {
        if (!window.visualViewport) return
        visualTop.value = window.visualViewport.offsetTop
        visualLeft.value = window.visualViewport.offsetLeft
        await new Promise(resolve => setTimeout(resolve, 5))
    }
}

export const initDeviceStore = () => {
    handleResize()
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize)
        window.visualViewport.addEventListener('scroll', handleScroll)
    }
    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', handleResize)
            window.visualViewport.removeEventListener('scroll', handleScroll)
        }
        window.removeEventListener('resize', handleResize)
    })
}

export const useDeviceStore = createStore(() => {
    return {
        isTouchDevice: readonly(isTouchDevice),
        visualHeight: readonly(visualHeight),
        visualTop: readonly(visualTop),
        visualLeft: readonly(visualLeft),
    }
})