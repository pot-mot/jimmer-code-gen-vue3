<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import AssociationForm from "@/components/pages/ModelEditor/form/association/AssociationForm.vue";

interface AssociationDialogProps {
	id: string,
	association: GenAssociationModelInput
}

const props = defineProps<AssociationDialogProps>()

interface TableEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableEntityDialogEmits>()

const handleSubmit = (association: GenAssociationModelInput) => {
	ModelEditorEventBus.emit('editedAssociation', {id: props.id, association})
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="380" :init-y="200"
				@close="emits('close')">
		<AssociationForm :association="props.association" @submit="handleSubmit" style="padding-top: 0.5em; padding-left: 1em;"></AssociationForm>
	</DragDialog>
</template>
