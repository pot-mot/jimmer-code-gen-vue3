<script setup lang="ts">
defineProps<{
    property: DeepReadonly<Property>
}>()
</script>

<template>
    <span>{{ property.name }}</span>
    <span style="color: var(--comment-color)">/* {{ property.comment }} */</span>
</template>
