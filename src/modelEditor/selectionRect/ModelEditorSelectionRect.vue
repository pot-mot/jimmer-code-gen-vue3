<script setup lang="ts">
defineProps<{
    rect: {
        x: number,
        y: number,
        width: number,
        height: number
    } | null
}>()
</script>

<template>
    <div
        v-if="rect"
        class="selection-rect"
        :style="{
            left: rect ? rect.x + 'px' : '0',
            top: rect ? rect.y + 'px' : '0',
            width: rect ? rect.width + 'px' : '0',
            height: rect ? rect.height + 'px' : '0',
        }"
    />
</template>

<style scoped>
.selection-rect {
    position: absolute;
    border-radius: var(--border-radius);
    border-style: solid;
    border-color: var(--primary-color);
    background-color: var(--primary-color-opacity-background);
    padding: 1rem;
    transform: translateX(-1rem) translateY(-1rem);
}
</style>