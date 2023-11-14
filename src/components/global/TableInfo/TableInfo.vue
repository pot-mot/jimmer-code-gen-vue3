<script setup lang="ts">
import {GenTableAssociationsView} from "../../../api/__generated/model/static";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import Details from "../../common/Details.vue";
import {useAssociationEditorStore} from "../../AssociationEditor/store/AssociationEditorStore.ts";
import {Graph} from "@antv/x6";
import {watch} from "vue";
import {
	GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2 as InAssociation,
	GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2 as OutAssociation,
} from "../../../api/__generated/model/static/GenTableAssociationsView.ts";
import {Delete} from "@element-plus/icons-vue";
import {processClickFunction} from "../../../utils/clickTimer.ts";
import Comment from "../../common/Comment.vue";
import {searchEdgesByColumn} from "../../../utils/graphEditor/search.ts";
import {showAssociationType} from "../../../utils/simplifyAssociationType.ts";

const store = useAssociationEditorStore()

interface TableInfoProps {
	table: GenTableAssociationsView
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
		store.select(id)
	},
	(id: number) => {
		store.focus(id)
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
	association: OutAssociation
) => {
	store.deleteAssociations(columnId, association.targetColumn.id)
	props.table.columns.forEach(column => {
		column.outAssociations = column.outAssociations.filter(it => it.id != association.id)
		column.inAssociations = column.inAssociations.filter(it => it.id != association.id)
	})
}

const deleteInAssociation = (
	columnId: number,
	association: InAssociation
) => {
	store.deleteAssociations(association.sourceColumn.id, columnId)
	props.table.columns.forEach(column => {
		column.inAssociations = column.inAssociations.filter(it => it.id != association.id)
		column.outAssociations = column.outAssociations.filter(it => it.id != association.id)
	})
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
					<div class="column-line">
						<span>
							<ColumnIcon :column="column"></ColumnIcon>
						</span>
						<el-text>
							{{ column.name }}
							<Comment :comment="column.comment"></Comment>
						</el-text>
						<el-text>
							{{ column.fullType }}
						</el-text>

						<el-text>
							{{ column.defaultValue }}
						</el-text>

						<el-text>
							{{ column.remark }}
						</el-text>
					</div>
				</template>

				<div style="padding-left: 3em;">
					<div v-for="association in column.inAssociations">
						<el-text>
							<span>{{ showAssociationType(association.associationType) }}</span>

							<span class="association-link-bottom"
								  @click="toggleTableSelect(association.sourceColumn.table.id)"
								  @dblclick="focusTable(association.sourceColumn.table.id)">
								{{ association.sourceColumn.table.name }}
							</span>.<span class="association-link-bottom"
										  @click="selectAssociation(association.sourceColumn.id, column.id)"
										  @dblclick="focusAssociation(association.sourceColumn.id, column.id)">
								{{ association.sourceColumn.name }}
							</span>

							<el-button @click="deleteInAssociation(column.id, association)" type="danger" :icon="Delete"
									   link></el-button>
						</el-text>
					</div>
				</div>

				<div style="padding-left: 3em;">
					<div v-for="association in column.outAssociations">
						<el-text>
							<span>{{ showAssociationType(association.associationType) }}</span>

							<span class="association-link-bottom"
								  @click="toggleTableSelect(association.targetColumn.table.id)"
								  @dblclick="focusTable(association.targetColumn.table.id)">
								{{ association.targetColumn.table.name }}
							</span>.<span class="association-link-bottom"
										  @click="selectAssociation(column.id, association.targetColumn.id)"
										  @dblclick="focusAssociation(column.id, association.targetColumn.id)">
								{{ association.targetColumn.name }}
							</span>

							<el-button @click="deleteOutAssociation(column.id, association)" type="danger"
									   :icon="Delete" link></el-button>
						</el-text>
					</div>
				</div>
			</Details>
		</div>
	</el-form>
</template>

<style scoped>
.column-line {
	display: grid;
	grid-template-columns: 1.5em 15em 10em 1fr 1fr;
	line-height: 1.5em;
	white-space: nowrap;
}

.association-link-bottom:hover {
	color: var(--el-color-info-dark-2);
}
</style>