<script setup lang="ts">
defineProps<{
    jvmLanguage: JvmSource | undefined
}>()
</script>

<template>
    <div v-if="jvmLanguage === 'KOTLIN'">Kotlin</div>
    <div v-else-if="jvmLanguage === 'JAVA'">Java</div>
    <div v-else-if="jvmLanguage === 'BOTH'">[BOTH]</div>
    <div v-else>[Unknown]</div>
</template>
