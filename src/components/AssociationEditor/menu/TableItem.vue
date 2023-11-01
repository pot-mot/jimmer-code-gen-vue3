<script setup lang="ts">
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "../../../api/__generated/model/static";
import {useAssociationEditorGraphStore} from "../store/AssociationEditorGraphStore.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import {processClickFunction} from "../../../utils/clickTimer.ts";
import Comment from "../../common/Comment.vue";
import {TableEntityDialogEventBus} from "../eventBus/TableEntityDialogEventBus.ts";

const store = useAssociationEditorGraphStore()

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps>()

const {
	click: loadTable,
	dblClick: loadTableAndFocus
} = processClickFunction(
	async (id: number) => {
		await store.loadTable(id)
		store.select(id)
	},
	async (id: number) => {
		await store.loadTable(id)
		store.focus(id)
	}
)
</script>

<template>
	<el-text class="hover-show">
		<TableIcon :type="table.type"></TableIcon>

		<el-button @click="loadTable(table.id)" @dblclick="loadTableAndFocus(table.id)" link>
			{{ table.name }}
			<Comment :comment="table.comment"></Comment>
		</el-button>

		<el-button @click="TableEntityDialogEventBus.emit('addTableEntityDialog', table.id)"
				   title="编辑" :icon="EditPen" type="warning" class="hover-show-item" link>
		</el-button>
	</el-text>
</template>