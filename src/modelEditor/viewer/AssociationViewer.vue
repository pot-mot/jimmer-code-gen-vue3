<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import {
    translateAbstractFkCommentTemplate,
    translateAbstractFkNameTemplate,
    translateFkCommentTemplate,
    translateFkNameTemplate, translateMidTableCommentTemplate, translateMidTableNameTemplate
} from "@/type/context/utils/AssociationTemplate.ts";

const props = withDefaults(defineProps<{
    association: DeepReadonly<AssociationIdOnly> | undefined
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const {
    contextData,
    modelSelection,
} = useModelEditor()

const handleFocus = () => {
    if (!props.association) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectAssociation(props.association.id)
}

const associationNameComment = computed(() => {
    if (!props.association) return

    if (props.association.type === "OneToOne_Abstract" || props.association.type === "ManyToOne_Abstract") {
        const sourceAbstractEntity = contextData.value.mappedSuperClassMap.get(props.association.sourceAbstractEntityId)
        if (!sourceAbstractEntity) return
        const sourceProperty = sourceAbstractEntity.properties.find(it => it.id === props.association?.sourcePropertyId)
        if (!sourceProperty) return

        let name = translateAbstractFkNameTemplate(props.association.nameTemplate, sourceAbstractEntity, sourceProperty)
        let comment = translateAbstractFkCommentTemplate(props.association.commentTemplate, sourceAbstractEntity, sourceProperty)

        return {
            name,
            comment,
        }
    } else {
        const sourceEntity = contextData.value.entityMap.get(props.association.sourceEntityId)
        if (!sourceEntity) return
        const sourceProperty = sourceEntity.properties.find(it => it.id === props.association?.sourcePropertyId)
        if (!sourceProperty) return
        const referencedEntity = contextData.value.entityMap.get(props.association.referencedEntityId)
        if (!referencedEntity) return
        if (!("joinInfo" in sourceProperty)) return

        let name = props.association.name
        if (props.association.useNameTemplate) {
            if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
                name = translateFkNameTemplate(name, sourceEntity, sourceProperty)
            } else {
                name = translateMidTableNameTemplate(name, sourceEntity, referencedEntity)
            }
        }

        let comment = props.association.comment
        if (props.association.useCommentTemplate) {
            if (sourceProperty.joinInfo.type === "SingleColumn" || sourceProperty.joinInfo.type === "MultiColumn") {
                comment = translateFkCommentTemplate(comment, sourceEntity, sourceProperty)
            } else {
                comment = translateMidTableCommentTemplate(comment, sourceEntity, referencedEntity)
            }
        }

        return {
            name,
            comment,
        }
    }
})
</script>

<template>
    <NameCommentViewer
        class="association-viewer"
        v-if="associationNameComment"
        :data="associationNameComment"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="association-viewer not-existed-info"
    >
        [Association not existed]
    </span>
</template>

<style scoped>
.association-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .association-viewer.ctrl-focus:hover,
.ctrl-down .association-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
