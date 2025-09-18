<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/viewer/NameCommentViewer.vue";

defineProps<{
    group: DeepReadonly<Group>
}>()
</script>

<template>
    <NameCommentViewer :data="group"/>
</template>
