<script lang="ts" setup>
import {Node} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {ref, watch} from "vue";
import {sendMessage} from "@/utils/message.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const store = useModelEditorStore()

const table = ref<GenTableColumnsInput>()

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

const handleEdit = () => {
	ModelEditorEventBus.emit('modifyTable', {id: props.node.id, table: props.node.data.table})
}

const handleDelete = () => {
	ModelEditorEventBus.emit('removeTable', props.node.id)
}
</script>

<template>
	<div v-if="table">
		<el-text class="hover-show" style="white-space: nowrap;">
			<TableIcon :type="table.type"></TableIcon>

			<el-button link @click="store.focus(node)">
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-button>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
	<div v-else>
		<el-text type="warning">
			无效表 {{ node.id }}
		</el-text>
	</div>
</template>
