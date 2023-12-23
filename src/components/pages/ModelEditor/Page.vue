<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelEditorMainMenu from "./menu/ModelEditorMainMenu.vue";
import Graph from "./graph/Graph.vue";
import TableCreateDialog from "@/components/pages/ModelEditor/nodeDialog/TableCreateDialog.vue";
import TableModifyDialogManager from "@/components/pages/ModelEditor/nodeDialog/TableModifyDialogManager.vue";
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

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
	let paramId: string | string[] | undefined = route.params.id
	if (paramId instanceof Array) paramId = paramId[0]
	const id = parseInt(paramId)

	const model = await api.modelService.get({id})

	if (!model) {
		sendMessage('当前模型不存在', 'error')
		await router.replace("/models")
		return
	}

	store.loadCurrentModel(model)
})

/**
 * 数据源导入部分
 */

const dataSourceLoadMenu = ref()

watch(() => dataSourceLoadMenu.value, () => {
	if (!dataSourceLoadMenu.value) return

	const eventBus: Emitter<DataSourceMenuEvents> = dataSourceLoadMenu.value.eventBus

	eventBus.on('clickSchema', async ({id}) => {
		loadingStore.add()
		await store.loadSchema(id)
		loadingStore.sub()
	})

	eventBus.on('clickTable', async ({id}) => {
		loadingStore.add()
		await store.loadTable(id)
		loadingStore.sub()
	})
}, {immediate: true})

const modelLoadMenu = ref()

watch(() => modelLoadMenu.value, () => {
	if (!modelLoadMenu.value) return

	const eventBus: Emitter<ModelMenuEvents> = modelLoadMenu.value.eventBus

	eventBus.on('clickModel', async ({id}) => {
		loadingStore.add()
		await store.loadModel(id)
		loadingStore.sub()
	})

	eventBus.on('clickTable', async ({id}) => {
		loadingStore.add()
		await store.loadTable(id)
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

	<TableCreateDialog></TableCreateDialog>
	<TableModifyDialogManager></TableModifyDialogManager>
</template>
