<script setup lang="ts">
defineProps<{
    data: DeepReadonly<{ name: string, comment: string }>
}>()
</script>

<template>
    <span class="name-comment-viewer">
        <span class="name" v-if="data.name">{{ data.name }}</span>
        <span class="comment" v-if="data.comment">/* {{ data.comment }} */</span>
    </span>
</template>

<style scoped>
.name-comment-viewer {
    white-space: nowrap;
}

.name-comment-viewer > .name {
    padding-right: 0.5rem;
}

.name-comment-viewer > .comment {
    color: var(--comment-color)
}

.selected .name-comment-viewer > .comment {
    color: inherit;
}
</style>
