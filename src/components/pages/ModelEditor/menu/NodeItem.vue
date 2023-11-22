<script lang="ts" setup>
import {Node} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {ref, watch} from "vue";
import {sendMessage} from "@/utils/message.ts";
import {TableType} from "@/api/__generated/model/enums";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const store = useModelEditorStore()

const type = ref<TableType>("TABLE")

const name = ref("")

const comment = ref("")

watch(() => props.node, (node) => {
	try {
		type.value = node.getData().table.type
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
			<TableIcon :type="type"></TableIcon>

			<el-button link @click="store.focus(node)">
				{{ name }}
				<Comment :comment="comment"></Comment>
			</el-button>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
</template>

<style scoped>

</style>