<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import AssociationForm from "@/components/business/association/AssociationForm.vue";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {ASSOCIATION_CREATE_PREFIX} from "@/store/modelEditor/AssociationDialogsStore.ts";

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const props = defineProps<{
    id: string,
    association: GenAssociationModelInput
}>()

const emits = defineEmits<{
    (event: "close", changed: boolean): void
}>()

const handleSubmit = (association: DeepReadonly<GenAssociationModelInput>) => {
    if (props.id.startsWith(ASSOCIATION_CREATE_PREFIX)) {
        MODEL_EDITOR.createdAssociation(props.id, association)
    } else {
        MODEL_EDITOR.editedAssociation(props.id, association)
    }
}

const validate = (association: DeepReadonly<GenAssociationModelInput>): MainLocaleKeyParam[] => {
    return validateAssociation(
        association,
        MODEL.associationEdges.filter(it => it.id !== props.id).map(it => it.getData().association),
        MODEL.tables,
    )
}
</script>

<template>
    <DragDialog
        :model-value="true" :can-resize="true"
        :init-w="800" :init-h="380" :init-y="200"
        @close="emits('close', false)"
    >
        <AssociationForm
            :association="props.association"
            :edge="MODEL.associationEdges.filter(it => it.id === props.id)[0]"
            :validate="validate"
            :create-association-name="createAssociationName"
            @submit="handleSubmit"
            @cancel="emits('close', false)"
            style="padding-top: 0.5em; padding-left: 1em;"/>
    </DragDialog>
</template>
