<script setup lang="ts">
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {AssociationType_CONSTANTS, DissociateAction_CONSTANTS} from "@/api/__generated/model/enums";
import {RefreshRight} from "@element-plus/icons-vue";
import {ref, watch} from "vue";
import {cloneDeep} from "lodash";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";

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
	<el-form style="width: 98%;">
		<el-form-item label="名称">
			<el-input v-model="association.name">
				<template #append>
					<el-button :icon="RefreshRight"
							   @click="association.name = createAssociationName(association)"></el-button>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item label="映射关系">
			<table>
				<tr v-for="columnReference in association.columnReferences">
					<td>
						<el-text style="padding: 0 1em;">
							{{ association.sourceTableName }} .
							{{ columnReference.sourceColumnName }}
						</el-text>
					</td>
					<td>
						<el-text>
							{{ " --> " }}
						</el-text>
					</td>
					<td>
						<el-text style="padding: 0 1em;">
							{{ association.targetTableName }} .
							{{ columnReference.targetColumnName }}
						</el-text>
					</td>
				</tr>
			</table>
		</el-form-item>

		<el-form-item label="关联类型">
			<el-select v-model="association.type">
				<el-option v-for="associationType in AssociationType_CONSTANTS" :value="associationType"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="伪外键">
			<el-switch v-model="association.fake"></el-switch>
		</el-form-item>

		<el-form-item label="脱钩动作">
			<el-select v-model="association.dissociateAction"
					   clearable @clear="association.dissociateAction = undefined">
				<el-option v-for="dissociateAction in DissociateAction_CONSTANTS" :value="dissociateAction"></el-option>
			</el-select>
		</el-form-item>

		<el-row :gutter="24">
			<el-col :span="12">
				<el-form-item label="更新动作">
					<el-input v-model="association.updateAction"
							  :disabled="association.type === 'MANY_TO_MANY'"></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item label="删除动作">
					<el-input v-model="association.deleteAction"
							  :disabled="association.type === 'MANY_TO_MANY'"></el-input>
				</el-form-item>
			</el-col>
		</el-row>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">保存</el-button>
		</div>
	</el-form>
</template>
