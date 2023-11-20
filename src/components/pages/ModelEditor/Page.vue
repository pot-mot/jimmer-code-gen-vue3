<script lang="ts" setup>
import LeftTopBottomLayout from "@/components/global/layout/LeftRightLayout.vue";
import ModelMenu from "./menu/ModelMenu.vue";
import Graph from "./graph/Graph.vue";
import ModelAddDialog from "./ModelInfo/ModelAddDialog.vue";
import ModelModifyDialogManager from "./ModelInfo/ModelModifyDialogManager.vue";
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

	<ModelAddDialog></ModelAddDialog>
	<ModelModifyDialogManager></ModelModifyDialogManager>
</template>