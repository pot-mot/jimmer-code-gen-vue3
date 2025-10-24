<template>
    <BaseIcon>
        <path class="business-key-flag" d="M8 8a3 3 0 108 0 3 3 0 10-8 0M12 12l0 8 4 0m-4-4 3 0"/>
    </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/icons/BaseIcon.vue";
</script>

<style scoped>
.business-key-flag {
    stroke: #438f1d;
}

.dark .business-key-flag {
    stroke: #60ba32;
}
</style>
