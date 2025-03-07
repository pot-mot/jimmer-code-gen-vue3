<script setup lang="ts">
import {DeepReadonly, onBeforeMount, ref} from "vue"
import {EntityConfigInput, EntityConfigView} from "@/api/__generated/model/static";
import EntityForm from "@/components/business/entity/EntityForm.vue";
import Comment from "@/components/global/common/Comment.vue";
import {api} from "@/api";
import {MainLocaleKeyParam} from "@/i18n";
import {validateEntity} from "@/components/business/entity/validateEntity.ts";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {cloneDeep} from "lodash";

const loadingStore = useGlobalLoadingStore()

const props = defineProps<{
	modelId: number
}>()

const entities = ref<EntityConfigView[]>()

const refreshEntities = loadingStore.withLoading("ModelEntitiesEditor.refreshEntities", async () => {
	entities.value = await api.entityService.listByModelId({modelId: props.modelId})
})

onBeforeMount(async () => {
	await refreshEntities()
})

const openId = ref<number>()
const openEntity = ref<EntityConfigView>()

const handleOpen = (entity: EntityConfigView) => {
	openId.value = entity.tableConvertedEntity.id
	openEntity.value = cloneDeep(entity)
}

const validate = async (
	entity: DeepReadonly<EntityConfigInput>,
): Promise<MainLocaleKeyParam[]> => {
	const otherEntities = entities.value?.filter(it => {
		return it.tableConvertedEntity.id !== entity.tableConvertedEntity.id
	}) ?? []

	return validateEntity(
		entity,
		otherEntities
	)
}

const handleSubmit = loadingStore.withLoading("ModelEntitiesEditor.submit", async (input: EntityConfigInput) => {
	await api.entityService.config({body: input})
	await refreshEntities()
})

const handleCancel = () => {
	openId.value = undefined
	entities.value = undefined
}
</script>

<template>
	<el-button v-for="entity in entities" @click="handleOpen(entity)">
		{{ entity.tableConvertedEntity.name }}
		<Comment :comment="entity.tableConvertedEntity.comment"/>
	</el-button>

	<EntityForm
		v-if="openEntity !== undefined"
		v-model="openEntity"
		:validate="validate"
		@submit="handleSubmit"
		@cancel="handleCancel"
	/>
</template>
