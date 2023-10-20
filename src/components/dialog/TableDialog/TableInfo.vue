<script setup lang="ts">
import {MANY_TO_ONE, ONE_TO_ONE} from "../../AssociationEditor/constant";
import {GenTableAssociationView} from "../../../api/__generated/model/static";
import ColumnIcon from "../../icons/database/ColumnIcon.vue";
import Details from "../../common/Details.vue";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import {Graph} from "@antv/x6";
import {focusNode, getTableNode} from "../../AssociationEditor/node/TableNode.ts";
import {watch} from "vue";

const store = useAssociationEditorGraphStore()

interface TableInfoProps {
	table: GenTableAssociationView
}

const props = defineProps<TableInfoProps>()

watch(() => props.table, () => {
	console.log('change')
}, {deep: true})

const focusTable = (id: number | undefined) => {
	if (!id) return

	const graph: Graph = store._graph()
	if (!graph) return

	const node = getTableNode(graph, id)
	if (node) focusNode(graph, node)
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
							<span> {{ " <- " }} </span>
							<el-select v-model="association.associationType">
								<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
								<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
							</el-select>
							<el-button @click="focusTable(association.sourceColumn.table.id)" link>
								{{ association.sourceColumn.table.name }}.{{ association.sourceColumn.name }}
							</el-button>
							<span>{{ association.fake }}</span>
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
							<el-button @click="focusTable(association.targetColumn.table.id)" link>
								{{ association.targetColumn.table.name }}.{{ association.targetColumn.name }}
							</el-button>
							<span>{{ association.fake }}</span>
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