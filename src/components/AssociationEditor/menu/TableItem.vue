<script setup lang="ts">
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "../../../api/__generated/model/static";
import {useAssociationEditorStore} from "../store/AssociationEditorStore.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {TableEntityDialogEventBus} from "../eventBus/TableEntityDialogEventBus.ts";

const store = useAssociationEditorStore()

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps>()

const handleLoadAndFocus = async (id: number) => {
	await store.loadTable(id)
	store.focus(id)
}
</script>

<template>
	<el-text class="hover-show">
		<TableIcon :type="table.type"></TableIcon>

		<el-button @click="handleLoadAndFocus(table.id)" link>
			{{ table.name }}
			<Comment :comment="table.comment"></Comment>
		</el-button>

		<el-button @click="TableEntityDialogEventBus.emit('addTableEntityDialog', table.id)"
				   title="编辑" :icon="EditPen" type="warning" class="hover-show-item" link>
		</el-button>
	</el-text>
</template>