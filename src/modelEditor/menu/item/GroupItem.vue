<script setup lang="ts">
import ColorInput from "@/components/color/ColorInput.vue";

defineProps<{
    group: Group
}>()
</script>

<template>
    <div>
        <input v-model="group.name"/>
        <input v-model="group.comment"/>
        <ColorInput v-model="group.color"/>
    </div>
</template>
