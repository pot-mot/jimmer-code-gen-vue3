<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    embeddableType: DeepReadonly<EmbeddableType>
}>()
</script>

<template>
    <NameCommentViewer :data="embeddableType"/>
</template>
