<script setup lang="ts">
defineProps<{
    data: DeepReadonly<{ name: string, comment?: string }>,
    hideComment?: boolean
}>()
</script>

<template>
    <span class="name-comment-viewer">
        <span class="name" v-if="data.name">{{ data.name }}</span>
        <span class="warning-info" v-else>[Empty Name]</span>
        <span class="comment" v-if="data.comment && !hideComment">[{{ data.comment }}]</span>
    </span>
</template>

<style scoped>
.name-comment-viewer {
    white-space: nowrap;
}

.name-comment-viewer > .warning-info {
    color: var(--warning-color);
}


.name-comment-viewer > .comment {
    color: var(--comment-color);
    padding-left: 0.25em;
}
</style>
