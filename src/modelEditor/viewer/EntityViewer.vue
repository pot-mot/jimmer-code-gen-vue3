<script setup lang="ts">
defineProps<{
    entity: DeepReadonly<Entity>
}>()
</script>

<template>
    <span>{{ entity.name }}</span>
    <span style="color: var(--comment-color)">/* {{ entity.comment }} */</span>
</template>
