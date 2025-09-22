<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    property: DeepReadonly<Property>
}>()
</script>

<template>
    <NameCommentViewer :data="property"/>
</template>
