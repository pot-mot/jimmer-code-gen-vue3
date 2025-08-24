<template>
    <div
        ref="paneEl"
        class="splitpanes__pane"
        @click="onPaneClick($event, uid)"
        :style="styles">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import {inject, computed, onMounted, onBeforeUnmount, watch, getCurrentInstance, useTemplateRef} from 'vue'
import {injectKey} from "@/components/splitpanes/splitPaneTypes.ts";

const props = withDefaults(defineProps<{
    size?: number | string
    minSize?: number | string
    maxSize?: number | string
}>(), {
    minSize: 0,
    maxSize: 100
})

const requestUpdate = inject(injectKey.requestUpdate)!
const onPaneAdd = inject(injectKey.onPaneAdd)!
const horizontal = inject(injectKey.horizontal)!
const onPaneRemove = inject(injectKey.onPaneRemove)!
const onPaneClick = inject(injectKey.onPaneClick)!

const uid = getCurrentInstance()!.uid
const indexedPanes = inject(injectKey.indexedPanes)!
const pane = computed(() => indexedPanes.value[uid])

const stringToNumber = (value: string | number) => {
    return typeof value === 'string' ? parseFloat(value) : value
}

const paneEl = useTemplateRef("paneEl")
const sizeNumber = computed(() => {
    let value = props.size === undefined ? 0 : stringToNumber(props.size)
    value = isNaN(value) ? 0 : value
    return Math.max(Math.min(value, maxSizeNumber.value), minSizeNumber.value)
})
const minSizeNumber = computed(() => {
    const value = stringToNumber(props.minSize)
    return isNaN(value) ? 0 : value
})
const maxSizeNumber = computed(() => {
    const value = stringToNumber(props.maxSize)
    return isNaN(value) ? 100 : value
})
const styles = computed(() => `${horizontal.value ? 'height' : 'width'}: ${pane.value?.size}%`)

watch(() => sizeNumber.value, size => requestUpdate({uid, size}))
watch(() => minSizeNumber.value, min => requestUpdate({uid, min}))
watch(() => maxSizeNumber.value, max => requestUpdate({uid, max}))

onMounted(() => {
    onPaneAdd({
        id: uid,
        el: paneEl.value,
        min: minSizeNumber.value,
        max: maxSizeNumber.value,
        // The given size (useful to know the user intention).
        givenSize: props.size === undefined ? undefined : sizeNumber.value,
        size: sizeNumber.value // The computed current size at any time.
    })
})

onBeforeUnmount(() => {
    onPaneRemove(uid)
})
</script>
