<script setup lang="ts">
import DragDialog from "../../common/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "../../../api/__generated/model/static";

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
	<DragDialog :can-resize="true" :y="100" :init-w="1000" @close="emits('close')">
		<ModelForm :table="table" @submit="handleSubmit"></ModelForm>
	</DragDialog>
</template>