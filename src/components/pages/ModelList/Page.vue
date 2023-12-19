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
import {cloneDeep} from "lodash";
import {defaultModel} from "@/components/business/model/defaultModel.ts";

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

const toModel = (id: number) => {
	router.push(`/model/${id}`)
}

const editModel = ref<GenModelInput>()

const handleEdit = (model: GenModelInput = cloneDeep(defaultModel)) => {
	editModel.value = model
}

const handleSubmit = async (model: GenModelInput) => {
	modelsLoading.add()

	try {
		const updateFlag = (model.id != undefined)

		if (updateFlag) {
			model.value = undefined
		}

		const newId = await api.modelService.save({body: model})
		editModel.value = undefined

		sendMessage(updateFlag ? '模型修改成功' : '模型保存成功', 'success')

		const newModel = await api.modelService.get({id: newId})
		if (!newModel || !newModel.id) {
			sendMessage('模型重新获取失败', 'error')
			return
		}

		if (updateFlag) {
			const index = models.value.findIndex(it => it.id == model.id)
			models.value[index] = newModel
		} else {
			models.value.push(newModel)
			toModel(newModel.id)
		}
	} catch (e) {
		sendMessage(`模型修改失败，原因：${e}`, 'error', e)
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
	<div class="wrapper">
		<el-button @click="handleEdit()">创建新模型</el-button>

		<div v-loading="modelsLoading.isLoading()" class="container">
			<template v-for="model in models">
				<div class="model-card hover-show" @click="toModel(model.id)">
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

		<ModelDialog :model-value="!!editModel"
					 :model="editModel"
					 @cancel="editModel = undefined"
					 @submit="handleSubmit"></ModelDialog>
	</div>
</template>

<style scoped>
.wrapper {
	padding-left: 1em;
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
		grid-template-columns: repeat(3, 1fr);
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

.model-card .buttons {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
