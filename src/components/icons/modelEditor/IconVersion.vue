<template>
    <BaseIcon>
        <path class="version-flag" d="M12 7l0 6 4 2M3.05 11A1 1 0 0022 11 1 1 0 003 11"/>
    </BaseIcon>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/icons/BaseIcon.vue";
</script>

<style scoped>
.version-flag {
    stroke: #3eb5ac;
}

.dark .version-flag {
    stroke: #38d8cc;
}
</style>

