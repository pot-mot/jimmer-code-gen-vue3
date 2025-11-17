<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {computed, ref, useTemplateRef} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import LabelPositionEditor from "@/modelEditor/edge/tool/LabelPositionEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import {
    tmpl_fkComment,
    tmpl_fkName,
    tmpl_mappedPropertyComment,
    tmpl_mappedPropertyName
} from "@/type/context/utils/AssociationTemplate.ts";
import {useNameCommentTemplateModel} from "@/modelEditor/edge/templateEdit/useNameCommentTemplateModel.ts";

const props = defineProps<EdgeProps<AbstractAssociationEdge["data"]>>()

const {contextData, edgeToFront, focusEdge, remove, modelDiagnoseInfo} = useModelEditor()

const sourceAbstractEntity = computed(() => {
    return contextData.mappedSuperClassMap.get(props.data.edgedAssociation.association.sourceAbstractEntityId)
})
const sourceProperty = computed(() => {
    return sourceAbstractEntity.value?.properties.find(property => {
        return property.id === props.data.edgedAssociation.association.sourcePropertyId
    })
})

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => {
        return undefined
    })
})

const associationEdit = ref(false)

const associationNameCommentView = computed(() => {
    return {
        name: tmpl_fkName(
            props.data.edgedAssociation.association.nameTemplate,
            {name: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.name}$` : '[NOT_EXISTED]'},
            {name: sourceProperty.value ? sourceProperty.value.name : '[NOT_EXISTED]'}
        ),
        comment: tmpl_fkComment(
            props.data.edgedAssociation.association.commentTemplate,
            {comment: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.comment}$` : '[NOT_EXISTED]'},
            {comment: sourceProperty.value ? sourceProperty.value.comment : '[NOT_EXISTED]'}
        ),
    }
})

const associationNameCommentTemplate = useNameCommentTemplateModel(() =>
    props.data.edgedAssociation.association
)

const mappedPropertyEdit = ref(false)

const mappedPropertyNameCommentView = computed(() => {
    const mappedProperty = props.data.edgedAssociation.association.mappedProperty
    return {
        name: tmpl_mappedPropertyName(
            mappedProperty.nameTemplate,
            {name: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.name}$` : '[NOT_EXISTED]'},
            {name: sourceProperty.value ? `$${sourceProperty.value.name}$` : '[NOT_EXISTED]'}
        ),
        comment: tmpl_mappedPropertyComment(
            mappedProperty.commentTemplate,
            {comment: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.comment}$` : '[NOT_EXISTED]'},
            {comment: sourceProperty.value ? `$${sourceProperty.value.comment}$` : '[NOT_EXISTED]'}
        ),
    }
})

const mappedPropertyNameCommentTemplate = useNameCommentTemplateModel(() =>
    props.data.edgedAssociation.association.mappedProperty
)
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
                    <div class="foreign-key-info">
                        <NameCommentViewer
                            v-if="!associationEdit"
                            :data="associationNameCommentView"
                            @click.stop="edgeToFront(id)"
                            @dblclick.stop="associationEdit = true; "
                        />
                        <NameCommentEditor
                            v-else
                            v-model="associationNameCommentTemplate"
                            class="with-border-bg"
                            :font-size="12"
                            auto-focus
                            @change="associationEdit = false"
                            @blur="associationEdit = false"
                            @click.stop="edgeToFront(id)"
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
                        <span style="padding: 0 0.1rem;">.</span>
                        <NameCommentViewer
                            v-if="!mappedPropertyEdit"
                            :data="mappedPropertyNameCommentView"
                            @click.stop="edgeToFront(id)"
                            @dblclick.stop="mappedPropertyEdit = true; "
                        />
                        <NameCommentEditor
                            v-else
                            v-model="mappedPropertyNameCommentTemplate"
                            class="with-border-bg"
                            :font-size="12"
                            auto-focus
                            @change="mappedPropertyEdit = false"
                            @blur="mappedPropertyEdit = false"
                            @click.stop="edgeToFront(id)"
                        />
                        <span style="padding-right: 0.25rem;">:</span>
                        <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">List<</span>
                        <span style="color: var(--comment-color);">$</span>
                        <MappedSuperClassViewer :mapped-super-class="sourceAbstractEntity" hide-comment ctrl-focus/>
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

.foreign-key-info {
    display: flex;
    justify-content: center;
    line-height: 1.25rem;
    font-size: 14px;
}

.mapped-property-info {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.25rem;
    font-size: 12px;
}

.flex-center {
    display: flex;
    justify-content: center;
}
</style>
