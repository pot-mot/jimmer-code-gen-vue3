<script setup lang="ts">
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "../../../api/__generated/model/static";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import {TableDialogEventBus} from "../../../eventBus/TableDialogEventBus.ts";
import {processClickFunction} from "../../../utils/clickTimer.ts";
import {tableIdToNodeId} from "../node/TableNode.ts";

const store = useAssociationEditorGraphStore()

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps>()

const {
	click: loadTable,
	dblClick: loadTableAndFocus
} = processClickFunction(
	(id: number) => {
		store.loadTable(id)
	},
	async (id: number) => {
		await store.loadTable(id)
		await store.focus(tableIdToNodeId(id))
	}
)
</script>

<template>
	<el-text>
		<TableIcon></TableIcon>

		<el-button @click="loadTable(table.id)" @dblclick="loadTableAndFocus(table.id)" link>
			{{ table.name }} {{ table.comment }}
		</el-button>

		<el-button @click="TableDialogEventBus.emit('addTableDialog', table.id)" title="编辑" :icon="EditPen"
				   type="warning" link>
		</el-button>
	</el-text>
</template>