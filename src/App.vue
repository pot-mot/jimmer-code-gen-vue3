<script lang="ts" setup>
import {useGlobalLoadingStore} from "./components/global/loading/GlobalLoadingStore.ts";
import GenerateConfigurator from "@/components/business/globalConfig/GenerateConfigurator.vue";

const loadingStore = useGlobalLoadingStore()
</script>

<template>
	<div class="layout" v-loading.fullscreen.lock="loadingStore.isLoading()">
		<RouterView></RouterView>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
