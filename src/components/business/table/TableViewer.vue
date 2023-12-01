<script lang="ts" setup>
import {GenTableAssociationsView} from "@/api/__generated/model/static";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import Details from "@/components/global/common/Details.vue";
import Comment from "@/components/global/common/Comment.vue";
import {showAssociationType} from "@/utils/simplifyAssociationType.ts";

interface TableViewerProps {
	table: GenTableAssociationsView
}

defineProps<TableViewerProps>()
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