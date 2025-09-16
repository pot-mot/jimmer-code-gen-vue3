<script setup lang="ts">
defineProps<{
    mappedSuperClass: MappedSuperClassWithProperties
}>()
</script>

<template>
    <div>
        <input v-model="mappedSuperClass.name"/>
        <input v-model="mappedSuperClass.comment"/>
    </div>
</template>