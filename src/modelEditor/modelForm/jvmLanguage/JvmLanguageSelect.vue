<script setup lang="ts">
const jvmLanguage = defineModel<JvmLanguage>({
    required: true
})
</script>

<template>
    <select v-model="jvmLanguage">
        <option value="KOTLIN">Kotlin</option>
        <option value="JAVA">Java</option>
    </select>
</template>
