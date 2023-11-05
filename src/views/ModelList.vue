<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GenModelView} from "../api/__generated/model/static";
import {api} from "../api";
import {useModelListStore} from "../components/ModelEditor/store/ModelListStore.ts";
import {useRouter} from "vue-router";
import {datetimeFormat} from "../utils/dataFormat.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {deleteConfirm, sendMessage} from "../utils/message.ts";

const router = useRouter()

const listStore = useModelListStore()

const models = ref<GenModelView[]>([])

const getModels = async () => {
	models.value = await api.modelService.list()
}

onMounted(() => {
	getModels()
})

const toModel = (isNew: boolean, model?: GenModelView) => {
	listStore.currentModel = model
	listStore.isNew = isNew
	router.push('/model')
}

const handleEdit = (model: GenModelView) => {
	// TODO
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
	<div class="container">
		<div class="model-card" @click="toModel(true)">
			<el-row>
				<el-text size="large">创建新模型</el-text>
			</el-row>
		</div>

		<template v-for="model in models">
			<div class="model-card hover-show" @click="toModel(false, model)">
				<div class="buttons hover-show-item">
					<el-button @click.prevent.stop="handleEdit(model)" title="编辑" :icon="EditPen" type="warning"
							   link></el-button>
					<el-button @click.prevent.stop="handleDelete(model)" title="删除" :icon="Delete" type="danger"
							   link></el-button>
				</div>

				<el-row>
					<el-text size="large">{{ model.name }}</el-text>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-text>{{ datetimeFormat(model.createdTime) }}</el-text>
					</el-col>
					<el-col :span="12">
						<el-text>{{ datetimeFormat(model.modifiedTime) }}</el-text>
					</el-col>
				</el-row>
			</div>
		</template>
	</div>
</template>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 1em;
	padding: 1em;
}

.model-card {
	position: relative;
	height: 10em;
	overflow-y: auto;
	padding: 1em;
	box-shadow: var(--el-box-shadow);
	cursor: default;
}

.model-card:hover {
	box-shadow: var(--el-box-shadow-dark);
}

.model-card .buttons {
	position: absolute;
	top: 0;
	right: 0;
}
</style>