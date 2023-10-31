<script lang="ts" setup>
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import DataSourceMenu from "../components/AssociationEditor/menu/DataSourceMenu.vue";
import TableGraph from "../components/AssociationEditor/index.vue";
import TableEntityDialogManager from "../App.vue";
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
	<TableEntityDialogManager></TableEntityDialogManager>
</template>