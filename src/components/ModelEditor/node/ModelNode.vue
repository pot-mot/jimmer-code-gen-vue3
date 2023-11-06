<template>
	<div class="table-wrapper" ref="wrapper">
		<table v-if="node && table" ref="container"
			   @dblclick="ModelEditorEventBus.emit('modifyTable', {id: node.id, table})">
			<tr class="tableName">
				<td colspan="2">
				<span class="icon">
					<TableIcon :type="table.type"></TableIcon>
				</span>
					<span>{{ table.name }}</span>
					<Comment :comment="table.comment"></Comment>
				</td>
			</tr>
			<tr v-for="column in table.columns" class="column">
				<td>
				<span class="icon">
					<ColumnIcon :column="column"></ColumnIcon>
				</span>
					<span>{{ column.name }}</span>
					<Comment :comment="column.comment"></Comment>
				</td>
				<td style="text-align: right;">
					<span class="type">{{ column.type }}</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
@import "../../../assets/node-common.css";
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {Node} from '@antv/x6'
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {sendMessage} from "../../../utils/message.ts";

const wrapper = ref<HTMLElement | null>()

const container = ref<HTMLElement | null>()

const getNode = inject<() => Node>("getNode")!;

const node = ref<Node>()

const table = ref<GenTableColumnsInput>()

onMounted(async () => {
	node.value = getNode()

	if (!node.value) {
		sendMessage('Node 获取失败', 'error')
		return
	}

	// 绑定数据
	table.value = node.value.getData().table

	node.value.on('change:data', () => {
		table.value = node.value!.getData().table
	})

	await nextTick()

	if (!wrapper.value || !container.value) {
		sendMessage(`${table.value?.name}节点 dom 元素 ref 异常`, 'error')
		return
	}

	node.value.getData().wrapper = wrapper

	// 响应式更新尺寸
	const resize = () => {
		if (!container.value) return
		node.value!.resize(container.value.clientWidth, container.value.clientHeight)
	}

	resize()

	const wrapperResizeObserver = new ResizeObserver(() => {
		resize()
	})

	wrapperResizeObserver.observe(container.value)
})
</script>
