<script setup lang="ts">
defineProps<{
    group: DeepReadonly<Group>
}>()
</script>

<template>
    <span>{{ group.name }}</span>
    <span style="color: var(--comment-color)">/* {{ group.comment }} */</span>
</template>
