<script lang="ts" setup>
import {useGlobalLoadingStore} from "./components/global/loading/GlobalLoadingStore.ts";
import GenerateConfigurator from "@/components/business/globalConfig/GenerateConfigurator.vue";
import {useJDBCTypeStore} from "@/components/business/jdbcType/JDBCTypeStore.ts";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";

const loadingStore = useGlobalLoadingStore()

useJDBCTypeStore()
useGenConfigStore()
useColumnDefaultStore()
</script>

<template>
	<div class="layout" v-loading.fullscreen.lock="loadingStore.isLoading()">
		<RouterView></RouterView>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
