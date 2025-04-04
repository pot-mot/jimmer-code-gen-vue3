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
import {api} from "@/api";
import {sendI18nMessage} from "@/message/message.ts";
import {useRoute, useRouter} from "vue-router";
import ModelMenu from "@/components/business/model/menu/ModelMenu.vue";
import {ModelMenuEvents} from "@/components/business/model/menu/ModelMenuEvents.ts";
import TableDialogs from "@/components/pages/ModelEditor/dialogs/table/TableDialogs.vue";
import EnumDialogs from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogs.vue";
import AssociationDialogs from "@/components/pages/ModelEditor/dialogs/association/AssociationDialogs.vue";
import {confirm} from "@/message/confirm.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import BatchCreateAssociationsDialog
	from "@/components/pages/ModelEditor/dialogs/association/BatchCreateAssociationsDialog.vue";
import TableCombineDialog from "@/components/pages/ModelEditor/dialogs/table/TableCombineDialog.vue";
import {useDataSourceLoadDialogStore} from "@/store/modelEditor/dialogs/DataSourceLoadDialogStore.ts";
import {useModelLoadDialogStore} from "@/store/modelEditor/dialogs/ModelLoadDialogStore.ts";
import {useModelEditDialogStore} from "@/store/modelEditor/dialogs/ModelEditDialogStore.ts";
import EntityDialogs from "@/components/pages/ModelEditor/dialogs/entity/EntityDialogs.vue";
import SubGroupDialogs from "@/components/pages/ModelEditor/dialogs/subGroup/SubGroupDialogs.vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {GenModelInput} from "@/api/__generated/model/static";
import ModelEditorContextMenu from "@/components/pages/ModelEditor/contextMenu/ModelEditorContextMenu.vue";

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const i18nStore = useI18nStore()

const loadingStore = useGlobalLoadingStore()

const dataSourceLoadDialogStore = useDataSourceLoadDialogStore()
const modelLoadDialogStore = useModelLoadDialogStore()
const modelEditDialogStore = useModelEditDialogStore()

const router = useRouter()
const route = useRoute()

onMounted(async () => {
	try {
		let paramId: string | string[] | undefined = route.params.id
		if (paramId instanceof Array) paramId = paramId[0]
		const id = parseInt(paramId)

		const model = await api.modelService.get({id})

		if (!model) {
			sendI18nMessage("MESSAGE_ModelEditorPage_modelNotFound", 'error', {modelId: id})
			await router.replace("/")
			return
		}

		MODEL.load(model)
	} catch (e) {
		sendI18nMessage("MESSAGE_ModelEditorPage_modelLoadFail", 'error', e)
		await router.replace("/")
	}
})

onUnmounted(() => {
	MODEL.unload()
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
				i18nStore.translate("CONFIRM_ModelEditorPage_modelLoad_entireSchema"),
				loadingStore.withLoading('ModelEditorPage syncClickSchemaEvent', async () => {
					await MODEL_EDITOR.loadSchema(id)
				})
			)
		})

	eventBus.on(
		'clickTable',
		async ({id}) => {
			confirm(
				i18nStore.translate("CONFIRM_ModelEditorPage_modelLoad_singleTable"),
				loadingStore.withLoading('ModelEditorPage syncClickSchemaEvent', async () => {
					await MODEL_EDITOR.loadTable(id)
				})
			)
		}
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
		async ({id}) => {
			confirm(
				i18nStore.translate("CONFIRM_ModelEditorPage_modelLoad_model"),
				loadingStore.withLoading('ModelEditorPage syncClickModelEvent', async () => {
					await MODEL_EDITOR.loadModel(id)
				})
			)
		}
	)

	eventBus.on(
		'clickTable',
		async ({id}) => {
			confirm(
				i18nStore.translate("CONFIRM_ModelEditorPage_modelLoad_singleTable"),
				loadingStore.withLoading('ModelEditorPage syncClickTableEvent', async () => {
					await MODEL_EDITOR.loadTable(id)
				})
			)
		}
	)
}, {immediate: true})
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<ModelEditorMainMenu/>
		</template>
		<template #right>
			<ModelEditorGraph/>
		</template>
	</LeftTopBottomLayout>

	<DragDialog
		v-model="dataSourceLoadDialogStore.openState"
		:modal="false"
		:init-x="100" :init-y="10"
		:init-w="500" :init-h="600"
		can-resize
	>
		<DataSourceMenu ref="dataSourceLoadMenu"/>
	</DragDialog>

	<DragDialog
		v-model="modelLoadDialogStore.openState"
		:modal="false"
		:init-x="100" :init-y="10"
		:init-w="500" :init-h="600"
		can-resize
	>
		<ModelMenu ref="modelLoadMenu"/>
	</DragDialog>

	<ModelDialog
		v-if="MODEL.isLoaded"
		v-model="modelEditDialogStore.openState"
		:model="cloneDeepReadonly<GenModelInput>(MODEL._model())"
		@cancel="modelEditDialogStore.handleCancel"
		@submit="modelEditDialogStore.handleSubmit"
	/>

	<SubGroupDialogs/>

	<TableDialogs/>
	<TableCombineDialog/>

	<AssociationDialogs/>
	<BatchCreateAssociationsDialog/>

	<EntityDialogs/>

	<EnumDialogs/>

    <ModelEditorContextMenu/>
</template>
