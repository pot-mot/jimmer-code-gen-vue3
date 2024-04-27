<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../form/table/TableForm.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_CREATE_PREFIX} from "@/components/pages/ModelEditor/dialogs/table/TableDialogsStore.ts";

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
	if (props.id.startsWith(TABLE_CREATE_PREFIX)) {
		ModelEditorEventBus.emit('createdTable', {id: props.id, table})
	} else {
		ModelEditorEventBus.emit('editedTable', {id: props.id, table})
	}
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="1200" :init-h="600" :init-y="100"
				@close="emits('close')" :modal="false">
		<TableForm :id="id" :table="table" @cancel="emits('close')" @submit="handleSubmit"></TableForm>
	</DragDialog>
</template>
