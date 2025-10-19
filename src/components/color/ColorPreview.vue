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
    width: 1em;
    height: 1em;
    vertical-align: middle;
    user-select: none;
}

.color-preview {
    width: 100%;
    height: 100%;
    border: var(--border);
    border-radius: 3px;
}
</style>