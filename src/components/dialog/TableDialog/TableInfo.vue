<script setup lang="ts">
import {MANY_TO_ONE, ONE_TO_ONE} from "../../AssociationEditor/constant";
import {GenTableAssociationView} from "../../../api/__generated/model/static";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import Details from "../../common/Details.vue";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import {Graph} from "@antv/x6";
import {focusCell, getTableNode} from "../../AssociationEditor/node/TableNode.ts";
import {watch} from "vue";
import {searchEdges} from "../../AssociationEditor/edge/AssociationEdge.ts";
import {columnIdToPortId} from "../../AssociationEditor/port/ColumnPort.ts";

const store = useAssociationEditorGraphStore()

interface TableInfoProps {
	table: GenTableAssociationView
}

const props = defineProps<TableInfoProps>()

watch(() => props.table, () => {
	console.log('change')
}, {deep: true})

const selectTable = (id: number | undefined, focus: boolean = false) => {
	if (!id) return

	const graph: Graph = store._graph()
	if (!graph) return

	const node = getTableNode(graph, id)
	if (node) {
		if (focus) {
			focusCell(graph, node)
		} else {
			graph.select(node)
		}
	}
}

const selectAssociation = (
	sourceId: number,
	targetId: number,
	focus: boolean = false
) => {
	const graph: Graph = store._graph()
	const edges = searchEdges(graph, columnIdToPortId(sourceId), columnIdToPortId(targetId))
	if (focus && edges.length == 1) {
		focusCell(graph, edges[0])
	} else {
		graph.select(edges)
	}
}

const handleSave = () => {

}
</script>

<template>
	<el-form v-if="table">
		<el-text>
			{{ table.name }}
			{{ table.type }}
			{{ table.comment }}
		</el-text>


		<div>
			<el-input v-model="table.remark" type="textarea"></el-input>

			<Details v-for="column in table.columns"
					 :disabled="column.inAssociations.length == 0 && column.outAssociations.length == 0">
				<template #title>
					<el-row>
						<el-col :span="1">
							<ColumnIcon :column="column"></ColumnIcon>
						</el-col>
						<el-col :span="5">
							<el-text>
								{{ column.name }}
							</el-text>
						</el-col>
						<el-col :span="5">
							<el-text>
								{{ column.type }}
							</el-text>
						</el-col>
						<el-col :span="7">
							<el-text>
								{{ column.comment }}
							</el-text>
						</el-col>
						<el-col :span="6">
							<el-text>
								{{ column.remark }}
							</el-text>
						</el-col>
					</el-row>
				</template>

				<div style="padding-left: 3em;">
					<div v-for="association in column.inAssociations">
						<el-text>
							<span>{{ association.fake }}</span>

							<span> {{ " <- " }} </span>
							<el-select v-model="association.associationType">
								<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
								<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
							</el-select>

							<el-button
								@click="selectTable(association.sourceColumn.table.id)"
								@dblclick="selectTable(association.sourceColumn.table.id, true)"
								link>
								{{ association.sourceColumn.table.name }}
							</el-button>
							.
							<el-button
								style="margin-left: 0;"
								@click="selectAssociation(association.sourceColumn.id, column.id)"
								@dblclick="selectAssociation(association.sourceColumn.id, column.id, true)"
								link>
								{{ association.sourceColumn.name }}
							</el-button>

							<el-button>删除</el-button>
						</el-text>
					</div>
				</div>

				<div style="padding-left: 3em;">
					<div v-for="association in column.outAssociations">
						<el-text>
							<span>{{ association.fake }}</span>

							<span> {{ " -> " }} </span>
							<el-select v-model="association.associationType">
								<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
								<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
							</el-select>

							<el-button
								@click="selectTable(association.targetColumn.table.id)"
								@dblclick="selectTable(association.targetColumn.table.id, true)"
								link>
								{{ association.targetColumn.table.name }}
							</el-button>
							.
							<el-button
								style="margin-left: 0;"
								@click="selectAssociation(column.id, association.targetColumn.id)"
								@dblclick="selectAssociation(column.id, association.targetColumn.id, true)"
								link>
								{{ association.targetColumn.name }}
							</el-button>

							<el-button>删除</el-button>
						</el-text>
					</div>
				</div>
			</Details>
		</div>

		<el-form-item>
			<el-button @click="handleSave">保存变更</el-button>
		</el-form-item>
	</el-form>
</template>