<script setup lang="ts">
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {AssociationType_CONSTANTS, DissociateAction_CONSTANTS} from "@/api/__generated/model/enums";
import Comment from "@/components/global/common/Comment.vue";
import {RefreshRight} from "@element-plus/icons-vue";
import {
	createAssociationNameByInput
} from "@/components/pages/ModelEditor/graph/associationEdge/associationName.ts";
import {ref, watch} from "vue";
import {cloneDeep} from "lodash";
import {FormEmits} from "@/components/global/form/FormEmits.ts";

interface AssociationFormProps {
	id?: string,
	association: GenAssociationModelInput
}

const props = defineProps<AssociationFormProps>()

const association = ref<GenAssociationModelInput>(cloneDeep(props.association))

watch(() => props.association, () => {
	association.value = props.association
})

const emits = defineEmits<FormEmits<GenAssociationModelInput>>()

const handleSubmit = async () => {
	emits('submit', association.value)
}

const handleCancel = () => {
	emits('cancel', association.value)
}
</script>

<template>
	<el-form>
		<el-form-item label="名称">
			<el-input v-model="association.name">
				<template #append>
					<el-button :icon="RefreshRight"
							   @click="association.name = createAssociationNameByInput(association)"></el-button>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item label="映射关系">
			<table>
				<tr>
					<td>
						<el-text style="padding-left: 1em;">
							{{ association.sourceTable.name }}
							<Comment :comment="association.sourceTable.comment"></Comment>
						</el-text>
					</td>
					<td></td>
					<td>
						<el-text style="padding-left: 1em;">
							{{ association.targetTable.name }}
							<Comment :comment="association.targetTable.comment"></Comment>
						</el-text>
					</td>
				</tr>

				<tr v-for="columnReference in association.columnReferences">
					<td>
						<el-text style="padding-left: 3em;">
							{{ association.targetTable.name }} .
							{{ columnReference.sourceColumn.name }}
							<Comment :comment="columnReference.sourceColumn.comment"></Comment>
						</el-text>
					</td>
					<td>
						<el-text>
							{{ " --> " }}
						</el-text>
					</td>
					<td>
						<el-text style="padding-left: 3em;">
							{{ association.targetTable.name }} .
							{{ columnReference.targetColumn.name }}
							<Comment :comment="columnReference.targetColumn.comment"></Comment>
						</el-text>
					</td>
				</tr>
			</table>
		</el-form-item>

		<el-form-item label="关联类型">
			<el-select v-model="association.associationType">
				<el-option v-for="associationType in AssociationType_CONSTANTS" :value="associationType"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="伪外键">
			<el-switch v-model="association.fake"></el-switch>
		</el-form-item>

		<el-form-item label="脱钩动作">
			<el-select :disabled="association.associationType == 'MANY_TO_MANY'"
					   v-model="association.dissociateAction"
					   clearable @clear="association.dissociateAction = undefined">
				<el-option v-for="dissociateAction in DissociateAction_CONSTANTS" :value="dissociateAction"></el-option>
			</el-select>
		</el-form-item>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">保存</el-button>
		</div>
	</el-form>
</template>
