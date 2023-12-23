<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import ModelForm from "../../table/TableForm.vue";
import {ModelEditorEventBus} from "../../../pages/ModelEditor/store/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";
import {
	useTableCreateDialogStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableCreateDialogStore.ts";

const store = useTableCreateDialogStore()

const handleSubmit = (table: GenTableColumnsInput) => {
	ModelEditorEventBus.emit('createdTable', {table, x: store.nodeX, y: store.nodeY})
}
</script>

<template>
	<DragDialog v-model="store.dialogOpenState"
				:can-resize="true" :init-w="1200" :init-h="600" :init-y="100">
		<ModelForm @cancel="store.dialogOpenState = false" @submit="handleSubmit"></ModelForm>
	</DragDialog>
</template>
