<template>
    <!-- https://tablericons.com/ table -->
    <BaseIcon>
        <path d="M1 5a4 4 0 014-4h14a4 4 0 014 4v14a4 4 0 01-4 4h-14a4 4 0 01-4-4v-14" class="background"/>
        <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"/>
        <path d="M3 10h18"/>
        <path d="M10 3v18"/>
    </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/icons/BaseIcon.vue";
</script>

<style scoped>
.background {
    fill: var(--background-color);
    stroke: none;
}
</style>
