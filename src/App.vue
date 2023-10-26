<script lang="ts" setup>
import TableDialogManager from "./components/global/TableDialogManager.vue";
import GenerateConfigDialog from "./components/dialog/GenerateConfigDialog.vue";
</script>

<template>
	<div class="layout">
		<RouterView>
		</RouterView>
		<TableDialogManager></TableDialogManager>
		<GenerateConfigDialog></GenerateConfigDialog>
	</div>
</template>
