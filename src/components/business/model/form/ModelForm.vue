<script lang="ts" setup>
import {ref, watch} from "vue";
import {cloneDeep} from 'lodash'
import {GenModelInput} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {jsonStrFormat, jsonStrCompress} from "@/utils/json.ts";
import CodeEditor from "@/components/global/code/CodeEditor.vue";
import {ModelFormProps} from "@/components/business/model/form/ModelFormProps.ts";
import {sendMessage} from "@/utils/message.ts";
import {validateGraphData} from "@/shape/GraphData.ts";

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenModelInput>>()

const model = ref<GenModelInput>(getDefaultModel())

watch(() => props.model, (propsModel) => {
	if (propsModel) {
		const tempModel = cloneDeep(propsModel)

		if (props.editValue) {
			try {
				tempModel.graphData = jsonStrFormat(propsModel.graphData ? propsModel.graphData : '')
			} catch (e) {
				sendMessage('json 格式校验失败', 'error')
				tempModel.graphData = ''
			}
		}

		model.value = tempModel
	}
}, {immediate: true})

const handleSubmit = () => {
	const tempModel = cloneDeep(model.value)

	if (props.editValue) {
		try {
			if (tempModel.graphData == undefined) {
				throw "graphData undefined"
			}

			if (!validateGraphData(JSON.parse(tempModel.graphData))) {
				throw "graphData validate fail"
			}

			tempModel.graphData = jsonStrCompress(tempModel.graphData)
		} catch (e) {
			sendMessage('json 格式校验失败', 'error', e)
			return
		}
	}

	emits('submit', tempModel)
}

const handleCancel = () => {
	emits('cancel', model.value)
}
</script>

<template>
	<el-form size="default"
			 :style="editValue ? 'height: 100%; display: grid; grid-template-rows: 220px 1fr 40px;' : 'height: 100%; display: grid; grid-template-rows: 220px 40px;'">
		<div>
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>

			<el-row :gutter="24">
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
							<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
									   :value="dataSourceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="包路径">
						<el-input v-model="model.packagePath"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="同步转换实体">
						<el-switch v-model="model.syncConvertEntity"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="备注">
				<el-input v-model="model.remark" type="textarea" :rows="2" :autosize="false"></el-input>
			</el-form-item>
		</div>

		<el-form-item label="内容" v-if="editValue && model.graphData != undefined">
			<CodeEditor
				style="height: 100%; min-height: 450px; max-height: calc(100vh - 300px); border: 1px solid #ccc; border-radius: 8px;"
				v-model="model.graphData" language="json"></CodeEditor>
		</el-form-item>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
</template>
