<script lang="ts" setup>
import {ref, watch} from "vue";
import {cloneDeep} from 'lodash'
import {GenModelInput} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {jsonStrCompress, jsonStrPrettyFormat} from "@/utils/json.ts";
import CodeEditor from "@/components/global/code/CodeEditor.vue";
import {ModelFormProps} from "@/components/business/model/form/ModelFormProps.ts";
import {sendMessage} from "@/message/message.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import GenConfigForm from "@/components/business/genConfig/GenConfigForm.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {validateModelForm} from "@/components/business/model/form/validateModel.ts";

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenModelInput>>()

const model = ref<GenModelInput>(getDefaultModel())

watch(() => props.model, (propsModel) => {
	if (propsModel) {
		const tempModel = cloneDeep(propsModel)

		try {
			validateGraphData(
				JSON.parse(tempModel.graphData),
				e => {
					throw e
				}
			)

			tempModel.graphData = jsonStrPrettyFormat(tempModel.graphData)
		} catch (e) {
			sendMessage('json 格式校验失败，请参考控制台报错', 'warning', {error: e, graphData: tempModel.graphData})
		}

		model.value = tempModel
	}
}, {immediate: true})

const handleSubmit = () => {
	const tempModel = cloneDeep(model.value)

	try {
		const graphData = JSON.parse(tempModel.graphData)

		validateGraphData(
			graphData,
			e => {
				throw e
			}
		)

		const messageList = validateModelForm(model.value)

		if (messageList.length > 0) {
			messageList.forEach(it => sendMessage(it, 'warning'))
			return
		}

		tempModel.graphData = jsonStrCompress(tempModel.graphData)
	} catch (e) {
		sendMessage("模型提交失败，请参考控制台报错", 'warning', {error: e, graphData: tempModel.graphData})
		return
	}

	emits('submit', tempModel)
}

const handleCancel = () => {
	emits('cancel', model.value)
}

const otherConfigOpenState = ref(false)

const handleOpenOtherConfigDialog = () => {
	otherConfigOpenState.value = true
}
</script>

<template>
	<el-form style="height: 100%; width: 98%;padding-top: 1em;padding-left: 8px;display: grid;grid-template-rows: 275px 1fr 30px;">
		<div>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="名称">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="作者">
						<el-input v-model="model.author"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="数据源类型">
						<el-select v-model="model.dataSourceType">
							<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
									   :value="dataSourceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="语言">
						<el-select v-model="model.language">
							<el-option v-for="language in GenLanguage_CONSTANTS" :value="language"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="包路径">
						<el-input v-model="model.packagePath"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="表路径">
						<el-input v-model="model.tablePath"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item label="备注">
						<el-input v-model="model.remark" type="textarea" :rows="4" resize="none"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="4" :offset="20">
					<el-form-item>
						<el-button @click="handleOpenOtherConfigDialog">其他配置项</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</div>

		<el-form-item label="内容">
			<CodeEditor
				style="height: 100%; border: 1px solid #ccc; border-radius: 8px;"
				v-model="model.graphData"
				language="json"></CodeEditor>
		</el-form-item>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>

	<DragDialog v-model="otherConfigOpenState" :init-y="100" :init-h="620">
		<GenConfigForm
			v-model="model"
			@submit="(data) => {
				model = {...model, ...data}
				otherConfigOpenState = false
		    }"
			@cancel="otherConfigOpenState = false"
			style="padding: 1em 0.5em;">
		</GenConfigForm>
	</DragDialog>
</template>
