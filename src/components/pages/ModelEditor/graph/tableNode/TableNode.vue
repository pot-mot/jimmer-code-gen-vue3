<template>
	<div ref="wrapper" class="table-node">
		<table v-if="node && table" ref="container">
			<tr class="head">
				<th colspan="2">
					<span class="icon">
						<TableIcon :type="table.type"></TableIcon>
					</span>
					<span class="name">{{ table.name }}</span>
					<Comment :comment="table.comment"></Comment>
					<span class="super-table-separator"
						  v-if="table.superTables.length > 0">:</span>
					<span class="super-table"
						  v-for="superTable in table.superTables"
						  @click="focusSuperTable(superTable.name)">
						{{ superTable.name }}
					</span>
				</th>
			</tr>
			<tr class="column" v-for="column in table.columns">
				<td>
					<span class="icon">
						<ColumnIcon :column="column"></ColumnIcon>
					</span>
					<span>{{ column.name }}</span>
					<Comment :comment="column.comment"></Comment>
				</td>
				<td style="text-align: right;">
					<span v-if="column.enum">【{{ column.enum.name }}】</span>
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
import {sendMessage} from "@/message/message.ts";
import {useModelEditorStore} from "../../store/ModelEditorStore.ts";
import {loadAssociationModelInputs} from "../associationEdge/load.ts";
import {columnToPort} from "@/components/pages/ModelEditor/graph/tableNode/load.ts";
import {COLUMN_PORT_SELECTOR, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {searchNodesByTableName} from "@/components/pages/ModelEditor/search/search.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

const {GRAPH, VIEW} = useModelEditorStore()

const wrapper = ref<HTMLElement>()

const container = ref<HTMLElement>()

const getNode = inject<() => Node>("getNode")!

const node = ref<Node>()

const table = ref<GenTableModelInput>()

let wrapperResizeObserver

onMounted(async () => {
	node.value = getNode()

	if (!node.value || !GRAPH.isLoaded) return

	const graph = GRAPH._graph()

	if (!node.value || node.value.shape !== TABLE_NODE) {
		sendMessage('Node 获取失败', 'error')
		return
	}

	// 绑定数据
	const syncNodeDataToLocalTable = () => {
		if (!node.value) return
		table.value = node.value.getData().table
	}
	syncNodeDataToLocalTable()

	// 绑定 wrapper 容器和 node
	node.value.getData().wrapper = wrapper

	node.value.on('change:data', () => {
		syncNodeDataToLocalTable()
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
		if (!node.value || !GRAPH.isLoaded) return

		graph.startBatch("Sync TABLE_NODE port")

		// 设置 ports 宽度
		for (let port of node.value.ports.items) {
			node.value.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, node.value.getSize().width)
		}

		graph.stopBatch("Sync TABLE_NODE port")
	}

	node.value.on('change:size', () => {
		resizePort()
	})

	syncNodeSizeWithContainer()

	// 根据数据更新同步 port 和 edge
	watch(() => table.value, (newTable) => {
		if (!node.value || !newTable || !GRAPH.isLoaded) return

		const nodeId = node.value.id

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

					if (edge.getSourceCellId() === nodeId) {
						const oldSourceTableName = association.sourceTableName

						association.sourceTableName = newTable.name

						if (oldSourceTableName !== newTable.name) {
							association.name = createAssociationName(association)
						}
					}

					if (edge.getTargetCellId() === nodeId) {
						const oldTargetTableName = association.targetTableName

						association.targetTableName = newTable.name

						if (oldTargetTableName !== newTable.name) {
							association.name = createAssociationName(association)
						}
					}

					loadAssociationModelInputs(graph, [association])
				}
			})

			ModelEditorEventBus.emit('tableModifySynced', {id: node.value!!.id})
		}, 100 + oldEdges.length * 20)

	}, {deep: true})
})

const focusSuperTable = (name: string) => {
	const graph = GRAPH._graph()
	const nodes = searchNodesByTableName(graph, name)
	VIEW.focus(nodes[0])
}
</script>
