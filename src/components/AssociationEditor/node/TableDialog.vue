<script lang="ts" setup>
import {ref, watch} from 'vue'
import {api} from '../../../api'
import {GenTableAssociationView} from '../../../api/__generated/model/static'
import DragDialog from "../../common/DragDialog.vue"
import {useTableEditorGraphStore} from "../../../store/tableEditorGraph.ts";
import {focusNode, getTableNode} from "./TableNode.ts";
import {Graph} from "@antv/x6";

const store = useTableEditorGraphStore()

interface TableDialogProps {
	id: number
}

const props = defineProps<TableDialogProps>()

interface TableDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableDialogEmits>()

const table = ref<GenTableAssociationView | undefined>()

watch(() => props.id, async (id) => {
	table.value = await api.tableService.getAssociationView({id})
}, {immediate: true})

const focusTable = (id: number | undefined) => {
	if (!id) return

	const graph: Graph = store._graph()
	if (!graph) return

	const node = getTableNode(graph, id)
	if (node) focusNode(graph, node)
}
</script>

<template>
	<DragDialog :x="200" :y="100" :init-w="800" @close="emits('close')">
		<template v-if="table">
			<div style="text-align: center; white-space: nowrap;">
				{{ table.name }}
				{{ table.comment }}
				{{ table.type }}
				{{ table.remark }}
			</div>
			<div class="wrapper">
				<div v-for="column in table.columns" style="padding-left: 1em;">
					<details class="right"
						:class="{'hide': column.inAssociations.length == 0 && column.outAssociations.length == 0}">
						<summary>
							<span>
								{{ column.name }}
							</span>
							<span>
								{{ column.comment }}
							</span>
							<span>
								{{ column.autoIncrement }}
							</span>
						</summary>

						<div v-for="association in column.inAssociations" style="padding-left: 1em;">
							<span> {{ " <- " }} </span>
							<span>{{ association.associationType }} </span>
							<span class="hover-item" @click="focusTable(association.sourceColumn.table?.id)">{{
									association.sourceColumn.table?.name
								}}</span>
							<span>.</span>
							<span>{{ association.sourceColumn.name }}</span>
						</div>

						<div v-for="association in column.outAssociations" style="padding-left: 1em;">
							<span> {{ " -> " }} </span>
							<span>{{ association.associationType }} </span>
							<span class="hover-item" @click="focusTable(association.targetColumn.table?.id)">{{
									association.targetColumn.table?.name
								}}</span>
							<span>.</span>
							<span>{{ association.targetColumn.name }}</span>
						</div>
					</details>
				</div>
			</div>
			<div>
				<button>生成实体</button>
			</div>
		</template>
		<div v-else>
			Table 不在数据库中
		</div>
	</DragDialog>
</template>

<style lang="scss" scoped>
.wrapper {
	max-height: 60vh;
	overflow: auto;
}
</style>