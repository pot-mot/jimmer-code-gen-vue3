<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "../../api";
import {GenDataSourceInput, GenDataSourceView} from "../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";

const dataSourceTypes = ref<readonly string[]>([])
const dataSources = ref<readonly GenDataSourceView[]>([])

onMounted(() => {
	api.dataSourceService.listTypes().then(res => {
		dataSourceTypes.value = res
	})
	api.dataSourceService.list().then(res => {
		dataSources.value = res
	})
})

const saveDataSource = () => {
	api.dataSourceService.save({
		body: <GenDataSourceInput>{
			name: "localhost",
			host: "localhost",
			port: "3307",
			username: "root",
			password: "root",
			type: "MYSQL",
			orderKey: 0,
			remark: "",
		}
	}).then(res => {
		console.log(res)
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