<script setup lang="ts">
defineProps<{
    embeddableType: EmbeddableTypeWithProperties
}>()
</script>

<template>
    <div>
        <input v-model="embeddableType.name"/>
        <input v-model="embeddableType.comment"/>
    </div>
</template>