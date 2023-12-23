<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GenModelSimpleView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import ModelItem from "@/components/business/model/menu/ModelItem.vue";
import {api} from "@/api";
import mitt from "mitt";
import {ModelMenuEvents} from "@/components/business/model/menu/ModelMenuEvents.ts";
import {ModelMenuProps} from "@/components/business/model/menu/ModelMenuProps.ts";

const eventBus = mitt<ModelMenuEvents>()

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

const props = withDefaults(defineProps<ModelMenuProps>(), {
	showColumns: false,
	showAssociations: true,
	showModelTables: true,
	showAssociationTables: true,
})

defineExpose({
	eventBus
})
</script>

<template>
	<ul v-loading="modelsLoading.isLoading()">
		<li v-for="model in models">
			<ModelItem :model="model" :event-bus="eventBus" :show-config="props"></ModelItem>
		</li>
	</ul>
</template>
