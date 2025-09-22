<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    entity: DeepReadonly<Entity>
}>()
</script>

<template>
    <NameCommentViewer :data="entity"/>
</template>
