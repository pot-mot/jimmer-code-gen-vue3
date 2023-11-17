<script lang="ts" setup>
import GenerateConfigurator from "./components/global/config/GenerateConfigurator.vue";
import {useGlobalLoadingStore} from "./components/global/loading/GlobalLoadingStore.ts";
import TableDialogManager from "./components/TableInfo/TableDialogManager.vue";

const loadingStore = useGlobalLoadingStore()
</script>

<template>
	<div class="layout" v-loading.fullscreen.lock="loadingStore.isLoading()">
		<RouterView></RouterView>
		<GenerateConfigurator></GenerateConfigurator>
		<TableDialogManager></TableDialogManager>
	</div>
</template>
