<script lang="ts" setup>
import {TableNodePair, useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {computed} from "vue";
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

const props = defineProps<TableNodePair>()

const tableDialogs = useTablesStore()

const {GRAPH, SELECT, VIEW} = useModelEditorStore()

const isSelected = computed(() => {
	return GRAPH.selectedNodeMap.has(props.node.id)
})

const handleClickLabel = (e: MouseEvent) => {
	if (e.ctrlKey) {
		SELECT.toggleSelect(props.node.id)
	} else {
		SELECT.unselectAll()
		VIEW.focus(props.node.id)
	}
    useEventTargetStore().target = {type: 'Table', tableNodePair: props}
}

const handleEdit = () => {
	tableDialogs.edit(props.node.id, props.table)
}

const handleDelete = () => {
    tableDialogs.remove(props)
}
</script>

<template>
	<div
		class="menu-item hover-show"
		:class="isSelected ? 'selected' : ''"
	>
		<el-text @click="handleClickLabel">
			<TableIcon :type="table.type"/>
			{{ table.name }}
			<Comment :comment="table.comment"/>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit"/>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"/>
		</span>
	</div>
</template>
