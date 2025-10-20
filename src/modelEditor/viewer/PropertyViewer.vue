<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    property: DeepReadonly<Property> | undefined
}>()

const nameComment = computed(() => {
    if (!props.property) return

    if ( "name" in props.property) {
        return {
            name: props.property.name,
            comment: props.property.comment,
        }
    } else {
        return {
            name: props.property.nameTemplate,
            comment: props.property.commentTemplate,
        }
    }
})
</script>

<template>
    <NameCommentViewer
        v-if="nameComment"
        class="property-viewer"
        :data="nameComment"
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
