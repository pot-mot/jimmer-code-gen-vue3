<template>
	<div class="table-wrapper" ref="wrapper">
		<table v-if="table" ref="container"
			   @dblclick="TableDialogEventBus.emit('openTable', table.id)">
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
import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Node, Graph} from '@antv/x6'
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {TableDialogEventBus} from "../../TableInfo/TableDialogEventBus.ts";
import {sendMessage} from "../../../utils/message.ts";
import {COLUMN_PORT_SELECTOR} from "../../../utils/graphEditor/constant.ts";

const wrapper = ref<HTMLElement | null>()

const container = ref<HTMLElement | null>()

const getGraph = inject<() => Graph>("getGraph")!

const getNode = inject<() => Node>("getNode")!

const graph = ref<Graph>()

const node = ref<Node>()

const table = ref<GenTableColumnsView>()

onMounted(async () => {
	graph.value = getGraph()

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

	node.value.on('change:size', () => {
		if (!node.value || !container.value) return

		const width = container.value.clientWidth

		// 设置 ports 宽度
		node.value.ports.items.forEach(port => {
			node.value!.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, width)
		})
	})

	await nextTick()

	if (!wrapper.value || !container.value) {
		sendMessage(`${table.value?.name}节点 dom 元素 ref 异常`, 'error')
		return
	}

	node.value.getData().wrapper = wrapper

	// 响应式更新尺寸
	const resize = () => {
		if (!graph.value || !node.value || !container.value) return

		node.value!.resize(container.value.clientWidth, container.value.clientHeight)
	}

	resize()

	const wrapperResizeObserver = new ResizeObserver(() => {
		resize()
	})

	wrapperResizeObserver.observe(container.value)
})
</script>
