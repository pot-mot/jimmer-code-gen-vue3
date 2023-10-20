<script setup lang="ts">
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "../../../api/__generated/model/static";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import {TableDialogEventBus} from "../../../eventBus/TableDialogEventBus.ts";

const store = useAssociationEditorGraphStore()

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps>()
</script>

<template>
	<el-text>
		<TableIcon></TableIcon>

		<el-button @click="store.loadTable(table.id)" link>
			{{ table.name }} {{ table.comment }}
		</el-button>

		<el-button @click="TableDialogEventBus.emit('addTableDialog', table.id)" title="编辑" :icon="EditPen"
				   type="warning" link>
		</el-button>
	</el-text>
</template>