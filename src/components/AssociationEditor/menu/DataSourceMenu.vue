<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { api } from "../../../api";
import { GenDataSourceView } from "../../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "./DataSourceDialog.vue";

const dataSources = ref<GenDataSourceView[]>([])

const getData = () => {
	api.dataSourceService.list().then(res => {
		dataSources.value = res
	})
}

onMounted(() => {
	getData()
})

const isSave = ref(false)
const x = ref(0)
const y = ref(0)

const handleSave = (e: MouseEvent) => {
	isSave.value = true
	x.value = e.clientX
	y.value = e.clientY
}

const handleSaveFinish = (dataSouce: GenDataSourceView) => {
	dataSources.value.push(dataSouce)
	isSave.value = false
}

const handleChange = () => {
	getData()
}

const handleDelete = (id: number) => {
	alert(`删除 dataSource ${id} 成功`)
	getData()
}
</script>

<template>
	<div class="wrapper" style="font-size: 12px;">
		<button @click="handleSave">新增</button>
		<template v-for="dataSource in dataSources">
			<DataSourceItem :data-source="dataSource" @change="handleChange" @delete="handleDelete" />
		</template>
	</div>
	<DataSourceDialog v-if="isSave" :data-source="{}" @save="handleSaveFinish" @close="isSave = false" :x="x" :y="y">
	</DataSourceDialog>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	overflow: auto;
	white-space: nowrap;
	padding-bottom: 20px;
}
</style>