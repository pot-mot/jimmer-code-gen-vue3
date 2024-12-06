<script setup lang="ts">
import {computed, ref} from "vue";

withDefaults(defineProps<{
    gap?: string,
    height?: string,
    items?: { name: string, span: string }[],
}>(), {
    gap: '0.2em',
    height: '2em'
})

const slots = defineSlots<{
    default(props: {}): any,
}>()

const spans = ref(<string[]>[])

const gridTemplateColumns = computed(() => {
    spans.value = []

    slots.default({}).forEach((item: any) => {
        if (item.type?.__name === "LineItem") {
            const span = item.props?.span ? item.props.span : item.type.props.span.default
            if (span) spans.value.push(span)
        } else if (item.type?.toString() === "Symbol(v-fgt)") {
            item.children.forEach((item: any) => {
                if (item.type.__name === "LineItem") {
                    const span = item.props?.span ? item.props.span : item.type.props.span.default
                    if (span) spans.value.push(span)
                }
            })
        }
    })

    return spans.value.join(" ")
})
</script>

<template>
    <div
        class="line-container"
        :style="{
            gridTemplateColumns,
            gridColumnGap: gap,
            height,
            lineHeight: height
        }">
        <slot/>
    </div>
</template>

<style scoped>
.line-container {
    display: grid;
    white-space: nowrap;
}
</style>
