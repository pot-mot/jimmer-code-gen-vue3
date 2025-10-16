<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {computed, ref, useTemplateRef} from "vue";
import {INHERIT_ENTITY} from "@/type/context/utils/AbstractAssociationToReal.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import LabelPositionEditor from "@/modelEditor/edge/labelPosition/LabelPositionEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";

const props = defineProps<EdgeProps<AbstractAssociationEdge["data"]>>()

const {contextData, focusEdge, remove, modelDiagnoseInfo} = useModelEditor()

const referencedAbstractEntity = computed(() => {
    return contextData.value.mappedSuperClassMap.get(props.data.edgedAssociation.association.mappedProperty.referencedAbstractEntityId)
})

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => {
        return undefined
    })
})

const associationEdit = ref(false)

const associationNameComment = computed({
    get: () => {
        return {
            name: props.data.edgedAssociation.association.nameTemplate,
            comment: props.data.edgedAssociation.association.commentTemplate,
        }
    },
    set: (value) => {
        props.data.edgedAssociation.association.nameTemplate = value.name
        props.data.edgedAssociation.association.commentTemplate = value.comment
    }
})

const mappedPropertyEdit = ref(false)

const mappedPropertyView = computed(() => {
    if (!referencedAbstractEntity.value) {
        return {
            name: props.data.edgedAssociation.association.mappedProperty.name.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
            comment: props.data.edgedAssociation.association.mappedProperty.comment.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
        }
    } else {
        return {
            name: props.data.edgedAssociation.association.mappedProperty.name.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.name}$`),
            comment: props.data.edgedAssociation.association.mappedProperty.comment.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.comment}$`),
        }
    }
})
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        ref="associationEdgeRef"
        class="association-association-edge"
    >
        <template #label>
            <div>
                <div style="display: flex; justify-content: center;">
                    <AssociationViewer
                        v-if="!associationEdit"
                        :association="data.edgedAssociation.association"
                        @click.stop="associationEdit = true"
                    />
                    <NameCommentEditor
                        v-else
                        v-model="associationNameComment"
                        class="with-border-bg"
                        auto-focus
                        @change="associationEdit = false"
                        @blur="associationEdit = false"
                        @click.stop
                    />
                </div>
                <DiagnoseViewer
                    :messages="modelDiagnoseInfo.associationMap.get(id)?.association"
                />
            </div>

            <div v-if="data.edgedAssociation.association.withMappedProperty">
                <div class="mapped-property-info">
                    <EntityIdViewer :id="data.edgedAssociation.association.referencedEntityId" hide-comment ctrl-focus/>
                    <span>.</span>
                    <NameCommentViewer
                        v-if="!mappedPropertyEdit"
                        :data="mappedPropertyView"
                        @click.stop="mappedPropertyEdit = true"
                    />
                    <NameCommentEditor
                        v-else
                        v-model="data.edgedAssociation.association.mappedProperty"
                        class="with-border-bg"
                        auto-focus
                        @change="mappedPropertyEdit = false"
                        @blur="mappedPropertyEdit = false"
                        @click.stop
                    />
                    <span style="padding-right: 0.5rem;">:</span>
                    <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">List<</span>
                    <span style="color: var(--comment-color);">$</span>
                    <MappedSuperClassViewer :mapped-super-class="referencedAbstractEntity" hide-comment ctrl-focus/>
                    <span style="color: var(--comment-color);">$</span>
                    <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">></span>
                </div>
                <DiagnoseViewer :messages="modelDiagnoseInfo.associationMap.get(id)?.mappedProperty"/>
            </div>
        </template>

        <template #toolbar>
            <div class="edge-toolbar">
                <button @click="focusEdge(id)">
                    <IconAim/>
                </button>

                <button @click="remove({associationIds: [id]})">
                    <IconDelete/>
                </button>
            </div>

            <LabelPositionEditor v-model="data.edgedAssociation.labelPosition" :get-path="getPath"/>
        </template>
    </AssociationEdge>
</template>

<style scoped>
.with-border-bg :deep(input:focus) {
    border: var(--border);
    border-radius: 0.25rem;
    background-color: var(--background-color);
}

.mapped-property-info {
    display: flex;
    justify-content: center;
    line-height: 2rem;
}
</style>
