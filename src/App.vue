<script lang="ts" setup>
import GenerateConfigurator from "./components/global/GenerateConfigurator/index.vue";
import {useGlobalLoadingStore} from "./components/global/store/GlobalLoadingStore.ts";

const loadingStore = useGlobalLoadingStore()
</script>

<template>
	<div class="layout" v-loading="loadingStore.isLoading()">
		<RouterView></RouterView>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
