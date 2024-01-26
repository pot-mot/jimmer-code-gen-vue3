<template>
	<div ref="wrapper" class="table-node">
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
					<span class="type" v-else>{{ column.rawType }}</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script lang='ts' setup>
import {inject, nextTick, onMounted, ref, watch} from "vue";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {sendMessage} from "@/utils/message.ts";
import {useModelEditorStore} from "../../store/ModelEditorStore.ts";
import {importAssociation} from "../associationEdge/importAssociation.ts";
import {columnToPort} from "@/components/pages/ModelEditor/graph/tableNode/importTable.ts";
import {COLUMN_PORT_SELECTOR, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

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

	// 绑定 wrapper 容器和 node
	node.value.getData().wrapper = wrapper

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

	// 根据数据更新同步 port 和 edge
	watch(() => table.value, (newTable) => {
		if (!node.value || !newTable || !store.isLoaded) return

		const flag = loadingStore.start('TableNode syncPortAndEdgeByData')

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
						const oldSourceTable = association.sourceTable

						association.sourceTable.name = newTable.name
						association.sourceTable.comment = newTable.comment

						if (oldSourceTable.name != newTable.name) {
							association.name = createAssociationName(association)
						}
					}

					if (edge.getTargetCellId() == nodeId) {
						const oldTargetTable = association.targetTable

						association.targetTable.name = newTable.name
						association.targetTable.comment = newTable.comment

						if (oldTargetTable.name != newTable.name) {
							association.name = createAssociationName(association)
						}
					}

					importAssociation(graph, association)
				}
			})

			graph.stopBatch("Sync table_node data")

			loadingStore.stop(flag)
		}, 100 + oldEdges.length * 20)

	}, {deep: true})
})
</script>
