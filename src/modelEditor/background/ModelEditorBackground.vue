<script setup lang="ts">
import {computed} from 'vue'
import {ViewportTransform} from "@vue-flow/core";

const props = withDefaults(
    defineProps<{
        viewport: ViewportTransform,
        gapX?: number,
        gapY?: number,
    }>(),
    {
        gapX: 20,
        gapY: 20,
    }
)

const background = computed(() => {
    const zoom = props.viewport.zoom

    return {
        gapX: props.gapX * zoom,
        gapY: props.gapY * zoom,
        r: zoom,
    }
})
</script>

<template>
    <div class="vue-flow__background">
        <svg class="vue-flow__background_container">
            <pattern
                id="flow__background_pattern"
                :x="viewport.x % background.gapX"
                :y="viewport.y % background.gapY"
                :width="background.gapX"
                :height="background.gapY"
                patternUnits="userSpaceOnUse"
            >
                <circle :r="background.r" :cx="background.r" :cy="background.r" fill="var(--background-color-hover)"/>
            </pattern>

            <rect :x="-background.r" :y="-background.r" width="100%" height="100%" fill="url(#flow__background_pattern)"/>
        </svg>
    </div>
</template>

<style scoped>
.vue-flow__background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: var(--background-color);
    transition: background-color 0.5s;
}

.vue-flow__background_container {
    height: 100%;
    width: 100%;
}
</style>
