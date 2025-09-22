<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    mappedSuperClass: DeepReadonly<MappedSuperClass>
}>()
</script>

<template>
    <NameCommentViewer :data="mappedSuperClass"/>
</template>
