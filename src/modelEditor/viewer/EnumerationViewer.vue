<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    enumeration: DeepReadonly<Enumeration>
}>()
</script>

<template>
    <NameCommentViewer :data="enumeration"/>
</template>
