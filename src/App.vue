<script lang="ts" setup>
import TableEntityDialogManager from "./components/global/TableEntityDialogManager/index.vue";
import GenerateConfigurator from "./components/global/GenerateConfigurator/index.vue";
</script>

<template>
	<div class="layout">
		<RouterView>
		</RouterView>
		<TableEntityDialogManager></TableEntityDialogManager>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
