<script setup lang="ts">
defineProps<{
    jvmLanguage: JvmLanguage | "ANY" | undefined
}>()
</script>

<template>
    <div v-if="jvmLanguage === 'KOTLIN'">Kotlin</div>
    <div v-else-if="jvmLanguage === 'JAVA'">Java</div>
    <div v-else-if="jvmLanguage === 'ANY'">[ANY]</div>
    <div v-else>[Unknown]</div>
</template>
