<template>
    <BaseIcon>
        <path class="primary-key-flag" d="M8 8a3 3 0 108 0 3 3 0 10-8 0M12 12l0 8 4 0m-4-4 3 0"/>
    </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/icons/BaseIcon.vue";
</script>

<style scoped>
.primary-key-flag {
    stroke: #dc971e;
}

.dark .primary-key-flag {
    stroke: #ffac1b;
}
</style>
