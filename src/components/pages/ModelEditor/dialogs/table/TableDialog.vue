<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../../../business/table/TableForm.vue";
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_CREATE_PREFIX} from "@/store/modelEditor/TableDialogsStore.ts";
import {createIndexName} from "@/components/business/table/createIndexName.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {DeepReadonly} from "vue";

const {MODEL} = useModelEditorStore()

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
		ModelEditorEventBus.emit('createdTable', {createKey: props.id, table})
	} else {
		ModelEditorEventBus.emit('editedTable', {id: props.id, table})
	}
}

const getOtherTables = () => {
	return MODEL.tableNodePairs.filter(it => it.second.id !== props.id).map(it => it.first)
}

const validate = (table: DeepReadonly<GenTableModelInput>) => {
	return validateTable(
		table,
		getOtherTables(),
		MODEL.enums,
	)
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="1200" :init-h="600" :init-y="100"
				@close="emits('close')" :modal="false">
		<TableForm
			:table="table"
			:validate="validate"
			:create-index-name="createIndexName"
			@create-enum="ModelEditorEventBus.emit('createEnum')"
			@edit-enum="({genEnum}) => ModelEditorEventBus.emit('editEnum', {id: genEnum.name, genEnum})"
			@cancel="emits('close')"
			@submit="handleSubmit"/>
	</DragDialog>
</template>
