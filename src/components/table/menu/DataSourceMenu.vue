<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "../../../api";
import {GenDataSourceView} from "../../../api/__generated/model/static";
import DataSourceItem from "./DataSourceItem.vue";
import DataSourceDialog from "./DataSourceDialog.vue";

const dataSources = ref<GenDataSourceView[]>([])

onMounted(() => {
	api.dataSourceService.list().then(res => {
		dataSources.value = res
	})
})

const isSave = ref(false)

const handleSave = () => {
	isSave.value = true
}

const handleSaveFinish = (dataSouce: GenDataSourceView) => {
	isSave.value = false
	console.log(dataSouce);
}
</script>

<template>
	<DataSourceDialog v-if="isSave" :data-source="{}" @save="handleSaveFinish" @close="isSave = false"></DataSourceDialog>
	<div class="wrapper" style="font-size: 12px;">
		<button @click="handleSave()">新增</button>
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
	padding-bottom: 20px;
}
</style>