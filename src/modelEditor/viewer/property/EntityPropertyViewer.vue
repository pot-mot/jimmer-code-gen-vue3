<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {computed} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    entityId: string
    property: DeepReadonly<Property> | undefined
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

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

const {
    modelSelection,
    focusEntityProperty,
} = useModelEditor()

const handleFocus = () => {
    if (!props.property) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEntity(props.entityId)
    focusEntityProperty({entityId: props.entityId, propertyId: props.property.id})
}
</script>

<template>
    <NameCommentViewer
        v-if="nameComment"
        class="property-viewer"
        :data="nameComment"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
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

.ctrl-down .property-viewer.ctrl-focus:hover,
.ctrl-down .property-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
