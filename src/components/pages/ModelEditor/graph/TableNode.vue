<template>
	<div ref="wrapper" class="table-wrapper">
		<table v-if="node && table" ref="container">
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
					<span v-if="column.enum">【{{column.enum.name}}】</span>
					<span class="type" v-else>{{ column.type }}</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
@import "../../../../assets/node-common.css";
</style>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref, watch} from "vue";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {sendMessage} from "@/utils/message.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {importAssociation} from "./associationEdge.ts";
import {columnToPort} from "@/components/pages/ModelEditor/graph/tableNode.ts";
import {COLUMN_PORT_SELECTOR, TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {createAssociationNameByInput} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";

const store = useModelEditorStore()

const wrapper = ref<HTMLElement>()

const container = ref<HTMLElement>()

const getNode = inject<() => Node>("getNode")!

const node = ref<Node>()

const table = ref<GenTableModelInput>()

let wrapperResizeObserver

onMounted(async () => {
	node.value = getNode()

	if (!node.value || !store.isLoaded) return

	const graph = store._graph()

	if (!node.value || node.value.shape != TABLE_NODE) {
		sendMessage('Node 获取失败', 'error')
		return
	}

	// 绑定数据
	const setData = () => {
		if (!node.value) return
		table.value = node.value.getData().table
	}
	setData()

	// 绑定 wrapper 容器和 node，并且设置成不可枚举
	node.value.getData().wrapper = wrapper
	Object.defineProperty(node.value.getData(), 'wrapper', { enumerable: false, writable: true })

	node.value.on('change:data', () => {
		setData()
	})

	await nextTick()

	if (!wrapper.value || !container.value) return

	// 更新尺寸
	const syncNodeSizeWithContainer = () => {
		if (!node.value || !container.value) return
		graph.disableHistory()
		node.value.resize(container.value.clientWidth, container.value.clientHeight)
		graph.enableHistory()
	}

	wrapperResizeObserver = new ResizeObserver(() => {
		syncNodeSizeWithContainer()
	})

	wrapperResizeObserver.observe(container.value!)

	const resizePort = () => {
		if (!node.value || !store.isLoaded) return

		graph.startBatch("Sync table_node port")

		// 设置 ports 宽度
		for (let port of node.value.ports.items) {
			node.value.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, node.value.getSize().width)
		}

		graph.stopBatch("Sync table_node port")
	}

	node.value.on('change:size', () => {
		resizePort()
	})

	syncNodeSizeWithContainer()

	// 根据数据更新更新 port 和 edge
	watch(() => table.value, (newTable) => {
		if (!node.value || !newTable || !store.isLoaded) return

		const nodeId = node.value.id

		graph.startBatch("Sync table_node data")

		const oldEdges = graph.getConnectedEdges(nodeId)

		node.value.removePorts()
		node.value.addPorts(
			newTable.columns.map(columnToPort)
		)
		resizePort()

		setTimeout(() => {
			oldEdges.forEach(edge => {
				if (edge.getData()?.association) {
					const association = edge.getData().association as GenAssociationModelInput

					if (edge.getSourceCellId() == nodeId) {
						association.sourceTable.name = newTable.name
						association.sourceTable.comment = newTable.comment
					}

					if (edge.getTargetCellId() == nodeId) {
						association.targetTable.name = newTable.name
						association.targetTable.comment = newTable.comment
					}

					association.name = createAssociationNameByInput(association)

					importAssociation(graph, association)
				}
			})

			graph.stopBatch("Sync table_node data")
		}, 100)

	}, {deep: true})
})
</script>
