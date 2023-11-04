<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GenModelView} from "../api/__generated/model/static";
import {api} from "../api";
import {useModelListStore} from "../components/ModelEditor/store/ModelListStore.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const listStore = useModelListStore()

const models = ref<GenModelView[]>([])

onMounted(async () => {
	models.value = await api.modelService.list()
})

const toModel = (isNew: boolean, model?: GenModelView) => {
	listStore.currentModel = model
	listStore.isNew = isNew
	router.push('/model')
}
</script>

<template>
	<div style="display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 1em;">
		<el-card @click="toModel(true)">新模型</el-card>

		<template v-for="model in models">
			<el-card @click="toModel(false, model)">{{ model.name }}</el-card>
		</template>
	</div>
</template>