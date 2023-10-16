<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "../../../api";
import {GenDataSourceView} from "../../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "../../dialog/DataSourceDialog.vue";
import {sendMessage} from "../../../utils/message.ts";
import {useLoading} from "../../../hooks/useLoading.ts";

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
}

const handleChange = () => {
	getDataSources()
}

const handleDelete = (id: number) => {
	sendMessage(`删除 dataSource ${id} 成功`, "success")
	getDataSources()
}
</script>

<template>
	<div class="wrapper" v-loading="dataSourcesLoading.isLoading()">
		<el-button @click="handleSave">新增</el-button>
		<template v-for="dataSource in dataSources">
			<DataSourceItem :data-source="dataSource" @change="handleChange" @delete="handleDelete"/>
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