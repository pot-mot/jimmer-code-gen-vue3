<script lang="ts" setup>
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import DataSourceMenu from "../components/table/menu/DataSourceMenu.vue";
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