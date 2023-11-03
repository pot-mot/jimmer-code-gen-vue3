<script setup lang="ts">
import {Node} from '@antv/x6'
import {useModelEditorGraphStore} from "../store/ModelEditorGraphStore.ts";
import {computed} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const name = computed(() => {
	return props.node.data.table.name
})

const comment = computed(() => {
	return props.node.data.table.comment
})

const store = useModelEditorGraphStore()

const handleEdit = () => {
	ModelEditorEventBus.emit('modifyTable', {id: props.node.id, table: props.node.data.table})
}

const handleDelete = () => {
	ModelEditorEventBus.emit('removeTable', props.node.id)
}
</script>

<template>
	<div>
		<el-text class="hover-show">
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