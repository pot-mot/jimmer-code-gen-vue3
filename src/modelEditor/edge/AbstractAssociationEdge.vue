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
import LabelPositionEditor from "@/modelEditor/edge/tool/LabelPositionEditor.vue";
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

const mappedPropertyNameComment = computed(() => {
    const mappedProperty = props.data.edgedAssociation.association.mappedProperty
    if (!referencedAbstractEntity.value) {
        return {
            name: mappedProperty.name.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
            comment: mappedProperty.comment.replace(INHERIT_ENTITY, "[NOT EXISTED]"),
        }
    } else {
        return {
            name: mappedProperty.name.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.name}$`),
            comment: mappedProperty.comment.replace(INHERIT_ENTITY, `$${referencedAbstractEntity.value.comment}$`),
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
            <div class="association-label">
                <div
                    class="foreign-key-wrapper"
                    :class="{selected}"
                >
                    <div class="flex-center">
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
                    <div class="flex-center">
                        <DiagnoseViewer
                            :messages="modelDiagnoseInfo.associationMap.get(id)?.association"
                        />
                    </div>
                </div>

                <div
                    v-if="data.edgedAssociation.association.withMappedProperty"
                    class="mapped-property-wrapper"
                >
                    <div class="mapped-property-info">
                        <EntityIdViewer
                            :id="data.edgedAssociation.association.referencedEntityId"
                            hide-comment
                            ctrl-focus
                        />
                        <span>.</span>
                        <NameCommentViewer
                            v-if="!mappedPropertyEdit"
                            :data="mappedPropertyNameComment"
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
                    <div class="flex-center">
                        <DiagnoseViewer
                            :messages="modelDiagnoseInfo.associationMap.get(id)?.mappedProperty"
                        />
                    </div>
                </div>
            </div>
        </template>

        <template #toolbar>
            <div class="edge-toolbar">
                <button @click.stop="focusEdge(id)">
                    <IconAim/>
                </button>

                <button @click.stop="remove({associationIds: [id]})">
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

.association-label {
    box-sizing: border-box;
    border: var(--border);
    border-color: var(--border-color-light);
    border-width: 2px;
    border-radius: 0.25rem;
    background-color: var(--background-color);
    padding: 0 0.5rem;
    transition: border-color 0.2s;
}

.association-label:hover {
    border-color: var(--border-color);
}

.association-label.selected {
    border-color: var(--primary-color);
}

.mapped-property-info {
    display: flex;
    justify-content: center;
    line-height: 2rem;
}

.flex-center {
    display: flex;
    justify-content: center;
}
</style>
