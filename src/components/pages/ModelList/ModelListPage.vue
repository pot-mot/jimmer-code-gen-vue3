<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {GenModelInput, GenModelSimpleView} from "@/api/__generated/model/static";
import {useLoading} from "@/utils/useLoading.ts";
import {api} from "@/api";
import {sendMessage} from "@/message/message.ts";
import {datetimeFormat} from "@/utils/dateFormat.ts";
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";
import {exportModel, importModel} from "@/components/business/model/file/modelFileOperations.ts";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";
import {deleteConfirm} from "@/message/confirm.ts";

const router = useRouter()

const models = ref<GenModelSimpleView[]>([])

const modelsLoading = useLoading('ModelListPage.modelsLoading')

const getModels = async () => {
	const flag = modelsLoading.start('get')
	models.value = await api.modelService.list()
	modelsLoading.stop(flag)
}

onMounted(() => {
	getModels()
})

const toModelEditor = (id: number) => {
	router.push(`/model/${id}`)
}

const editModel = ref<GenModelInput>()

const updateModelList = async (id: number, toEditor: boolean = false) => {
	const newModel = await api.modelService.get({id})
	if (!newModel) {
		sendMessage('模型重新获取失败', 'error')
		return
	}

	const index = models.value.findIndex(it => it.id === id)

	if (index === -1) {
		models.value.push(newModel)
	} else {
		models.value[index] = newModel
	}

	if (toEditor) {
		toModelEditor(id)
	}
}

const modelUploader = ref()

const emitLoadModelJson = () => {
	if (modelUploader.value) {
		modelUploader.value.click()
	}
}

const handleLoadModelJson = async (e: Event) => {
	const flag = modelsLoading.start('loadModelJson')

	const input = e.target as HTMLInputElement

	const file = input.files?.[0]
	if (file) {
		const modelJson = await file.text()
		const id = await importModel(modelJson)

		if (id !== undefined) {
			sendMessage('模型导入成功', 'success')
			await updateModelList(id, true)
		}
	} else {
		sendMessage('文件不存在', 'error')
	}

	input.value = ''

	modelsLoading.stop(flag)
}

const handleCreate = () => {
	editModel.value = getDefaultModel()
}

const handleEdit = async (id: number) => {
	editModel.value = await api.modelService.get({id})
}

const handleSubmit = async (model: GenModelInput) => {
	const flag = modelsLoading.start('handleSubmit')

	try {
		const isUpdate = (model.id !== undefined)

		const newId = await api.modelService.save({body: model})

		editModel.value = undefined

		await updateModelList(newId, !isUpdate)

		sendMessage(isUpdate ? '模型修改成功' : '模型保存成功', 'success')
	} catch (e) {
		sendMessage(`模型修改失败，原因：${e}`, 'error', e)
	}

	modelsLoading.stop(flag)
}

const handleExport = async (model: GenModelSimpleView) => {
	const flag = modelsLoading.start('handleExport')

	const modeView = await api.modelService.get({id: model.id})

	if (modeView) {
		await exportModel(modeView)
	} else {
		sendMessage('模型导出失败', 'error', model)
	}

	modelsLoading.stop(flag)
}

const handleDelete = (model: GenModelSimpleView) => {
	deleteConfirm(
		`模型【${model.name}】`,
		async () => {
			const flag = modelsLoading.start('handleDelete')

			const count = await api.modelService.delete({ids: [model.id]})
			if (count > 0) {
				sendMessage('删除模型成功', 'success')
				await getModels()
			} else {
				sendMessage('删除模型失败', 'error')
			}

			modelsLoading.stop(flag)
		}
	)
}
</script>

<template>
	<div class="wrapper" v-loading="modelsLoading.isLoading.value">
		<el-button @click="handleCreate()">创建新模型</el-button>

		<el-button @click="emitLoadModelJson">导入模型 JSON</el-button>
		<input v-show="false" ref="modelUploader" type="file" accept="application/json" @change="handleLoadModelJson"/>

		<div class="container">
			<template v-for="model in models">
				<div class="model-card hover-show" @click="toModelEditor(model.id)">
					<div class="right-top hover-show-item">
						<el-button :icon="EditPen" link type="warning"
								   @click.prevent.stop="handleEdit(model.id)"></el-button>
						<el-button :icon="Delete" link type="danger"
								   @click.prevent.stop="handleDelete(model)"></el-button>
					</div>

					<div class="right-bottom hover-show-item">
						<el-tooltip content="导出">
							<el-button :icon="ExportIcon" link type="info"
									   @click.prevent.stop="handleExport(model)"></el-button>
						</el-tooltip>
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
