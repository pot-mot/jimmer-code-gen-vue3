<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenDataSourceView} from "@/api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "../dialog/DataSourceDialog.vue";
import {useLoading} from "@/utils/useLoading.ts";
import {DataSourceMenuEvents} from "./DataSourceMenuEvents.ts";
import {sendMessage} from "@/message/message.ts";
import mitt from 'mitt'
import {DataSourceMenuSlots} from "@/components/business/dataSource/menu/DataSourceMenuSlotProps.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const eventBus = mitt<DataSourceMenuEvents>()

const dataSourcesLoading = useLoading('DataSourceMenu.dataSourcesLoading')

const dataSources = ref<GenDataSourceView[]>([])

const getDataSources = async () => {
	const flag = dataSourcesLoading.start('get')
	dataSources.value = await api.dataSourceService.list()
	dataSourcesLoading.stop(flag)
}

const i18nStore = useI18nStore()

onMounted(() => {
	getDataSources()
})

const saveDialogOpenState = ref(false)
const x = ref(0)
const y = ref(0)

const handleSave = (e: MouseEvent) => {
	saveDialogOpenState.value = true
	x.value = e.clientX
	y.value = e.clientY
}

const handleSaveFinish = (dataSource: GenDataSourceView) => {
	dataSources.value.push(dataSource)
	saveDialogOpenState.value = false
	eventBus.emit('loadedDateSource', {id: dataSource.id})
}

eventBus.on('editDataSource', async ({id}) => {
	const newDataSource = await api.dataSourceService.get({id})

	if (!newDataSource) {
		sendMessage('获取新 dataSource 失败', 'error')
		return
	}

	const index = dataSources.value.findIndex(dataSource => dataSource.id === id)

	if (index === -1) {
		dataSources.value.push(newDataSource)
	} else {
		dataSources.value[index] = newDataSource
	}
})

eventBus.on('deleteDataSource', ({id}) => {
	if (dataSources.value.map(dataSource => dataSource.id).includes(id)) {
		dataSources.value = dataSources.value.filter(dataSource => dataSource.id !== id)
	}
})

defineExpose({
	eventBus
})

defineSlots<DataSourceMenuSlots>()
</script>

<template>
	<el-button style="margin-bottom: 0.5em;" @click="handleSave">
		{{ i18nStore.translate('LABEL_DataSource_new') }}
	</el-button>

	<slot name="dataSources"
		  :loading="dataSourcesLoading.isLoading"
		  :dataSources="dataSources"
		  :eventBus="eventBus">
		<ul v-loading="dataSourcesLoading.isLoading.value">
			<li v-for="dataSource in dataSources" :key="dataSource.id">
				<slot name="dataSource"
					  :loading="dataSourcesLoading.isLoading"
					  :dataSources="dataSources" :dataSource="dataSource"
					  :eventBus="eventBus">
					<DataSourceItem :data-source="dataSource" :event-bus="eventBus"/>
				</slot>
			</li>
		</ul>
	</slot>

	<DataSourceDialog v-model="saveDialogOpenState" :init-x="x" :init-y="y" @added="handleSaveFinish"/>
</template>
