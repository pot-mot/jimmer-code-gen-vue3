<script setup lang="ts">
import DragDialog from "../common/dragDialog/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelEditorEventBus} from "../ModelEditor/eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "../../api/__generated/model/static";

interface ModelModifyDialogProps {
	id: string,
	table: GenTableColumnsInput
}

const props = defineProps<ModelModifyDialogProps>()

interface TableEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableEntityDialogEmits>()

const handleSubmit = (table: GenTableColumnsInput) => {
	ModelEditorEventBus.emit('modifiedTable', {id: props.id, table})
}
</script>

<template>
	<DragDialog @close="emits('close')" :can-resize="true" :init-y="100" :init-w="1200">
		<ModelForm :id="id" :table="table" @submit="handleSubmit" @cancel="emits('close')"></ModelForm>
	</DragDialog>
</template>