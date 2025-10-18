<script setup lang="ts">
defineProps<{
    value: string
}>()
</script>

<template>
    <div class="color-preview-wrapper">
        <div
            class="color-preview"
            :style="{ backgroundColor: value }"
        />
    </div>
</template>

<style scoped>
.color-preview-wrapper {
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: var(--border);
    vertical-align: middle;
    user-select: none;
}

.color-preview {
    width: 100%;
    height: 100%;
}
</style>