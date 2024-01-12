<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../form/table/TableForm.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";

interface TableDialogProps {
	id: string,
	table: GenTableModelInput
}

const props = defineProps<TableDialogProps>()

interface TableEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableEntityDialogEmits>()

const handleSubmit = (table: GenTableModelInput) => {
	if (props.id.length > 0) {
		ModelEditorEventBus.emit('modifiedTable', {id: props.id, table})
	} else {
		ModelEditorEventBus.emit('createdTable', table)
	}
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="1200" :init-h="600" :init-y="100" @close="emits('close')">
		<TableForm :id="id" :table="table" @cancel="emits('close')" @submit="handleSubmit"></TableForm>
	</DragDialog>
</template>
