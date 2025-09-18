<script setup lang="ts">
defineProps<{
    data: DeepReadonly<{name: string, comment: string}>
}>()
</script>

<template>
    <span class="name" v-if="data.name">{{ data.name }}</span>
    <span class="comment" v-if="data.comment">/* {{ data.comment }} */</span>
</template>

<style scoped>
.name {
    padding-right: 0.5rem;
}

.comment {
    color: var(--comment-color)
}
</style>
