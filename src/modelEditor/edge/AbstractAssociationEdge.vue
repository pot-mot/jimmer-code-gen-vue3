<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {computed, ref} from "vue";
import {INHERIT_ENTITY} from "@/type/context/utils/AbstractAssociationToReal.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const props = defineProps<EdgeProps<AbstractAssociationEdge["data"]>>()

const {contextData} = useModelEditor()

const referencedAbstractEntity = computed(() => {
    return contextData.value.mappedSuperClassMap.get(props.data.association.mappedProperty.referencedAbstractEntityId)
})

const mappedPropertyInfo = computed(() => {
    if (!referencedAbstractEntity.value) {
        return {
            name: props.data.association.mappedProperty.name.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
            comment: props.data.association.mappedProperty.comment.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
        }
    } else {
        return {
            name: props.data.association.mappedProperty.name.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.name}$`),
            comment: props.data.association.mappedProperty.comment.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.comment}$`),
        }
    }
})

const associationEdit = ref(false)

const associationNameComment = computed({
    get: () => {
        return {
            name: props.data.association.nameTemplate,
            comment: props.data.association.commentTemplate,
        }
    },
    set: (value) => {
        props.data.association.nameTemplate = value.name
        props.data.association.commentTemplate = value.comment
    }
})
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        class="concrete-association-edge"
    >
        <template #label>
            <div style="display: flex; justify-content: center;">
                <AssociationViewer
                    v-if="!associationEdit"
                    :association="data.association"
                    @click="associationEdit = true"
                />
                <NameCommentEditor
                    v-else
                    v-model="associationNameComment"
                    class="with-border-bg"
                    auto-focus
                    @change="associationEdit = false"
                    @blur="associationEdit = false"
                />
            </div>
            <div style="display: flex; justify-content: center; line-height: 2.25rem;">
                <EntityIdViewer :id="data.association.referencedEntityId" hide-comment ctrl-focus/>
                <span>.</span>
                <NameCommentViewer :data="mappedPropertyInfo"/>
                <span style="padding-right: 0.5rem;">:</span>
                <span v-if="data.association.mappedProperty.typeIsList">List<</span>
                <span style="color: var(--comment-color);">$</span>
                <MappedSuperClassViewer :mapped-super-class="referencedAbstractEntity" hide-comment ctrl-focus/>
                <span style="color: var(--comment-color);">$</span>
                <span v-if="data.association.mappedProperty.typeIsList">></span>
            </div>
        </template>
    </AssociationEdge>
</template>

<style scoped>
.with-border-bg :deep(input:focus) {
    border: var(--border);
    border-radius: 0.25rem;
    background-color: var(--background-color);
}
</style>
