<template>
    <!-- https://tablericons.com/ list -->
    <BaseIcon>
        <path d="M1 12A1 1 0 0023 12 1 1 0 001 12" class="background"/>
        <path d="M16 7H9V17H16M9 12H16M2 12A1 1 0 0022 12 1 1 0 002 12" class="enumeration-flag"/>
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

.enumeration-flag {
    stroke: #A571E6;
}
</style>
