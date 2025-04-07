<script lang="ts" setup>
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {computed} from "vue";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {Node} from "@antv/x6";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	node: UnwrapRefSimple<Node>,
	table: GenTableModelInput
}>()

const tableDialogs = useTableDialogsStore()

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
}

const handleEdit = () => {
    tableDialogs.edit(props.node.id, props.table)
}

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate("LABEL_DeleteTarget_Enum")}【${props.table.name}】`, () => {
        tableDialogs.remove(props.node.id)
	})
}

const handleContextMenu = (e: MouseEvent) => {
	if (props.table && props.node) {
		e.preventDefault()
		e.stopPropagation()
		useModelEditorContextMenuStore().open(
			{x: e.pageX, y: e.pageY},
			{type: 'Table', tableNodePair: {first: props.table, second: props.node}}
		)
	}
}
</script>

<template>
	<div v-if="table"
		 class="menu-item hover-show" :class="isSelected ? 'selected' : ''"
		 @contextmenu="handleContextMenu"
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

	<div v-else>
		<el-text type="warning">{{ node.id }}</el-text>
	</div>
</template>
