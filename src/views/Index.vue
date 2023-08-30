<script setup lang="js">
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import DataSourceMenu from "../components/dataSource/DataSourceMenu.vue";
import TableGraph from "../components/table/TableGraph.vue";
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<DataSourceMenu></DataSourceMenu>
		</template>
		<template #right>
			<TableGraph></TableGraph>
		</template>
	</LeftTopBottomLayout>
</template>

<style scoped lang="scss">
</style>