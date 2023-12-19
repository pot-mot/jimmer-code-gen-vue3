<script lang="ts" setup>
import {ref, watch} from "vue";
import {cloneDeep} from 'lodash'
import {GenModelInput} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import {defaultModel} from "@/components/business/model/defaultModel.ts";
import {jsonFormatter, jsonParser} from "@/utils/json.ts";
import CodeEditor from "@/components/global/code/CodeEditor.vue";
import {ModelFormProps} from "@/components/business/model/form/ModelFormProps.ts";

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenModelInput>>()

const model = ref<GenModelInput>(cloneDeep(defaultModel))

watch(() => props.model, (propsModel) => {
	if (propsModel) {
		const tempModel = cloneDeep(propsModel)

		if (props.editValue) {
			tempModel.value = jsonFormatter(propsModel.value ? propsModel.value : '')
		} else {
			tempModel.value = undefined
		}
		model.value = tempModel
	}
}, {immediate: true})

const handleSubmit = () => {
	const tempModel = cloneDeep(model.value)

	if (props.editValue) {
		tempModel.value = jsonParser(tempModel.value ? tempModel.value : '')
	} else {
		tempModel.value = undefined
	}

	emits('submit', tempModel)
}

const handleCancel = () => {
	emits('cancel', model.value)
}
</script>

<template>
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

		<el-form-item label="内容" v-if="editValue && model.value">
			<CodeEditor style="height: 16em; border: 1px solid #ccc; border-radius: 8px;" v-model="model.value" language="json"></CodeEditor>
		</el-form-item>

		<div style="text-align: right;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
</template>
