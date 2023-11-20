<template>
	<div ref="wrapper" class="table-wrapper">
		<table v-if="table" ref="container"
			   @dblclick="TableDialogManagerEventBus.emit('openTable', table.id)">
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
@import "../../../../../assets/node-common.css";
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref} from "vue";
import {GenTableColumnsView} from "@/api/__generated/model/static";
import {Graph, Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {TableDialogManagerEventBus} from "../../TableInfo/TableDialogManagerEventBus.ts";
import {sendMessage} from "@/utils/message.ts";
import {COLUMN_PORT_SELECTOR} from "@/components/global/graphEditor/constant.ts";

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
