<script lang="ts" setup>
import {GenTableAssociationsView} from "@/api/__generated/model/static";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import Details from "@/components/global/common/Details.vue";
import {useAssociationEditorStore} from "../graph/store/AssociationEditorStore.ts";
import {watch} from "vue";
import {
	GenTableAssociationsView_TargetOf_columns_TargetOf_inAssociations_2 as InAssociation,
	GenTableAssociationsView_TargetOf_columns_TargetOf_outAssociations_2 as OutAssociation,
} from "@/api/__generated/model/static/GenTableAssociationsView.ts";
import {Delete} from "@element-plus/icons-vue";
import Comment from "@/components/global/common/Comment.vue";
import {showAssociationType} from "@/utils/simplifyAssociationType.ts";

const store = useAssociationEditorStore()

interface TableInfoProps {
	table: GenTableAssociationsView
}

const props = defineProps<TableInfoProps>()

watch(() => props.table, () => {
	console.log('change')
}, {deep: true})

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
					 :disabled="column.inAssociations.length == 0 && column.outAssociations.length == 0" open>
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

							<span>
								{{ association.sourceColumn.table.name }}
							</span>.<span>
								{{ association.sourceColumn.name }}
							</span>

							<el-button :icon="Delete" link type="danger"
									   @click="deleteInAssociation(column.id, association)"></el-button>
						</el-text>
					</div>
				</div>

				<div style="padding-left: 3em;">
					<div v-for="association in column.outAssociations">
						<el-text>
							<span>{{ showAssociationType(association.associationType) }}</span>

							<span>
								{{ association.targetColumn.table.name }}
							</span>.<span>
								{{ association.targetColumn.name }}
							</span>

							<el-button :icon="Delete" link
									   type="danger" @click="deleteOutAssociation(column.id, association)"></el-button>
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
</style>