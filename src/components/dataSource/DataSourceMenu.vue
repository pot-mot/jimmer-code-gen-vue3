<script setup lang="ts">
import {onMounted, ref} from "vue";
import {api} from "../../api";
import {GenDataSourceView} from "../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";

const controller = api.dataSourceController

const dataSourceTypes = ref<readonly string[]>([])
const dataSources = ref<readonly GenDataSourceView[]>([])

onMounted(() => {
	controller.listTypes().then(res => {
		dataSourceTypes.value = res
	})
	controller.list().then(res => {
		dataSources.value = res
	})
})

const saveDataSource = () => {
	api.dataSourceController.save({
		body: {
			name: "localhost",
			host: "localhost",
			port: "3307",
			username: "root",
			password: "root",
			type: "MYSQL",
			orderKey: 0,
		}
	}).then(res => {
		dataSources.value = [...dataSources.value, res]
	})
}
</script>

<template>
	<div class="wrapper" style="font-size: 12px;">
		<button @click="saveDataSource()">新增</button>
		<template v-for="dataSource in dataSources">
			<DataSourceItem :data-source="dataSource"/>
		</template>
	</div>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	overflow: auto;
	white-space: nowrap;
}
</style>