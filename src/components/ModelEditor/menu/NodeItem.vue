<script setup lang="ts">
import {Node} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {ref, watch} from "vue";
import {sendMessage} from "../../../utils/message.ts";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const store = useModelEditorStore()

const name = ref("")

const comment = ref("")

watch(() => props.node, (node) => {
	try {
		name.value = node.getData().table.name
		comment.value = node.getData().table.comment

		node.on('change:data', () => {
			name.value = node.getData().table.name
			comment.value = node.getData().table.comment
		})
	} catch (e) {
		sendMessage('节点获取node数据异常', 'error')
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
	<div>
		<el-text class="hover-show" style="white-space: nowrap;">
			<TableIcon></TableIcon>

			<el-button @click="store.focus(node)" link>
				{{ name }}
				<Comment :comment="comment"></Comment>
			</el-button>

			<span style="padding-left: 0.5em;" class="hover-show-item">
				<el-button @click="handleEdit" title="编辑" :icon="EditPen" type="warning" link></el-button>
				<el-button @click="handleDelete" title="删除" :icon="Delete" type="danger" link></el-button>
			</span>
		</el-text>
	</div>
</template>

<style scoped>

</style>