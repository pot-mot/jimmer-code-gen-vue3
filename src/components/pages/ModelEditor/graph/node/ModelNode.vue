<template>
	<div ref="wrapper" class="table-wrapper">
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
@import "../../../../../assets/node-common.css";
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref, watch} from "vue";
import {GenTableColumnsInput} from "@/api/__generated/model/static";
import {Graph, Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {ModelEditorEventBus} from "../../store/ModelEditorEventBus.ts";
import {sendMessage} from "@/utils/message.ts";
import {COLUMN_PORT_SELECTOR} from "@/components/business/graphEditor/constant.ts";
import {modelColumnToPort} from "./modelNode.ts";
import {useModelEditorStore} from "../../store/ModelEditorStore.ts";
import {dataToEdge, edgeToData} from "../edge/ModelEdge.ts";

const store = useModelEditorStore()

const wrapper = ref<HTMLElement | null>()

const container = ref<HTMLElement | null>()

const getGraph = inject<() => Graph>("getGraph")!

const getNode = inject<() => Node>("getNode")!;

const graph = ref<Graph>()

const node = ref<Node>()

const table = ref<GenTableColumnsInput>()

onMounted(async () => {
	graph.value = getGraph()

	node.value = getNode()

	if (!node.value) {
		sendMessage('Node 获取失败', 'error')
		return
	}

	// 绑定数据
	const setData = () => {
		if (!node.value) return
		table.value = node.value.getData().table
	}

	setData()

	await nextTick()

	if (!wrapper.value || !container.value) {
		sendMessage(`${table.value?.name}节点 dom 元素 ref 异常`, 'error')
		return
	}

	node.value.getData().wrapper = wrapper

	node.value.on('change:data', () => {
		setData()
	})

	// 更新尺寸
	const resizeNode = () => {
		if (!node.value || !container.value) return

		node.value.resize(container.value.clientWidth, container.value.clientHeight)
	}

	const wrapperResizeObserver = new ResizeObserver(() => {
		resizeNode()
	})

	wrapperResizeObserver.observe(container.value)

	const resizePort = () => {
		if (!node.value) return

		// 设置 ports 宽度
		for (let port of node.value.ports.items) {
			node.value.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, node.value.getSize().width)
		}
	}

	node.value.on('change:size', () => {
		resizePort()
	})

	resizeNode()

	// 根据数据更新更新 port 和 edge
	watch(() => table.value, () => {
		if (node.value && table.value && store.isLoaded) {
			const graph = store._graph()

			const edgeDatas = graph
				.getConnectedEdges(node.value.id)
				.map((edge) => edgeToData(edge))

			node.value.removePorts()
			node.value.addPorts(
				table.value.columns.map(modelColumnToPort)
			)
			resizePort()

			edgeDatas.forEach(data => {
				if (!data) return

				const edge = dataToEdge(graph, data)
				if (edge) {
					graph.addEdge(edge)
				}
			})
		}
	}, {deep: true})
})
</script>
