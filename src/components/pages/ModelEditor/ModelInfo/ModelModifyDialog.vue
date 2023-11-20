<script lang="ts" setup>
import DragDialog from "@/components/global/DragDialog/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";

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
	<DragDialog :can-resize="true" :init-w="1200" :init-y="100" @close="emits('close')">
		<ModelForm :id="id" :table="table" @cancel="emits('close')" @submit="handleSubmit"></ModelForm>
	</DragDialog>
</template>