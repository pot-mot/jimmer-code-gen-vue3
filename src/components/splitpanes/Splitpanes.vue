<script setup lang="ts">
import {h, ref, computed, onMounted, onBeforeUnmount, nextTick, provide, useSlots, watch} from 'vue'
import {
    type ChangedPanes,
    type DragInfo,
    injectKey,
    type Pane,
    type RequestUpdatePayload,
    type SplitpanesEmits,
    type SplitpanesProps
} from "@/components/splitpanes/splitPaneTypes.ts";

const emits = defineEmits<
    SplitpanesEmits
>()

const props = withDefaults(defineProps<
    SplitpanesProps
>(), {
    horizontal: false,
    pushOtherPanes: true,
    maximizePanes: true,
    rtl: false,
    firstSplitter: false,
    zoom: 1,
})

const slots = useSlots()
const panes = ref<Pane[]>([])
// Indexed panes by id (Vue's internal component uid) of Pane components for fast lookup.
// Every time a pane is destroyed this index is recomputed.
const indexedPanes = computed(() => panes.value.reduce((obj, pane) => (obj[pane.id] = pane) && obj, {} as {
    [key: number]: Pane
}))
const panesCount = computed(() => panes.value.length)

const containerEl = ref<HTMLElement | null>(null)
const ready = ref(false)
const touch = ref<{
    mouseDown: boolean,
    dragging: boolean,
    activeSplitter?: number,
    cursorOffset: number
}>({
    mouseDown: false,
    dragging: false,
    cursorOffset: 0 // Cursor offset within the splitter.
})
const splitterTaps = ref<{
    splitter?: number,
    timeoutId?: number
}>({ // Used to detect double click on touchSelection devices.
})

const splitpanesClasses = computed(() => ({
    [`splitpanes splitpanes--${props.horizontal ? 'horizontal' : 'vertical'}`]: true,
    'splitpanes--dragging': touch.value.dragging
}))

const getPanesData = () => {
    return panes.value.map(pane => ({
        id: pane.id,
        size: pane.size,
        min: pane.min,
        max: pane.max,
    }))
}

const getEventExtraData = (dataIndex: number | undefined = undefined): {
    index?: number,
    prevPane?: Pane,
    nextPane?: Pane
} => {
    const index: number | undefined = dataIndex ?? touch.value.activeSplitter
    if (index !== undefined) return {
        index,
        prevPane: panes.value[index - (props.firstSplitter ? 1 : 0)],
        nextPane: panes.value[index + (props.firstSplitter ? 0 : 1)],
    }
    return {}
}

// Methods.
// --------------------------------------------------------
const bindEvents = () => {
    document.addEventListener('mousemove', onMouseMove, {passive: false})
    document.addEventListener('mouseup', onMouseUp)

    // Passive: false to prevent scrolling while touchSelection dragging.
    if ('ontouchstart' in window) {
        document.addEventListener('touchmove', onMouseMove, {passive: false})
        document.addEventListener('touchend', onMouseUp)
    }
}

const unbindEvents = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    if ('ontouchstart' in window) {
        document.removeEventListener('touchmove', onMouseMove)
        document.removeEventListener('touchend', onMouseUp)
    }
}

const onMouseDown = (event: MouseEvent | TouchEvent, splitterIndex: number) => {
    if (!(event.target instanceof HTMLElement)) return

    // Store the cursor offset within the splitter to keep the cursor in the same position while dragging.
    const splitterEl = event.target.closest('.splitpanes__splitter')
    if (splitterEl) {
        const {left, top} = splitterEl.getBoundingClientRect()
        const clientPosition = (event instanceof TouchEvent) ? event.touches[0] : event
        if (!clientPosition) return
        const {clientX, clientY} = clientPosition
        touch.value.cursorOffset = props.horizontal ? (clientY - top) : (clientX - left)
    }

    bindEvents()
    touch.value.mouseDown = true
    touch.value.activeSplitter = splitterIndex
}

const onMouseMove = (event: MouseEvent | TouchEvent) => {
    if (touch.value.mouseDown) {
        // Prevent scrolling while touchSelection dragging (only works with an active event, eg. passive: false).
        event.preventDefault()
        touch.value.dragging = true
        requestAnimationFrame(() => {
            const dragInfo = getCurrentMouseDrag(event)
            if (!dragInfo) return
            calculatePanesSize(dragInfo)
            emits('resize', event, getPanesData())
        })
    }
}

const onMouseUp = (event: MouseEvent | TouchEvent) => {
    if (touch.value.dragging) {
        window.getSelection()?.removeAllRanges()
        const extraData = getEventExtraData()
        emits('resized', event, getPanesData(), extraData.index, extraData.prevPane, extraData.nextPane)
    }
    touch.value.mouseDown = false
    touch.value.activeSplitter = undefined
    // Keep dragging flag until click event is finished (click happens immediately after mouseup)
    // in order to prevent emitting `splitter-click` event if splitter was dragged.
    setTimeout(() => {
        touch.value.dragging = false
        unbindEvents()
    }, 100)
}

// If touchSelection device, detect double tap manually (2 taps separated by less than 500ms).
const onSplitterClick = (event: MouseEvent | TouchEvent, splitterIndex: number) => {
    if ('ontouchstart' in window) {
        event.preventDefault()

        // Detect splitter double taps.
        if (splitterTaps.value.splitter === splitterIndex) {
            clearTimeout(splitterTaps.value.timeoutId)
            splitterTaps.value.timeoutId = undefined
            onSplitterDblClick(event, splitterIndex)
            splitterTaps.value.splitter = undefined // Reset for the next tap check.
        } else {
            splitterTaps.value.splitter = splitterIndex
            // Store the fist tap and wait for the second one.
            splitterTaps.value.timeoutId = setTimeout(() => (splitterTaps.value.splitter = undefined), 500)
        }
    }

    if (!touch.value.dragging) {
        const {prevPane, nextPane} = getEventExtraData(splitterIndex)
        emits('splitter-click', event, getPanesData(), splitterIndex, prevPane, nextPane)
    }
}

// On splitter dbl click or dbl tap maximize this pane.
const onSplitterDblClick = (event: MouseEvent | TouchEvent, splitterIndex: number) => {
    const {prevPane, nextPane} = getEventExtraData(splitterIndex)
    emits('splitter-dblclick', event, getPanesData(), splitterIndex, prevPane, nextPane)

    if (props.maximizePanes) {
        let totalMinSizes = 0
        panes.value = panes.value.map((pane, i) => {
            pane.size = i === splitterIndex ? pane.max : pane.min
            if (i !== splitterIndex) totalMinSizes += pane.min

            return pane
        })
        const pane = panes.value[splitterIndex]
        if (!pane) return
        pane.size -= totalMinSizes
        emits('pane-maximize', event, getPanesData(), splitterIndex, pane)
        emits('resized', event, getPanesData(), splitterIndex, prevPane, nextPane)
    }
}

const onPaneClick = (event: MouseEvent | TouchEvent, paneId: number) => {
    const pane = indexedPanes.value[paneId]
    if (!pane) return
    emits('pane-click', event, getPanesData(), paneId, pane)
}

// Get the cursor position relative to the splitpanes container.
const getCurrentMouseDrag = (event: MouseEvent | TouchEvent): DragInfo | undefined => {
    if (!containerEl.value) return

    const rect = containerEl.value.getBoundingClientRect()
    const clientPosition = (event instanceof TouchEvent) ? event.touches[0] : event
    if (!clientPosition) return

    const {clientX, clientY} = clientPosition
    return {
        x: (clientX - (props.horizontal ? 0 : touch.value.cursorOffset)) - rect.left,
        y: (clientY - (props.horizontal ? touch.value.cursorOffset : 0)) - rect.top
    }
}

// Returns the drag percentage of the splitter relative to the container (ranging from 0 to 100%).
const getCurrentDragPercentage = (drag: DragInfo): number => {
    if (!containerEl.value) return 0
    let dragSize: number = drag[props.horizontal ? 'y' : 'x']
    // In the code below 'size' refers to 'width' for vertical and 'height' for horizontal layout.
    const containerSize = containerEl.value[props.horizontal ? 'clientHeight' : 'clientWidth'] * props.zoom
    if (props.rtl && !props.horizontal) dragSize = containerSize - dragSize

    return dragSize * 100 / containerSize
}

const calculatePanesSize = (drag: DragInfo) => {
    const splitterIndex = touch.value.activeSplitter
    if (splitterIndex === undefined) return

    let sums = {
        prevPanesSize: sumPrevPanesSize(splitterIndex),
        nextPanesSize: sumNextPanesSize(splitterIndex),
        prevReachedMinPanes: 0,
        nextReachedMinPanes: 0
    }

    const minDrag = 0 + (props.pushOtherPanes ? 0 : sums.prevPanesSize)
    const maxDrag = 100 - (props.pushOtherPanes ? 0 : sums.nextPanesSize)

    const dragPercentage = Math.max(Math.min(getCurrentDragPercentage(drag), maxDrag), minDrag)

    // If not pushing other panes, panes to resize are right before and right after splitter.
    let panesToResize: [number, number] = [splitterIndex, splitterIndex + 1]
    let paneBefore = panes.value[panesToResize[0]]
    let paneAfter = panes.value[panesToResize[1]]
    if (!paneBefore || !paneAfter) return

    const paneBeforeMaxReached = paneBefore.max < 100 && (dragPercentage >= (paneBefore.max + sums.prevPanesSize))
    const paneAfterMaxReached = paneAfter.max < 100 && (dragPercentage <= 100 - (paneAfter.max + sumNextPanesSize(splitterIndex + 1)))
    // Prevent dragging beyond pane max.
    if (paneBeforeMaxReached || paneAfterMaxReached) {
        if (paneBeforeMaxReached) {
            paneBefore.size = paneBefore.max
            paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
        } else {
            paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - sumNextPanesSize(splitterIndex + 1), 0)
            paneAfter.size = paneAfter.max
        }
        return
    }

    // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
    if (props.pushOtherPanes) {
        const vars = doPushOtherPanes(sums, dragPercentage)
        if (!vars) return // Prevent other calculation.

        ({sums, panesToResize} = vars)
        paneBefore = panes.value[panesToResize[0]]
        paneAfter = panes.value[panesToResize[1]]
    }

    if (paneBefore) {
        paneBefore.size = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max)
    }
    if (paneAfter) {
        paneAfter.size = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max)
    }
}

const doPushOtherPanes = (
    sums: {
        prevPanesSize: number,
        nextPanesSize: number,
        prevReachedMinPanes: number,
        nextReachedMinPanes: number
    },
    dragPercentage: number
) => {
    const splitterIndex = touch.value.activeSplitter
    if (splitterIndex === undefined) return
    const panesToResize: [number, number] = [splitterIndex, splitterIndex + 1]
    let paneBefore = panes.value[panesToResize[0]]
    let paneAfter = panes.value[panesToResize[1]]
    if (!paneBefore || !paneAfter) return

    // Pushing Down.
    // Going smaller than the current pane min size: take the previous expanded pane.
    if (dragPercentage < sums.prevPanesSize + paneBefore.min) {
        panesToResize[0] = findPrevExpandedPane(splitterIndex)!.index

        sums.prevReachedMinPanes = 0
        // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[0] < splitterIndex) {
            panes.value.forEach((pane, i) => {
                if (i > panesToResize[0] && i <= splitterIndex) {
                    pane.size = pane.min
                    sums.prevReachedMinPanes += pane.min
                }
            })
        }
        sums.prevPanesSize = sumPrevPanesSize(panesToResize[0])
        // If nothing else to push down, cancel dragging.
        if (panesToResize[0] === undefined) {
            const firstPane = panes.value[0]
            if (!firstPane) return

            sums.prevReachedMinPanes = 0
            firstPane.size = firstPane.min
            panes.value.forEach((pane, i) => {
                if (i > 0 && i <= splitterIndex) {
                    pane.size = pane.min
                    sums.prevReachedMinPanes += pane.min
                }
            })
            paneAfter.size = 100 - sums.prevReachedMinPanes - firstPane.min - sums.prevPanesSize - sums.nextPanesSize
            return null
        }
    }
    // Pushing Up.
    // Pushing up beyond min size is reached: take the next expanded pane.
    if (dragPercentage > 100 - sums.nextPanesSize - paneAfter.min) {
        panesToResize[1] = findNextExpandedPane(splitterIndex)!.index
        sums.nextReachedMinPanes = 0
        // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[1] > splitterIndex + 1) {
            panes.value.forEach((pane, i) => {
                if (i > splitterIndex && i < panesToResize[1]) {
                    pane.size = pane.min
                    sums.nextReachedMinPanes += pane.min
                }
            })
        }

        sums.nextPanesSize = sumNextPanesSize(panesToResize[1] - 1)
        // If nothing else to push up, cancel dragging.
        if (panesToResize[1] === undefined) {
            sums.nextReachedMinPanes = 0
            panes.value.forEach((pane, i) => {
                // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
                if (i < panesCount.value - 1 && i >= splitterIndex + 1) {
                    pane.size = pane.min
                    sums.nextReachedMinPanes += pane.min
                }
            })
            paneBefore.size = 100 - sums.prevPanesSize - sumNextPanesSize(panesToResize[0] - 1)
            return null
        }
    }

    return {sums, panesToResize}
}

const sumPrevPanesSize = (splitterIndex: number) => {
    return panes.value.reduce((total, pane, i) => total + (i < splitterIndex ? pane.size : 0), 0)
}

const sumNextPanesSize = (splitterIndex: number) => {
    return panes.value.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.size : 0), 0)
}

// Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
const findPrevExpandedPane = (splitterIndex: number): Pane | undefined => {
    return [...panes.value].reverse().find(p => (p.index < splitterIndex && p.size > p.min))
}

// Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
const findNextExpandedPane = (splitterIndex: number): Pane | undefined => {
    return panes.value.find(p => (p.index > splitterIndex + 1 && p.size > p.min))
}

const checkSplitpanesNodes = () => {
    const children = Array.from(containerEl.value?.children || [])
    for (const child of children) {
        const isPane = child.classList.contains('splitpanes__pane')
        const isSplitter = child.classList.contains('splitpanes__splitter')

        // Node is not a Pane or a splitter: remove it.
        if (!isPane && !isSplitter) {
            child.remove()
            console.warn('Splitpanes: Only <Pane> elements are allowed at the root of <Splitpanes>. One of your DOM nodes was removed.')
        }
    }
}

const addSplitter = (paneIndex: number, nextPaneNode: HTMLElement, isVeryFirst = false) => {
    const splitterIndex = paneIndex - 1
    const elm = document.createElement('div')
    elm.classList.add('splitpanes__splitter')

    if (!isVeryFirst) {
        elm.onmousedown = event => onMouseDown(event, splitterIndex)

        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
            elm.addEventListener('touchstart', event => onMouseDown(event, splitterIndex), {passive: true})
        }
        elm.onclick = event => onSplitterClick(event, splitterIndex + 1)
    }

    elm.ondblclick = event => onSplitterDblClick(event, splitterIndex + 1)

    nextPaneNode.parentNode?.insertBefore(elm, nextPaneNode)
}

const removeSplitter = (node: HTMLElement) => {
    node.onmousedown = null
    node.onclick = null
    node.ondblclick = null
    node.remove()
}

const redoSplitters = () => {
    const children = Array.from(containerEl.value?.children ?? [])
    for (const el of children) {
        if (el.className.includes('splitpanes__splitter') && el instanceof HTMLElement) {
            removeSplitter(el)
        }
    }
    let paneIndex = 0
    for (const el of children) {
        if (el.className.includes('splitpanes__pane') && el instanceof HTMLElement) {
            if (!paneIndex && props.firstSplitter) addSplitter(paneIndex, el, true)
            else if (paneIndex) addSplitter(paneIndex, el)
            paneIndex++
        }
    }
}

// Called by Pane component on programmatic resize.
const requestUpdate = ({uid, ...args}: RequestUpdatePayload) => {
    const pane = indexedPanes.value[uid]
    for (const [key, value] of Object.entries(args)) {
        // @ts-ignore
        pane[key] = value
    }
}

const onPaneAdd = (paneData: Omit<Pane, 'index'>) => {
    // 1. Add pane to array at the same index it was inserted in the <splitpanes> tag.
    let index = -1
    Array.from(containerEl.value?.children || []).some(el => {
        if (el.className.includes('splitpanes__pane')) index++
        return el.isSameNode(paneData.el)
    })

    const pane = {...paneData, index}
    panes.value.splice(index, 0, pane)
    // Redo indexes after insertion for other shifted panes.
    panes.value.forEach((p, i) => (p.index = i))

    if (ready.value) {
        nextTick(() => {
            // 2. Add the splitter.
            redoSplitters()

            // 3. Resize the panes (before pane-add so it will contain correct width).
            resetPaneSizes({addedPane: panes.value[index]})

            // 4. Fire `pane-add` event.
            emits('pane-add', pane, getPanesData())
        })
    }
}

const onPaneRemove = (uid: number) => {
    // 1. Remove the pane from array and redo indexes.
    const index = panes.value.findIndex(p => p.id === uid)
    if (index === -1) return
    const pane = panes.value[index]
    if (!pane) return
    pane.el = null // Prevent memory leaks.
    panes.value.splice(index, 1)[0]
    panes.value.forEach((p, i) => (p.index = i)) // Redo indexes after removal.

    nextTick(() => {
        // 2. Remove the splitter.
        redoSplitters()

        // 3. Fire `pane-remove` event.
        emits('pane-remove', pane, getPanesData())

        // 4. Resize the panes.
        resetPaneSizes({removedPane: {...pane, index}})
    })
}

const resetPaneSizes = (changedPanes: ChangedPanes = {}) => {
    if (!changedPanes.addedPane && !changedPanes.removedPane) initialPanesSizing()
    else if (panes.value.some(pane => pane.givenSize !== undefined || pane.min || pane.max < 100)) equalizeAfterAddOrRemove(changedPanes)
    else equalize()
    if (ready.value) emits('resized', undefined, getPanesData())
}

const equalize = () => {
    const equalSpace = 100 / panesCount.value
    let leftToAllocate = 0
    const ungrowable = []
    const unshrinkable = []

    for (const pane of panes.value) {
        pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

        leftToAllocate -= pane.size
        if (pane.size >= pane.max) ungrowable.push(pane.id)
        if (pane.size <= pane.min) unshrinkable.push(pane.id)
    }

    if (leftToAllocate > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

const initialPanesSizing = () => {
    let leftToAllocate = 100
    const ungrowable = []
    const unshrinkable = []
    let definedSizes = 0

    // Check if pre-allocated space is 100%.
    for (const pane of panes.value) {
        leftToAllocate -= pane.size
        if (pane.givenSize !== undefined) definedSizes++
        if (pane.size >= pane.max) ungrowable.push(pane.id)
        if (pane.size <= pane.min) unshrinkable.push(pane.id)
    }

    // Set pane sizes if not set.
    let leftToAllocate2 = 100
    if (leftToAllocate > 0.1) {
        for (const pane of panes.value) {
            if (pane.givenSize === undefined) {
                pane.size = Math.max(Math.min(leftToAllocate / (panesCount.value - definedSizes), pane.max), pane.min)
            }
            leftToAllocate2 -= pane.size
        }

        if (leftToAllocate2 > 0.1) readjustSizes(leftToAllocate2, ungrowable, unshrinkable)
    }
}

const equalizeAfterAddOrRemove = ({addedPane}: ChangedPanes = {}) => {
    let equalSpace = 100 / panesCount.value
    let leftToAllocate = 0
    const ungrowable = []
    const unshrinkable = []

    if (addedPane?.givenSize !== undefined) {
        equalSpace = (100 - addedPane.givenSize) / (panesCount.value - 1)
    }

    // Check if pre-allocated space is 100%.
    for (const pane of panes.value) {
        leftToAllocate -= pane.size
        if (pane.size >= pane.max) ungrowable.push(pane.id)
        if (pane.size <= pane.min) unshrinkable.push(pane.id)
    }

    if (Math.abs(leftToAllocate) < 0.1) return // Ok.

    for (const pane of panes.value) {
        const addedPaneHasGivenSize = addedPane?.givenSize !== null && addedPane?.id === pane.id
        if (!addedPaneHasGivenSize) pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

        leftToAllocate -= pane.size
        if (pane.size >= pane.max) ungrowable.push(pane.id)
        if (pane.size <= pane.min) unshrinkable.push(pane.id)
    }

    if (leftToAllocate > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

/* const recalculatePaneSizes = ({ addedPane, removedPane } = {}) => {
  let leftToAllocate = 100
  let equalSpaceToAllocate = leftToAllocate / panesCount.value
  let ungrowable = []
  let unshrinkable = []

  // When adding a pane with no size, apply min-size if defined otherwise divide another pane
  // (next or prev) in 2.
  // if (addedPane && addedPane.size === null) {
  //   if (addedPane.min) addedPane.size = addedPane.min
  //   else {
  //     const paneToDivide = panes.value[addedPane.index + 1] || panes.value[addedPane.index - 1]
  //     if (paneToDivide) {
  //       // @todo: Dividing that pane in 2 could be incorrect if becoming lower than its min size.
  //       addedPane.size = paneToDivide.size / 2
  //       paneToDivide.size /= 2
  //     }
  //   }
  // }

  panes.value.forEach((pane, i) => {
    // Added pane - reduce the size of the next pane.
    if (addedPane && addedPane.index + 1 === i) {
      pane.size = Math.max(Math.min(100 - sumPrevPanesSize(i) - sumNextPanesSize(i + 1), pane.max), pane.min)
      // @todo: if could not allocate correctly, try to allocate in the next pane straight away,
      // then still do the second loop if not correct.
    }

    // Removed pane - increase the size of the next pane.
    else if (removedPane && removedPane.index === i) {
      pane.size = Math.max(Math.min(100 - sumPrevPanesSize(i) - sumNextPanesSize(i + 1), pane.max), pane.min)
      // @todo: if could not allocate correctly, try to allocate in the next pane straight away,
      // then still do the second loop if not correct.
    }

    // Initial load and on demand recalculation.
    else if (!addedPane && !removedPane && pane.size === null) {
      pane.size = Math.max(Math.min(equalSpaceToAllocate, pane.max), pane.min)
    }

    leftToAllocate -= pane.size

    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

  // Do one more loop to adjust sizes if still wrong.
  // > 0.1: Prevent maths rounding issues due to bytes.
  if (Math.abs(leftToAllocate) > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
} */

// Second loop to adjust sizes now that we know more about the panes constraints.
const readjustSizes = (leftToAllocate: number, ungrowable: number[], unshrinkable: number[]) => {
    let equalSpaceToAllocate
    if (leftToAllocate > 0) equalSpaceToAllocate = leftToAllocate / (panesCount.value - ungrowable.length)
    else equalSpaceToAllocate = leftToAllocate / (panesCount.value - unshrinkable.length)

    panes.value.forEach((pane) => {
        if (leftToAllocate > 0 && !ungrowable.includes(pane.id)) {
            // Need to diff the size before and after to get the exact allocated space.
            const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
            const allocated = newPaneSize - pane.size
            leftToAllocate -= allocated
            pane.size = newPaneSize
        } else if (!unshrinkable.includes(pane.id)) {
            // Need to diff the size before and after to get the exact allocated space.
            const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
            const allocated = newPaneSize - pane.size
            leftToAllocate -= allocated
            pane.size = newPaneSize
        }
    })

    if (Math.abs(leftToAllocate) > 0.1) { // > 0.1: Prevent maths rounding issues due to bytes.
        // Don't emit on hot reload when Vue destroys panes.
        nextTick(() => {
            if (ready.value) {
                console.warn('Splitpanes: Could not resize panes correctly due to their constraints.')
            }
        })
    }
}

/* const distributeEmptySpace = () => {
  let growablePanes = []
  let collapsedPanesCount.value = 0
  let growableAmount = 0 // Total of how much the current panes can grow to fill blank space.
  let spaceToDistribute = 100 - panes.value.reduce((sum, pane) => (sum += pane.size) && sum, 0)
  // Do a first loop to determine if we can distribute the new blank space between all the
  // expandedPanes, without expanding the collapsed ones.
  panes.value.forEach(pane => {
    if (pane.size < pane.max) growablePanes.push(pane)

    if (!pane.size) collapsedPanesCount.value++
    else growableAmount += pane.max - pane.size
  })

  // If the blank space to distribute is too great for the expanded panes, also expand collapsed ones.
  let expandCollapsedPanes = growableAmount < spaceToDistribute

  // New space to distribute equally.
  let growablePanesCount.value = (growablePanes.length - (expandCollapsedPanes ? 0 : collapsedPanesCount.value))
  let equalSpaceToDistribute = spaceToDistribute / growablePanesCount.value
  // if (growablePanesCount.value === 1) equalSpace = 100 / panesCount.value
  let spaceLeftToDistribute = spaceToDistribute

  // Now add the equalSpaceToDistribute to each pane size accordingly.
  growablePanes.forEach(pane => {
    if (pane.size < pane.max && (pane.size || (!pane.size && expandCollapsedPanes))) {
      const newSize = Math.min(pane.size + equalSpaceToDistribute, pane.max)
      let allocatedSpace = (newSize - pane.size)
      spaceLeftToDistribute -= allocatedSpace
      pane.size = newSize
      // If the equalSpaceToDistribute is not fully added to the current pane, distribute the remainder
      // to the next panes.
      // Also fix decimal issue due to bites - E.g. calculating 8.33 and getting 8.3299999999999
      if (equalSpaceToDistribute - allocatedSpace > 0.1) equalSpaceToDistribute = spaceLeftToDistribute / (--growablePanesCount.value)
    }
  })

  /* Disabled otherwise will show up on hot reload.
  // if there is still space to allocate show warning message.
  if (panesCount.value && ~~spaceLeftToDistribute) {
    // eslint-disable-next-line no-console
    console.warn('Splitpanes: Could not distribute all the empty space between panes due to their constraints.')
  } *\/

  emitEvent('resized', { index: touchSelection.value.activeSplitter }, true)
} */

// Watchers.
// --------------------------------------------------------
watch(() => props.firstSplitter, () => redoSplitters())

onMounted(() => {
    checkSplitpanesNodes()
    redoSplitters()
    resetPaneSizes()
    ready.value = true
    emits('ready')
})

// Prevent emitting console warnings on hot reloading.
onBeforeUnmount(() => (ready.value = false))

const render = () => {
    return h(
        'div',
        {ref: containerEl, class: splitpanesClasses.value},
        slots.default?.()
    )
}

provide(injectKey.panes, panes)
provide(injectKey.indexedPanes, indexedPanes)
provide(injectKey.horizontal, computed(() => props.horizontal))
provide(injectKey.requestUpdate, requestUpdate)
provide(injectKey.onPaneAdd, onPaneAdd)
provide(injectKey.onPaneRemove, onPaneRemove)
provide(injectKey.onPaneClick, onPaneClick)
</script>

<template>
    <component :is="render"></component>
</template>

<style>
.splitpanes {
    display: flex;
    width: 100%;
    height: 100%;
}

.splitpanes--vertical {
    flex-direction: row;
}

.splitpanes--horizontal {
    flex-direction: column;
}

.splitpanes--dragging .splitpanes__pane,
*:has(.splitpanes--dragging) {
    user-select: none;
    pointer-events: none;
}

.splitpanes__splitter {
    touch-action: none;
}

.splitpanes--vertical > .splitpanes__splitter {
    min-width: 1px;
    cursor: col-resize;
}

.splitpanes--horizontal > .splitpanes__splitter {
    min-height: 1px;
    cursor: row-resize;
}

splitpanes__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.splitpanes--vertical .splitpanes__pane {
    will-change: width;
}

.splitpanes--horizontal .splitpanes__pane {
    will-change: height;
}

.splitpanes--dragging .splitpanes__pane {
    transition: none;
}
</style>
