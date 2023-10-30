<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "../../../api";
import {GenDataSourceView} from "../../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "./DataSourceDialog.vue";
import {useLoading} from "../../../hooks/useLoading.ts";
import {AssociationEditorMenuEventBus} from "../eventBus/AssociationEditorMenuEventBus.ts";
import {sendMessage} from "../../../utils/message.ts";

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

const isSave = ref(false)
const x = ref(0)
const y = ref(0)

const handleSave = (e: MouseEvent) => {
	isSave.value = true
	x.value = e.clientX
	y.value = e.clientY
}

const handleSaveFinish = (dataSource: GenDataSourceView) => {
	dataSources.value.push(dataSource)
	isSave.value = false
	AssociationEditorMenuEventBus.emit('loadDateSource')
}

AssociationEditorMenuEventBus.on('editDataSource', async ({id}) => {
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

AssociationEditorMenuEventBus.on('deleteDataSource', ({id}) => {
	if (dataSources.value.map(dataSource => dataSource.id).includes(id)) {
		dataSources.value = dataSources.value.filter(dataSource => dataSource.id != id)
	}
})
</script>

<template>
	<div class="wrapper" v-loading="dataSourcesLoading.isLoading()">
		<el-button @click="handleSave">导入数据源</el-button>
		<el-button>导入模型 // TODO </el-button>

		<template v-for="dataSource in dataSources">
			<DataSourceItem :data-source="dataSource"/>
		</template>
	</div>

	<DataSourceDialog
		v-if="isSave" :data-source="{}" :x="x" :y="y"
		@close="isSave = false" @added="handleSaveFinish">
	</DataSourceDialog>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	overflow: auto;
	white-space: nowrap;
	padding-bottom: 2em;
	padding-left: 1em;
	scrollbar-gutter: stable;
}
</style>