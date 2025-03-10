<template>
	<div ref="wrapper" class="table-node">
		<table v-if="node && table" ref="container">
			<thead>
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
			</thead>
			<tbody>
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
			</tbody>
		</table>
	</div>
</template>

<script lang='ts' setup>
import {computed, inject, nextTick, onMounted, ref, watch} from "vue";
import {GenModelInput_TargetOf_subGroups, GenTableModelInput,} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";
import {sendMessage} from "@/message/message.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {columnToPort} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
import {COLUMN_PORT_SELECTOR, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {searchNodesByTableName} from "@/components/pages/ModelEditor/search/graphSearch.ts";
import {refreshEdgeAssociation,} from "@/components/pages/ModelEditor/graph/load/refreshAssociationEdge.ts";
import {loadAssociationModelInputs} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";

const {GRAPH, MODEL, MODEL_EDITOR, VIEW, HISTORY} = useModelEditorStore()

const wrapper = ref<HTMLElement>()

const container = ref<HTMLElement>()

const getNode = inject<() => Node>("getNode")!

const node = ref<Node>()

const table = ref<GenTableModelInput>()

const subGroup = computed<GenModelInput_TargetOf_subGroups | undefined>(() => {
	return MODEL.subGroups.find(it => it.name === table.value?.subGroup?.name)
})

watch(() => subGroup.value, (newVal) => {
	if (wrapper.value && newVal && newVal.style.length > 0) {
		wrapper.value.style.setProperty("--border-color", newVal.style)
	}
})

/**
 * 在 data 变化后，
 * table 同步 size 到 node 和 port
 * 同步 edge
 */
onMounted(() => {
	node.value = getNode()

	if (!node.value || !GRAPH.isLoaded) return

	const graph = GRAPH._graph()

	if (node.value.shape !== TABLE_NODE) {
		sendMessage('Node 获取失败', 'error')
		return
	}

	node.value.getData().wrapper = wrapper

	/**
	 * 尺寸同步相关
	 */

	const resizeNodeSize = () => {
		if (!node.value || !container.value) return

		const width = container.value.clientWidth
		const height = container.value.clientHeight

		node.value.resize(width, height)

		// 设置 ports 宽度
		for (let port of node.value.ports.items) {
			node.value.setPortProp(port.id!, `attrs/${COLUMN_PORT_SELECTOR}/width`, width)
		}
	}

	/**
	 * 数据同步相关
	 */

	node.value.on('change:data', () => {
		syncTable()
	})

	const syncTable = () => {
		if (!node.value || !node.value.getData()?.table) return

		const newTable = node.value.getData().table

		syncTableEffect(newTable, table.value)
		table.value = newTable
	}

	const syncTableEffect = (newTable: GenTableModelInput | undefined, oldTable: GenTableModelInput | undefined) => {
		if (!node.value || !oldTable || !newTable || !GRAPH.isLoaded) return

		if (HISTORY.isRedo.value || HISTORY.isUndo.value) return

		const nodeId = node.value.id

		const oldEdges = graph.getConnectedEdges(nodeId)

		node.value.removePorts()
		node.value.addPorts(newTable.columns.map(columnToPort))

		nextTick(() => {
			resizeNodeSize()

			setTimeout(() => {
				if (!node.value) return

				const refreshedAssociation = []
				for (const edge of oldEdges) {
					const association = refreshEdgeAssociation(
						graph,
						node.value,
						edge,
						oldTable,
						newTable
					)
					if (association) {
						refreshedAssociation.push(association)
					}
				}
				loadAssociationModelInputs(graph, refreshedAssociation)

				newTable.columns.forEach((column, index) => {
					column.orderKey = index + 1
				})

				MODEL_EDITOR.syncedTable(nodeId)
			}, 100)
		})
	}

	syncTable()
	table.value!.columns.forEach((column, index) => {
		column.orderKey = index + 1
	})

	nextTick(() => {
		graph.disableHistory()
		resizeNodeSize()
		graph.enableHistory()
	})
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
