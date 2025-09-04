<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";

const emits = defineEmits<{
    (event: "resize", size: {width: number, height: number}): void
}>()

const width = ref()
const height = ref()

const contentRef = useTemplateRef<HTMLDivElement>("contentRef")

const resizeOb = new ResizeObserver((entries) => {
    if (entries.length === 0) return

    width.value = entries[0].contentRect.width
    height.value = entries[0].contentRect.height

    emits("resize", {
        width: width.value,
        height: height.value,
    })
})

onMounted(() => {
    if (contentRef.value) {
        resizeOb.observe(contentRef.value)
    } else {
        throw new Error("contentRef undefined")
    }
})

onBeforeUnmount(() => {
    if (contentRef.value) {
        resizeOb.unobserve(contentRef.value)
    }
})
</script>

<template>
    <foreignObject :width="width" :height="height">
        <div xmlns="http://www.w3.org/1999/xhtml" ref="contentRef" style="width: fit-content; height: fit-content;">
            <slot/>
        </div>
    </foreignObject>
</template>
