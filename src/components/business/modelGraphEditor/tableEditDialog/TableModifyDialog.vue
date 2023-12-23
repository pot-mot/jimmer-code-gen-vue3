<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../table/TableForm.vue";
import {ModelEditorEventBus} from "../../../pages/ModelEditor/store/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";

interface TableModifyDialogProps {
	id: string,
	table: GenTableColumnsInput
}

const props = defineProps<TableModifyDialogProps>()

interface TableEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableEntityDialogEmits>()

const handleSubmit = (table: GenTableColumnsInput) => {
	ModelEditorEventBus.emit('modifiedTable', {id: props.id, table})
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="1200" :init-h="600" :init-y="100" @close="emits('close')">
		<TableForm :id="id" :table="table" @cancel="emits('close')" @submit="handleSubmit"></TableForm>
	</DragDialog>
</template>
