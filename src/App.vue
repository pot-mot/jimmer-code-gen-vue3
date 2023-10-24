<script lang="ts" setup>
import TableDialogManager from "./components/global/TableDialogManager.vue";
import GenerateConfigurator from "./components/global/GenerateConfigurator.vue";
</script>

<template>
	<div class="layout">
		<RouterView>
		</RouterView>
		<TableDialogManager></TableDialogManager>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
