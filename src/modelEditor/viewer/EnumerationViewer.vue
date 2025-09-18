<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    enumeration: DeepReadonly<Enumeration>
}>()
</script>

<template>
    <NameCommentViewer :data="enumeration"/>
</template>
