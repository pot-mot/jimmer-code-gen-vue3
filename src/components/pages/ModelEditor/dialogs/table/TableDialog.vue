<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import TableForm from "../../../../business/table/TableForm.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_CREATE_PREFIX} from "@/components/pages/ModelEditor/dialogs/table/TableDialogsStore.ts";
import {createIndexName} from "@/components/pages/ModelEditor/graph/nameTemplate/createIndexName.ts";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {DeepReadonly} from "vue";

const {GRAPH, MODEL} = useModelEditorStore()

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

const getSuperTable = () => {
	return GRAPH.nodes.filter(it => it.shape === TABLE_NODE).map(it => it.data.table).filter(it => it.type === "SUPER_TABLE")
}

const getEnums = () => {
	return MODEL._model().enums
}

const getOtherTables = () => {
	return GRAPH.nodes.filter(it => it.shape === TABLE_NODE && it.id !== props.id).map(it => it.data.table)
}

const validate = (table: DeepReadonly<GenTableModelInput>) => {
	return validateTable(
		table,
		getOtherTables(),
		getEnums()
	)
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="1200" :init-h="600" :init-y="100"
				@close="emits('close')" :modal="false">
		<TableForm
			:table="table"
			:get-super-tables="getSuperTable"
			:get-enums="getEnums"
			:validate="validate"
			:create-index-name="createIndexName"
			@create-enum="ModelEditorEventBus.emit('createEnum')"
			@edit-enum="({genEnum}) => ModelEditorEventBus.emit('editEnum', {id: genEnum.name, genEnum})"
			@cancel="emits('close')"
			@submit="handleSubmit"></TableForm>
	</DragDialog>
</template>
