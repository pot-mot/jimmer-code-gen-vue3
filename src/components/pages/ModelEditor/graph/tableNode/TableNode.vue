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
						  @mousedown="e => focusSuperTable(superTable.name, e)">
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
import {
	GenAssociationModelInput,
	GenTableModelInput,
	GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {sendMessage} from "@/message/message.ts";
import {useModelEditorStore} from "../../store/ModelEditorStore.ts";
import {loadAssociationModelInputs} from "../associationEdge/load.ts";
import {columnToPort} from "@/components/pages/ModelEditor/graph/tableNode/load.ts";
import {ASSOCIATION_EDGE, COLUMN_PORT_SELECTOR, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {searchNodesByTableName} from "@/components/pages/ModelEditor/search/search.ts";
import {cloneDeep} from "lodash";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

const {GRAPH, VIEW, HISTORY} = useModelEditorStore()

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

		// 设置 ports 宽度
		for (let port of node.value.ports.items) {
			node.value.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, node.value.getSize().width)
		}
	}

	node.value.on('change:size', () => {
		resizePort()
	})

	syncNodeSizeWithContainer()

	// 监听 table.value
	const tableValueWatcher = (newTable: GenTableModelInput | undefined, oldTable: GenTableModelInput | undefined) => {
		if (!node.value || !oldTable || !newTable || !GRAPH.isLoaded) return

		if (HISTORY.isRedo || HISTORY.isUndo) return

		const nodeId = node.value.id

		const oldEdges = graph.getConnectedEdges(nodeId)

		node.value.removePorts()
		node.value.addPorts(
			newTable.columns.map(columnToPort)
		)
		resizePort()

		setTimeout(() => {
			for (let edge of oldEdges) {
				if (edge.shape != ASSOCIATION_EDGE || !edge.getData()?.association) return

				const association = cloneDeep(edge.getData().association) as GenAssociationModelInput

				const oldColumnNameMap = new Map<string, GenTableModelInput_TargetOf_columns>
				oldTable.columns.forEach(column => {
					oldColumnNameMap.set(column.name, column)
				})

				const newColumnOrderKeyMap = new Map<number, GenTableModelInput_TargetOf_columns>
				newTable.columns.forEach(column => {
					newColumnOrderKeyMap.set(column.orderKey, column)
				})

				if (edge.getSourceCellId() === nodeId) {
					const oldSourceTableName = association.sourceTableName

					association.sourceTableName = newTable.name

					let noColumnFlag = false
					for (let columnReference of association.columnReferences) {
						const oldSourceColumn = oldColumnNameMap.get(columnReference.sourceColumnName)
						if (!oldSourceColumn) {
							noColumnFlag = true
							break
						}
						const newSourceColumn = newColumnOrderKeyMap.get(oldSourceColumn.orderKey)
						if (!newSourceColumn) {
							noColumnFlag = true
							break
						}
						columnReference.sourceColumnName = newSourceColumn.name
					}
					if (noColumnFlag) continue

					if (oldSourceTableName !== newTable.name) {
						association.name = createAssociationName(association)
					}
				}

				if (edge.getTargetCellId() === nodeId) {
					const oldTargetTableName = association.targetTableName

					association.targetTableName = newTable.name

					let noColumnFlag = false
					for (let columnReference of association.columnReferences) {
						const oldTargetColumn = oldColumnNameMap.get(columnReference.targetColumnName)
						if (!oldTargetColumn) {
							noColumnFlag = true
							break
						}
						const newTargetColumn = newColumnOrderKeyMap.get(oldTargetColumn.orderKey)
						if (!newTargetColumn) {
							noColumnFlag = true
							break
						}
						columnReference.targetColumnName = newTargetColumn.name
					}
					if (noColumnFlag) continue

					if (oldTargetTableName !== newTable.name) {
						association.name = createAssociationName(association)
					}
				}

				loadAssociationModelInputs(graph, [association])
			}

			unwatch()
			newTable.columns.forEach((column, index) => {
				column.orderKey = index + 1
			})
			unwatch = watch(() => table.value, tableValueWatcher, {deep: true})

			ModelEditorEventBus.emit('syncedTable', {id: nodeId})
		}, 100)
	}

	let unwatch = watch(() => table.value, tableValueWatcher, {deep: true})
})

const focusSuperTable = (name: string, e: MouseEvent) => {
	const graph = GRAPH._graph()

	if (!graph.isSelected(node.value!!)) {
		return
	} else {
		const nodes = searchNodesByTableName(graph, name)
		VIEW.focus(nodes[0])
		e.stopPropagation()
	}
}
</script>
