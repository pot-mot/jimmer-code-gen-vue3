<script setup lang="ts">
import {MANY_TO_ONE, ONE_TO_ONE} from "../../AssociationEditor/constant";
import {GenTableAssociationView} from "../../../api/__generated/model/static";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import Details from "../../common/Details.vue";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import {Graph} from "@antv/x6";
import {getTableNode, tableIdToNodeId} from "../../AssociationEditor/node/TableNode.ts";
import {watch} from "vue";
import {searchEdgesByColumn} from "../../AssociationEditor/edge/AssociationEdge.ts";
import {
	GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations,
	GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations,
} from "../../../api/__generated/model/static/GenTableAssociationView.ts";
import {Delete} from "@element-plus/icons-vue";
import {processClickFunction} from "../../../utils/clickTimer.ts";

const store = useAssociationEditorGraphStore()

interface TableInfoProps {
	table: GenTableAssociationView
}

const props = defineProps<TableInfoProps>()

watch(() => props.table, () => {
	console.log('change')
}, {deep: true})

const {
	click: toggleTableSelect,
	dblClick: focusTable
} = processClickFunction(
	(id: number) => {
		store.select(tableIdToNodeId(id))
	},
	(id: number) => {
		store.focus(tableIdToNodeId(id))
	}
)

const {
	click: selectAssociation,
	dblClick: focusAssociation
} = processClickFunction(
	(
		sourceId: number,
		targetId: number,
	) => {
		const graph: Graph = store._graph()
		const edges = searchEdgesByColumn(graph, sourceId, targetId)
		store.select(edges)
	},
	(
		sourceId: number,
		targetId: number,
	) => {
		const graph: Graph = store._graph()
		const edges = searchEdgesByColumn(graph, sourceId, targetId)
		if (edges.length == 1) {
			store.focus(edges[0].id)
		} else {
			store.select(edges)
		}
	}
)

const deleteOutAssociation = (
	columnId: number,
	association: GenTableAssociationView_TargetOf_columns_TargetOf_outAssociations
) => {
	store.deleteAssociations(columnId, association.targetColumn.id)
	props.table.columns.forEach(column => {
		column.outAssociations = column.outAssociations.filter(it => it.id != association.id)
		column.inAssociations = column.inAssociations.filter(it => it.id != association.id)
	})
}

const deleteInAssociation = (
	columnId: number,
	association: GenTableAssociationView_TargetOf_columns_TargetOf_inAssociations
) => {
	store.deleteAssociations(association.sourceColumn.id, columnId)
	props.table.columns.forEach(column => {
		column.inAssociations = column.inAssociations.filter(it => it.id != association.id)
		column.outAssociations = column.outAssociations.filter(it => it.id != association.id)
	})
}

const saveTableEdit = () => {
	// TODO
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
							<span> {{ " <- " }} </span>
							<el-select v-model="association.associationType">
								<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
								<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
							</el-select>

							<el-button
								@click="toggleTableSelect(association.sourceColumn.table.id)"
								@dblclick="focusTable(association.sourceColumn.table.id)"
								link>
								{{ association.sourceColumn.table.name }}
							</el-button>
							.
							<el-button
								style="margin-left: 0;"
								@click="selectAssociation(association.sourceColumn.id, column.id)"
								@dblclick="focusAssociation(association.sourceColumn.id, column.id)"
								link>
								{{ association.sourceColumn.name }}
							</el-button>

							<el-button @click="deleteInAssociation(column.id, association)" type="danger" :icon="Delete" link></el-button>
						</el-text>
					</div>
				</div>

				<div style="padding-left: 3em;">
					<div v-for="association in column.outAssociations">
						<el-text>
							<span> {{ " -> " }} </span>
							<el-select v-model="association.associationType">
								<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
								<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
							</el-select>

							<el-button
								@click="toggleTableSelect(association.targetColumn.table.id)"
								@dblclick="focusTable(association.targetColumn.table.id)"
								link>
								{{ association.targetColumn.table.name }}
							</el-button>
							.
							<el-button
								style="margin-left: 0;"
								@click="selectAssociation(column.id, association.targetColumn.id)"
								@dblclick="focusAssociation(column.id, association.targetColumn.id)"
								link>
								{{ association.targetColumn.name }}
							</el-button>

							<el-button @click="deleteOutAssociation(column.id, association)" type="danger" :icon="Delete" link></el-button>
						</el-text>
					</div>
				</div>
			</Details>
		</div>
	</el-form>
</template>