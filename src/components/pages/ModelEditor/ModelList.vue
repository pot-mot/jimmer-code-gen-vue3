<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {useModelListStore} from "./store/ModelListStore.ts";
import {GenModelInput, GenModelView} from "@/api/__generated/model/static";
import {useLoading} from "../../../hooks/useLoading.ts";
import {api} from "@/api";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";
import {datetimeFormat} from "@/utils/dataFormat.ts";
import ModelDialog from "./ModelInfo/ModelDialog.vue";

const router = useRouter()

const listStore = useModelListStore()

const models = ref<GenModelView[]>([])

const modelsLoading = useLoading()

const getModels = async () => {
	modelsLoading.start()
	models.value = await api.modelService.list()
	modelsLoading.end()
}

onMounted(() => {
	getModels()
})

const toModel = (isNew: boolean, model?: GenModelView) => {
	listStore.currentModel = model
	listStore.isNew = isNew
	router.push('/model')
}

const editModel = ref<GenModelView | undefined>()

const handleEdit = (model: GenModelView) => {
	editModel.value = model
}

const handleSubmit = async (model: GenModelInput) => {
	try {
		if (!model.id) {
			sendMessage('模型无 id，无法进行修改', 'error')
			return
		}

		model.value = undefined

		await api.modelService.save({body: model})
		editModel.value = undefined
		sendMessage('模型修改成功', 'success')

		const newModel = await api.modelService.get({id: model.id})
		if (!newModel) {
			sendMessage('模型重新获取失败', 'error')
			return
		}
		const index = models.value.findIndex(model => model.id == newModel.id)
		models.value[index] = newModel
	} catch (e) {
		sendMessage(`模型修改失败，原因：${e}`, 'error', e)
	}
}

const handleDelete = (model: GenModelView) => {
	deleteConfirm(
		`模型【${model.name}】`,
		async () => {
			const count = await api.modelService.delete({ids: [model.id]})
			if (count == 1) {
				sendMessage('删除模型成功', 'success')
				await getModels()
			} else {
				sendMessage('删除模型失败', 'error')
			}
		}
	)
}
</script>

<template>
	<div class="wrapper">
		<el-button @click="toModel(true)">创建新模型</el-button>

		<div v-loading="modelsLoading.isLoading()" class="container">
			<template v-for="model in models">
				<div class="model-card hover-show" @click="toModel(false, model)">
					<div class="buttons hover-show-item">
						<el-button :icon="EditPen" link title="编辑" type="warning"
								   @click.prevent.stop="handleEdit(model)"></el-button>
						<el-button :icon="Delete" link title="删除" type="danger"
								   @click.prevent.stop="handleDelete(model)"></el-button>
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

		<template v-if="editModel">
			<ModelDialog :model="editModel" @cancel="editModel = undefined" @submit="handleSubmit"></ModelDialog>
		</template>
	</div>
</template>

<style scoped>
.wrapper {
	padding-left: 1em;
	padding-top: 0.2em;
}

.container {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 1em;
	padding-top: 1em;
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

.model-card .buttons {
	position: absolute;
	top: 0;
	right: 0;
}
</style>