<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import AssociationForm from "@/components/business/association/AssociationForm.vue";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {DeepReadonly} from "vue";

const {GRAPH} = useModelEditorStore()

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

const validate = (association: DeepReadonly<GenAssociationModelInput>): string[] => {
	return validateAssociation(
		association,
		GRAPH.edges.filter(it => it.shape === ASSOCIATION_EDGE && it.id !== props.id).map(it => it.getData().association),
		GRAPH.nodes.filter(it => it.shape === TABLE_NODE).map(it => it.data.table)
	)
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="380" :init-y="200"
				@close="emits('close')">
		<AssociationForm
			:association="props.association"
			:validate="validate"
			:create-association-name="createAssociationName"
			@submit="handleSubmit"
			style="padding-top: 0.5em; padding-left: 1em;"></AssociationForm>
	</DragDialog>
</template>
