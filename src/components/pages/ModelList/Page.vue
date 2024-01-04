<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {GenModelInput, GenModelSimpleView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import {api} from "@/api";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";
import {datetimeFormat} from "@/utils/dataFormat.ts";
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {exportModel, importModel} from "@/components/business/model/file/modelFileOperations.ts";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";

const router = useRouter()

const models = ref<GenModelSimpleView[]>([])

const modelsLoading = useLoading()

const getModels = async () => {
	modelsLoading.add()
	await nextTick()

	models.value = await api.modelService.list()

	await nextTick()

	modelsLoading.sub()
}

onMounted(() => {
	getModels()
})

const toEditorEditor = (id: number) => {
	router.push(`/model/${id}`)
}

const editModel = ref<GenModelInput>()

const updateModelList = async (id: number, toEditor: boolean = false) => {
	const newModel = await api.modelService.get({id})
	if (!newModel || !newModel.id) {
		sendMessage('模型重新获取失败', 'error')
		return
	}

	const index = models.value.findIndex(it => it.id == id)

	if (index == -1) {
		models.value.push(newModel)
	} else {
		models.value[index] = newModel
	}

	if (toEditor) {
		toEditorEditor(id)
	}
}

const modelUploader = ref()

const emitLoadModelJson = () => {
	if (modelUploader.value) {
		console.log(modelUploader.value)
		modelUploader.value.click()
	}
}

const handleLoadModelJson = async (e: Event) => {
	modelsLoading.add()

	const input = e.target as HTMLInputElement

	const file = input.files?.[0]
	if (file) {
		const modelJson = await file.text()
		const id = await importModel(modelJson)

		if (id != undefined) {
			sendMessage('模型导入成功', 'success')
			await updateModelList(id, true)
		} else {
			sendMessage('模型导入失败', 'error')
		}
	} else {
		sendMessage('文件不存在', 'error')
	}

	input.value = ''

	modelsLoading.sub()
}

const handleEdit = (model?: Partial<GenModelInput>) => {
	editModel.value = {...getDefaultModel(), ...model}
}
const handleSubmit = async (model: GenModelInput) => {
	modelsLoading.add()

	try {
		const isUpdate = (model.id != undefined)

		// 在列表页编辑不可更新 graphData
		if (isUpdate) {
			model.graphData = undefined
		}

		const newId = await api.modelService.save({body: model})
		editModel.value = undefined

		await updateModelList(newId, !isUpdate)

		sendMessage(isUpdate ? '模型修改成功' : '模型保存成功', 'success')
	} catch (e) {
		sendMessage(`模型修改失败，原因：${e}`, 'error', e)
	}

	modelsLoading.sub()
}

const handleExport = async (model: GenModelSimpleView) => {
	modelsLoading.add()

	const modeView = await api.modelService.get({id: model.id})

	if (modeView) {
		await exportModel(modeView)
	} else {
		sendMessage('模型导出失败', 'error', model)
	}

	modelsLoading.sub()
}

const handleDelete = (model: GenModelSimpleView) => {
	deleteConfirm(
		`模型【${model.name}】`,
		async () => {
			modelsLoading.add()

			const count = await api.modelService.delete({ids: [model.id]})
			if (count > 0) {
				sendMessage('删除模型成功', 'success')
				await getModels()
			} else {
				sendMessage('删除模型失败', 'error')
			}

			modelsLoading.sub()
		}
	)
}
</script>

<template>
	<div class="wrapper" v-loading="modelsLoading.isLoading()">
		<el-button @click="handleEdit()">创建新模型</el-button>

		<el-button @click="emitLoadModelJson">导入 model.json</el-button>
		<input v-show="false" ref="modelUploader" type="file" accept="application/json" @change="handleLoadModelJson"/>

		<div class="container">
			<template v-for="model in models">
				<div class="model-card hover-show" @click="toEditorEditor(model.id)">
					<div class="right-top hover-show-item">
						<el-button :icon="EditPen" link title="编辑" type="warning"
								   @click.prevent.stop="handleEdit(model)"></el-button>
						<el-button :icon="Delete" link title="删除" type="danger"
								   @click.prevent.stop="handleDelete(model)"></el-button>
					</div>

					<div class="right-bottom hover-show-item">
						<el-button :icon="ExportIcon" link title="导出" type="info"
								   @click.prevent.stop="handleExport(model)"></el-button>
					</div>

					<div class="title">{{ model.name }}</div>

					<div style="padding-top: 0.5em;">
						<el-text type="info">创建于 {{ datetimeFormat(model.createdTime) }}</el-text>
					</div>

					<div style="padding-bottom: 0.5em;">
						<el-text type="info">修改于 {{ datetimeFormat(model.modifiedTime) }}</el-text>
					</div>

					<div style="line-height: 1.4em;">
						<el-text size="default">{{ model.remark }}</el-text>
					</div>
				</div>
			</template>
		</div>

		<ModelDialog :model-value="!!editModel"
					 :model="editModel"
					 @cancel="editModel = undefined"
					 @submit="handleSubmit"></ModelDialog>
	</div>
</template>

<style scoped>
.wrapper {
	padding-left: 1em;
	padding-right: 1em;
	padding-top: 0.2em;
}

.container {
	display: grid;
	grid-gap: 1em;
	padding-top: 1em;
}

@media screen and (max-width: 540px) {
	.container {
		grid-template-columns: 1fr;
	}
}

@media screen and (min-width: 540px) {
	.container {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (min-width: 900px) {
	.container {
		grid-template-columns: repeat(5, 1fr);
	}
}

.model-card {
	position: relative;
	height: 10em;
	overflow-y: auto;
	padding: 1em;
	box-shadow: var(--el-box-shadow);
	cursor: default;
}

.model-card .title {
	font-family: var(--el-font-family);
	font-size: var(--el-font-size-large);
	color: var(--el-color-info-dark-2);
}

.model-card:hover {
	box-shadow: var(--el-box-shadow-dark);
}

.model-card:hover .title {
	color: var(--el-text-color-primary);
}

.model-card .right-top {
	position: absolute;
	top: 0.5em;
	right: 0.5em;
}

.model-card .right-bottom {
	position: absolute;
	bottom: 0.5em;
	right: 0.5em;
}
</style>
