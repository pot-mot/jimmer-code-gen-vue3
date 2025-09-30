<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";

defineProps<{
    property: DeepReadonly<Property> | undefined
}>()
</script>

<template>
    <NameCommentViewer
        v-if="property"
        class="property-viewer"
        :data="property"
    />
    <span
        v-else
        class="property-viewer not-existed-info"
    >
        [Property not existed]
    </span>
</template>

<style scoped>
.property-viewer.not-existed-info {
    color: var(--danger-color);
}
</style>
