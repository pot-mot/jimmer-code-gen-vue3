<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelMenu from "./menu/ModelMenu.vue";
import Graph from "./graph/Graph.vue";
import TableCreateDialog from "@/components/pages/ModelEditor/nodeDialog/TableCreateDialog.vue";
import TableModifyDialogManager from "@/components/pages/ModelEditor/nodeDialog/TableModifyDialogManager.vue";
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<ModelMenu></ModelMenu>
		</template>
		<template #right>
			<Graph></Graph>
		</template>
	</LeftTopBottomLayout>

	<TableCreateDialog></TableCreateDialog>
	<TableModifyDialogManager></TableModifyDialogManager>
</template>