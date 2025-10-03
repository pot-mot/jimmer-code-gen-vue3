<script setup lang="ts">
defineProps<{
    data: DeepReadonly<{ name: string, comment?: string }>
}>()
</script>

<template>
    <span class="name-comment-viewer">
        <span class="name" v-if="data.name">{{ data.name }}</span>
        <span class="no-name-warning" v-else>[Empty Name]</span>
        <span class="comment" v-if="data.comment">[{{ data.comment }}]</span>
    </span>
</template>

<style scoped>
.name-comment-viewer {
    white-space: nowrap;
}

.name-comment-viewer .no-name-warning {
    color: var(--warning-color);
}


.name-comment-viewer > .comment {
    color: var(--comment-color);
    padding-left: 0.25em;
}
</style>
