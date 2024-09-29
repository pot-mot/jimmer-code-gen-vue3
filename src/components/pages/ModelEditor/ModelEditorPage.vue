<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelEditorMainMenu from "./menu/ModelEditorMainMenu.vue";
import ModelEditorGraph from "./graph/ModelEditorGraph.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {Emitter} from "mitt";
import {DataSourceMenuEvents} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue";
import {cloneDeep} from "lodash";
import {api} from "@/api";
import {sendMessage} from "@/message/message.ts";
import {useRoute, useRouter} from "vue-router";
import ModelMenu from "@/components/business/model/menu/ModelMenu.vue";
import {ModelMenuEvents} from "@/components/business/model/menu/ModelMenuEvents.ts";
import TableDialogs from "@/components/pages/ModelEditor/dialogs/table/TableDialogs.vue";
import EnumDialogs from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogs.vue";
import AssociationDialogs from "@/components/pages/ModelEditor/dialogs/association/AssociationDialogs.vue";
import {confirm} from "@/message/confirm.ts";

const {MODEL, MODEL_LOAD, MODEL_DIALOG_STATE} = useModelEditorStore()

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
			await router.replace("/")
			return
		}

		MODEL_LOAD.load(model)
	} catch (e) {
		sendMessage('模型解析出现问题', 'error', e)
		await router.replace("/")
	}
})

onUnmounted(() => {
	MODEL_LOAD.unload()
})

const dataSourceLoadMenu = ref()

/**
 * 基于数据源的导入，在组件初始化后绑定事件
 */
watch(() => dataSourceLoadMenu.value, () => {
	if (!dataSourceLoadMenu.value) return

	const eventBus: Emitter<DataSourceMenuEvents> = dataSourceLoadMenu.value.eventBus

	eventBus.on(
		'clickSchema',
		async ({id}) => {
			confirm(
				"是否导入整个 schema",
				loadingStore.withLoading('ModelEditorPage syncClickSchemaEvent', async () => {
					await MODEL_LOAD.loadSchema(id)
				})
			)
		})

	eventBus.on(
		'clickTable',
		loadingStore.withLoading('ModelEditorPage syncClickSchemaEvent', async ({id}) => {
			await MODEL_LOAD.loadTable(id)
		})
	)
}, {immediate: true})

const modelLoadMenu = ref()

/**
 * 基于模型的导入，在组件初始化后绑定事件
 */
watch(() => modelLoadMenu.value, () => {
	if (!modelLoadMenu.value) return

	const eventBus: Emitter<ModelMenuEvents> = modelLoadMenu.value.eventBus

	eventBus.on(
		'clickModel',
		loadingStore.withLoading('ModelEditorPage syncClickModelEvent', async ({id}) => {
			await MODEL_LOAD.loadModel(id)
		})
	)

	eventBus.on(
		'clickTable',
		loadingStore.withLoading('ModelEditorPage syncClickTableEvent', async ({id}) => {
			await MODEL_LOAD.loadTable(id)
		})
	)
}, {immediate: true})
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<div class="layout-menu-wrapper">
				<ModelEditorMainMenu/>
			</div>
		</template>
		<template #right>
			<ModelEditorGraph/>
		</template>
	</LeftTopBottomLayout>

	<DragDialog v-model="MODEL_DIALOG_STATE.dataSourceLoadMenuOpenState"
				:modal="false"
				:init-x="100" :init-y="10"
				:init-w="500" :init-h="600"
				can-resize>
		<DataSourceMenu ref="dataSourceLoadMenu"/>
	</DragDialog>

	<DragDialog v-model="MODEL_DIALOG_STATE.modelLoadMenuOpenState"
				:modal="false"
				:init-x="100" :init-y="10"
				:init-w="500" :init-h="600"
				can-resize>
		<ModelMenu ref="modelLoadMenu"/>
	</DragDialog>

	<ModelDialog v-if="MODEL.isLoaded"
				 v-model="MODEL_DIALOG_STATE.modelEditDialogOpenState"
				 :model="cloneDeep(MODEL._model())"
				 @cancel="MODEL_DIALOG_STATE.handleCancel"
				 @submit="MODEL_DIALOG_STATE.handleSubmit"/>

	<TableDialogs/>

	<AssociationDialogs/>

	<EnumDialogs/>
</template>
