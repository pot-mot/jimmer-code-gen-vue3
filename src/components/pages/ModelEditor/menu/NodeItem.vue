<script lang="ts" setup>
import {Node} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {computed, ref, watch} from "vue";
import {sendMessage} from "@/message/message.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const {GRAPH, SELECT, VIEW} = useModelEditorStore()

const table = ref<GenTableModelInput>()

watch(() => props.node, (node) => {
	try {
		table.value = node.getData()?.table

		node.on('change:data', () => {
			table.value = node.getData()?.table
		})
	} catch (e) {
		sendMessage('从 Node 获取 Table 失败', 'error', e)
	}
}, {immediate: true})

const handleClickLabel = (e: MouseEvent) => {
	if (e.ctrlKey) {
		SELECT.select(props.node.id)
	} else {
		VIEW.focus(props.node.id)
	}
}

const handleEdit = () => {
	ModelEditorEventBus.emit('editTable', {id: props.node.id, table: props.node.getData().table})
}

const handleDelete = () => {
	deleteConfirm(`表【${table.value?.name}】`, () => {
		ModelEditorEventBus.emit('removeTable', {id: props.node.id})
	})
}

const isSelected = computed(() => {
	return GRAPH.selectedNodeMap.has(props.node.id)
})
</script>

<template>
	<div v-if="table"
		 class="hover-show" :class="isSelected ? 'selected-menu-item' : ''">

		<el-text style="white-space: nowrap;">
			<TableIcon :type="table.type"></TableIcon>

			<el-button link @click="handleClickLabel">
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-button>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link type="warning" @click="handleEdit"></el-button>
			<el-button :icon="Delete" link type="danger" @click="handleDelete"></el-button>
		</span>
	</div>

	<div v-else>
		<el-text type="warning">
			{{ node.id }}
		</el-text>
	</div>
</template>
