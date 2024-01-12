<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelEditorMainMenu from "./menu/ModelEditorMainMenu.vue";
import Graph from "./graph/Graph.vue";
import {onMounted, ref, watch} from "vue";
import {Emitter} from "mitt";
import {DataSourceMenuEvents} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue";
import {cloneDeep} from "lodash";
import {api} from "@/api";
import {sendMessage} from "@/utils/message.ts";
import {useRoute, useRouter} from "vue-router";
import ModelMenu from "@/components/business/model/menu/ModelMenu.vue";
import {ModelMenuEvents} from "@/components/business/model/menu/ModelMenuEvents.ts";
import TableDialogs from "@/components/pages/ModelEditor/dialogs/table/TableDialogs.vue";
import EnumDialogs from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogs.vue";

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
	try {
		let paramId: string | string[] | undefined = route.params.id
		if (paramId instanceof Array) paramId = paramId[0]
		const id = parseInt(paramId)

		const model = await api.modelService.get({id})

		if (!model) {
			sendMessage('当前模型不存在', 'error', {modelId: id})
			await router.replace("/models")
			return
		}

		store.loadCurrentModel(model)
	} catch (e) {
		sendMessage('当前模型解析出现问题', 'error')
		await router.replace("/models")
	}
})


const dataSourceLoadMenu = ref()

/**
 * 基于数据源的导入，在组件初始化后绑定事件
 */
watch(() => dataSourceLoadMenu.value, () => {
	if (!dataSourceLoadMenu.value) return

	const eventBus: Emitter<DataSourceMenuEvents> = dataSourceLoadMenu.value.eventBus

	eventBus.on('clickSchema', async ({id}) => {
		loadingStore.add()
		await store.importSchema(id)
		loadingStore.sub()
	})

	eventBus.on('clickTable', async ({id}) => {
		loadingStore.add()
		await store.importTable(id)
		loadingStore.sub()
	})
}, {immediate: true})

const modelLoadMenu = ref()

/**
 * 基于模型的导入，在组件初始化后绑定事件
 */
watch(() => modelLoadMenu.value, () => {
	if (!modelLoadMenu.value) return

	const eventBus: Emitter<ModelMenuEvents> = modelLoadMenu.value.eventBus

	eventBus.on('clickModel', async ({id}) => {
		loadingStore.add()
		await store.importModel(id)
		loadingStore.sub()
	})

	eventBus.on('clickTable', async ({id}) => {
		loadingStore.add()
		await store.importTable(id)
		loadingStore.sub()
	})
}, {immediate: true})
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<ModelEditorMainMenu></ModelEditorMainMenu>
		</template>
		<template #right>
			<Graph></Graph>
		</template>
	</LeftTopBottomLayout>

	<DragDialog v-model="store.dataSourceLoadMenuOpenState" :init-w="500" :init-x="100"
				:init-y="10" :init-h="600" can-resize>
		<DataSourceMenu ref="dataSourceLoadMenu"></DataSourceMenu>
	</DragDialog>

	<DragDialog v-model="store.modelLoadMenuOpenState" :init-w="500" :init-x="100"
				:init-y="10" :init-h="600" can-resize>
		<ModelMenu ref="modelLoadMenu"></ModelMenu>
	</DragDialog>

	<ModelDialog v-if="store.isModelLoaded"
				 v-model="store.modelEditDialogOpenState"
				 :model="cloneDeep(store._currentModel())"
				 edit-value
				 @cancel="store.handleCancelModelEdit"
				 @submit="store.handleSubmitModelEdit"></ModelDialog>

	<TableDialogs></TableDialogs>

	<EnumDialogs></EnumDialogs>
</template>
