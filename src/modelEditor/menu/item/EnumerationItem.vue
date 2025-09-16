<script setup lang="ts">
defineProps<{
    enumeration: Enumeration
}>()
</script>

<template>
    <div>
        <input v-model="enumeration.name"/>
        <input v-model="enumeration.comment"/>
    </div>
</template>