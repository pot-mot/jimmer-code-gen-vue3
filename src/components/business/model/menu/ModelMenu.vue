<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GenModelSimpleView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import ModelItem from "@/components/business/model/menu/ModelItem.vue";
import {api} from "@/api";

const models = ref<GenModelSimpleView[]>()

const modelsLoading = useLoading()

const getModels = async () => {
	models.value = await api.modelService.list()
}

onMounted(() => {
	modelsLoading.add()
	getModels()
	modelsLoading.sub()
})
</script>

<template>
	<ul v-loading="modelsLoading.isLoading()">
		<li v-for="model in models">
			<ModelItem :model="model"></ModelItem>
		</li>
	</ul>
</template>
