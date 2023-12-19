<script lang="ts" setup>
import {ref, watch} from "vue";
import {cloneDeep} from 'lodash'
import {GenModelInput} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import {defaultModel} from "@/components/business/model/defaultModel.ts";
import CodePreview from "@/components/global/code/CodePreview.vue";

const model = ref<GenModelInput>(cloneDeep(defaultModel))

interface ModelDialogProps {
	model?: GenModelInput,
}

const props = defineProps<ModelDialogProps>()

watch(() => props.model, (value) => {
	if (value) {
		model.value = cloneDeep(value)
	}
}, {immediate: true})

const emits = defineEmits<FormEmits<GenModelInput>>()

const handleSubmit = () => {
	emits('submit', model.value)
}

const handleCancel = () => {
	emits('cancel', model.value)
}
</script>

<template>
	<el-dialog :model-value="true" style="padding: 0;" title="模型" @close="handleCancel">
		<el-form size="default">
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>

			<el-row>
				<el-col :span="12">
					<el-form-item label="语言">
						<el-select v-model="model.language">
							<el-option v-for="language in GenLanguage_CONSTANTS" :value="language"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="数据源类型">
						<el-select v-model="model.dataSourceType">
							<el-option v-for="dataSourceType in DataSourceType_CONSTANTS" :value="dataSourceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="备注">
				<el-input v-model="model.remark" type="textarea"></el-input>
			</el-form-item>

			<el-form-item v-if="model.value" label="内容">
				<CodePreview :code="model.value" language="json" :show-line-counts="false"></CodePreview>
			</el-form-item>

			<div style="text-align: right;">
				<el-button type="info" @click="handleCancel">取消</el-button>
				<el-button type="warning" @click="handleSubmit">提交</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>
