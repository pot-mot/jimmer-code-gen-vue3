<script setup lang="ts">
defineProps<{
    mappedSuperClass: DeepReadonly<MappedSuperClass>
}>()
</script>

<template>
    <span>{{ mappedSuperClass.name }}</span>
    <span style="color: var(--comment-color)">/* {{ mappedSuperClass.comment }} */</span>
</template>
