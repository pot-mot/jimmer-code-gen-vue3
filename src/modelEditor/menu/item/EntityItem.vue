<script setup lang="ts">
defineProps<{
    entity: EntityWithProperties
}>()
</script>

<template>
    <div>
        <input v-model="entity.name"/>
        <input v-model="entity.comment"/>
    </div>
</template>