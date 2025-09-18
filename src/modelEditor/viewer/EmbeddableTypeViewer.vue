<script setup lang="ts">
defineProps<{
    embeddableType: DeepReadonly<EmbeddableType>
}>()
</script>

<template>
    <span>{{ embeddableType.name }}</span>
    <span style="color: var(--comment-color)">/* {{ embeddableType.comment }} */</span>
</template>
