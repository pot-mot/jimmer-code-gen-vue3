<script lang="ts" setup>
import {ref, watch} from 'vue'
import {api} from '../../../api'
import {GenAssociationView, GenTableColumnsView} from '../../../api/__generated/model/static'
import DragDialog from "../../common/DragDialog.vue"
import {useTableEditorGraphStore} from "../../../store/tableEditorGraph.ts";
import {focusNode, tableIdToNodeId} from "./TableNode.ts";
import {Cell, Graph, Node} from "@antv/x6";

const store = useTableEditorGraphStore()

interface TableDialogProps {
	table: GenTableColumnsView
}

const props = defineProps<TableDialogProps>()

interface TableDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableDialogEmits>()

const associations = ref<GenAssociationView[]>([])

watch(() => props.table, async (table) => {
	associations.value = await api.associationService.selectByColumn({
		columnIds: table.columns.map(column => column.id),
		selectType: "OR"
	})
}, {immediate: true})

const focusTable = (id: number | undefined) => {
	if (!id) return

	const graph: Graph = store.graph()
	if (!graph) return

	const cell: Cell = graph.getCellById(tableIdToNodeId(id))
	if (cell && cell.isNode()) {
		const node = cell as Node
		focusNode(graph, node)
	}
}
</script>

<template>
	<DragDialog :x="200" :y="100" :init-w="800" @close="emits('close')">
		<div style="text-align: center; white-space: nowrap;">
			{{ table.name }}
			{{ table.comment }}
			{{ table.type }}
			{{ table.remark }}
		</div>
		<div class="wrapper">
			<details open>
				<summary>
					columns
				</summary>
				<table style="padding-left: 2em;">
					<tr v-for="column in table.columns">
						<td>
							{{ column.name }}
						</td>
						<td>
							{{ column.comment }}
						</td>
						<td>
							{{ column.autoIncrement }}
						</td>
					</tr>
				</table>
			</details>
			<details open>
				<summary>
					associations
				</summary>
				<table style="padding-left: 2em;">
					<tr v-for="association in associations">
						<td @click="focusTable(association.sourceColumn.table?.id)" class="hover-item">
							<span>{{ association.sourceColumn.table?.name }}</span>
							<span style="padding: 0 0.2em;">.</span>
							<span>{{ association.sourceColumn.name }}</span>
						</td>
						<td style="padding: 0 1em;">{{ association.associationType }}</td>
						<td @click="focusTable(association.targetColumn.table?.id)" class="hover-item">
							<span>{{ association.targetColumn.table?.name }}</span>
							<span style="padding: 0 0.2em;">.</span>
							<span>{{ association.targetColumn.name }}</span>
						</td>
					</tr>
				</table>
			</details>
		</div>
		<div>
			<button>生成实体</button>
		</div>
	</DragDialog>
</template>

<style lang="scss" scoped>
.wrapper {
	max-height: 60vh;
	overflow: auto;
}
</style>