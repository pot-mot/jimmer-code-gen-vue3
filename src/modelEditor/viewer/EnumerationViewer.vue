<script setup lang="ts">
defineProps<{
    enumeration: DeepReadonly<Enumeration>
}>()
</script>

<template>
    <span>{{ enumeration.name }}</span>
    <span style="color: var(--comment-color)">/* {{ enumeration.comment }} */</span>
</template>
