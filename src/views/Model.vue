<script setup lang="ts">
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import ModelEditor from "../components/ModelEditor/index.vue";
import ModelMenu from "../components/ModelEditor/menu/ModelMenu.vue";
import ModelAddDialog from "../components/ModelInfo/ModelAddDialog.vue";
import ModelModifiyDialogManager from "../components/ModelInfo/ModelModifyDialogManager.vue";
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<ModelMenu></ModelMenu>
		</template>
		<template #right>
			<ModelEditor></ModelEditor>
		</template>
	</LeftTopBottomLayout>

	<ModelAddDialog></ModelAddDialog>
	<ModelModifiyDialogManager></ModelModifiyDialogManager>
</template>

<style scoped>

</style>