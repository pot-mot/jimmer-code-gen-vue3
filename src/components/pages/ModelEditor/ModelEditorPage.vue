<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelEditorMainMenu from "./menu/ModelEditorMainMenu.vue";
import ModelEditorGraph from "./graph/ModelEditorGraph.vue";
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
import {sendMessage} from "@/message/message.ts";
import {useRoute, useRouter} from "vue-router";
import ModelMenu from "@/components/business/model/menu/ModelMenu.vue";
import {ModelMenuEvents} from "@/components/business/model/menu/ModelMenuEvents.ts";
import TableDialogs from "@/components/pages/ModelEditor/dialogs/table/TableDialogs.vue";
import EnumDialogs from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogs.vue";

const {MODEL, LOAD, EDIT} = useModelEditorStore()

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

		MODEL.load(model)
	} catch (e) {
		sendMessage('模型解析出现问题', 'error', e)
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
		const flag = loadingStore.start('ModelEditorPage syncClickSchemaEvent')
		await LOAD.loadSchema(id)
		loadingStore.stop(flag)
	})

	eventBus.on('clickTable', async ({id}) => {
		const flag = loadingStore.start('ModelEditorPage syncClickTableEvent')
		await LOAD.loadTable(id)
		loadingStore.stop(flag)
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
		const flag = loadingStore.start('ModelEditorPage syncClickModelEvent')
		await LOAD.loadModel(id)
		loadingStore.stop(flag)
	})

	eventBus.on('clickTable', async ({id}) => {
		const flag = loadingStore.start('ModelEditorPage syncClickTableEvent')
		await LOAD.loadTable(id)
		loadingStore.stop(flag)
	})
}, {immediate: true})
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<div class="layout-menu-wrapper">
				<ModelEditorMainMenu></ModelEditorMainMenu>
			</div>
		</template>
		<template #right>
			<ModelEditorGraph></ModelEditorGraph>
		</template>
	</LeftTopBottomLayout>

	<DragDialog v-model="LOAD.dataSourceLoadMenuOpenState" :init-w="500" :init-x="100" :modal="false"
				:init-y="10" :init-h="600" can-resize>
		<DataSourceMenu ref="dataSourceLoadMenu"></DataSourceMenu>
	</DragDialog>

	<DragDialog v-model="LOAD.modelLoadMenuOpenState" :init-w="500" :init-x="100" :modal="false"
				:init-y="10" :init-h="600" can-resize>
		<ModelMenu ref="modelLoadMenu"></ModelMenu>
	</DragDialog>

	<ModelDialog v-if="MODEL.isLoaded"
				 v-model="EDIT.modelEditDialogOpenState"
				 :model="cloneDeep(MODEL._model())"
				 edit-value
				 @cancel="EDIT.handleCancel"
				 @submit="EDIT.handleSubmit"></ModelDialog>

	<TableDialogs></TableDialogs>

	<EnumDialogs></EnumDialogs>
</template>
