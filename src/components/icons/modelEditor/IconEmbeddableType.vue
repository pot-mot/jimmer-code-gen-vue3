<template>
    <BaseIcon>
        <path d="M1 5a4 4 0 014-4h14a4 4 0 014 4v14a4 4 0 01-4 4h-14a4 4 0 01-4-4v-14" class="background"/>
        <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"/>
        <path d="M3 10h18"/>
        <path d="M10 3v18"/>
        <path d="M16 15h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1" class="embeddable-type-flag"/>
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

.embeddable-type-flag {
    stroke: #3574F0;
    fill: var(--background-color);
}

.dark .embeddable-type-flag {
    stroke: #548AF7;
}
</style>
