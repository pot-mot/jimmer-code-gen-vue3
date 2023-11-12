<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "../../../api";
import {GenDataSourceView} from "../../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "./DataSourceDialog.vue";
import {useLoading} from "../../../hooks/useLoading.ts";
import {DataSourceMenuEvents} from "./DataSourceMenuEventBus.ts";
import {sendMessage} from "../../../utils/message.ts";
import mitt from 'mitt'

const eventBus = mitt<DataSourceMenuEvents>()

const dataSourcesLoading = useLoading()

const dataSources = ref<GenDataSourceView[]>([])

const getDataSources = async () => {
	dataSourcesLoading.add()
	dataSources.value = await api.dataSourceService.list()
	dataSourcesLoading.sub()
}

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
	eventBus.emit('loadDateSource')
}

eventBus.on('editDataSource', async ({id}) => {
	const newDataSource = await api.dataSourceService.get({id})

	if (!newDataSource) {
		sendMessage('获取新 dataSource 失败', 'error')
		return
	}

	const index = dataSources.value.findIndex(dataSource => dataSource.id == id)

	if (index == -1) {
		dataSources.value.push(newDataSource)
	} else {
		dataSources.value[index] = newDataSource
	}
})

eventBus.on('deleteDataSource', ({id}) => {
	if (dataSources.value.map(dataSource => dataSource.id).includes(id)) {
		dataSources.value = dataSources.value.filter(dataSource => dataSource.id != id)
	}
})

defineExpose({
	eventBus
})
</script>

<template>
	<el-button @click="handleSave" style="margin-bottom: 0.5em;">新增数据源</el-button>

	<div v-loading="dataSourcesLoading.isLoading()">
		<DataSourceItem v-for="dataSource in dataSources" :data-source="dataSource" :event-bus="eventBus"/>
	</div>

	<DataSourceDialog
		v-if="saveDialogOpenState" :x="x" :y="y" @close="saveDialogOpenState = false" @added="handleSaveFinish">
	</DataSourceDialog>
</template>