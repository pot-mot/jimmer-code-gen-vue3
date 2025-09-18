<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    entity: DeepReadonly<Entity>
}>()
</script>

<template>
    <NameCommentViewer :data="entity"/>
</template>
