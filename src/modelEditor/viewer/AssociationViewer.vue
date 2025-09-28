<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    association: DeepReadonly<AssociationIdOnly>
}>()
</script>

<template>
    <NameCommentViewer :data="association"/>
</template>
