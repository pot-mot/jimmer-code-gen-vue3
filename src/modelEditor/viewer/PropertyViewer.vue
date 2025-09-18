<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    property: DeepReadonly<Property>
}>()
</script>

<template>
    <NameCommentViewer :data="property"/>
</template>
