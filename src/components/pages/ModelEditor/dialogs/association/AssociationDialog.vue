<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import AssociationForm from "@/components/business/association/AssociationForm.vue";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {ASSOCIATION_CREATE_PREFIX} from "@/store/modelEditor/AssociationDialogsStore.ts";

const {MODEL} = useModelEditorStore()

const props = defineProps<{
    id: string,
    association: GenAssociationModelInput
}>()

const emits = defineEmits<{
    (event: "close"): void
}>()

const handleSubmit = (association: GenAssociationModelInput) => {
    if (props.id.startsWith(ASSOCIATION_CREATE_PREFIX)) {
        ModelEditorEventBus.emit('createdAssociation', {createKey: props.id, association})
    } else {
        ModelEditorEventBus.emit('editedAssociation', {id: props.id, association})
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
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="380" :init-y="200"
				@close="emits('close')">
		<AssociationForm
			:association="props.association"
            :edge="MODEL.associationEdges.filter(it => it.id === props.id)[0]"
			:validate="validate"
			:create-association-name="createAssociationName"
			@submit="handleSubmit"
			@cancel="emits('close')"
			style="padding-top: 0.5em; padding-left: 1em;"/>
	</DragDialog>
</template>
