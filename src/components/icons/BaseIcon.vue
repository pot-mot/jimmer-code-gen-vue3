<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
    color?: string,
    size?: string,
    height?: string,
    width?: string,
}>(), {
    size: "var(--icon-size)",
    color: "var(--icon-color)"
})

const computedHeight = computed(() => props.height ?? props.size)

const computedWidth = computed(() => props.width ?? props.size)
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="base-icon"
        :stroke="color"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        fill="none"
    >
        <slot/>
    </svg>
</template>

<style scoped>
.base-icon {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    height: v-bind(computedHeight);
    width: v-bind(computedWidth);
}
</style>
