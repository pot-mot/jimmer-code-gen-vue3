<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    mappedSuperClass: DeepReadonly<MappedSuperClass>
}>()
</script>

<template>
    <NameCommentViewer :data="mappedSuperClass"/>
</template>
