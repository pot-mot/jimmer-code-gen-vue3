<script lang="ts" setup>
import TableDialogManager from "./components/global/TableDialogManager/index.vue";
import GenerateConfigurator from "./components/global/GenerateConfigurator/index.vue";
</script>

<template>
	<div class="layout">
		<RouterView>
		</RouterView>
		<TableDialogManager></TableDialogManager>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
