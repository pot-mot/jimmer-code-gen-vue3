<script lang="ts" setup>
import {Node} from '@antv/x6'
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "../store/ModelEditorEventBus.ts";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {computed, ref, watch} from "vue";
import {sendMessage} from "@/utils/message.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";

interface NodeItem {
	node: Node
}

const props = defineProps<NodeItem>()

const store = useModelEditorStore()

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
		store.select(props.node.id)
	} else {
		store.focus(props.node.id)
	}
}

const handleEdit = () => {
	ModelEditorEventBus.emit('modifyTable', {id: props.node.id, table: props.node.data.table})
}

const handleDelete = () => {
	ModelEditorEventBus.emit('removeTable', props.node.id)
}

const isSelected = computed(() => {
	return store.selectedNodeMap.has(props.node.id)
})
</script>

<style scoped>
.selected {
	background-color: rgba(220, 220, 220, 0.3);
}
</style>

<template>
	<div v-if="table"
		 class="hover-show" :class="isSelected ? 'selected' : ''">

		<el-text style="white-space: nowrap;">
			<TableIcon :type="table.type"></TableIcon>

			<el-button link @click="handleClickLabel">
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-button>
		</el-text>

		<span class="hover-show-item" style="padding-left: 0.5em;">
			<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
			<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
		</span>
	</div>

	<div v-else>
		<el-text type="warning">
			无效表 {{ node.id }}
		</el-text>
	</div>
</template>
