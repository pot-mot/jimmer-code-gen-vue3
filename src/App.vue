<script lang="ts" setup>
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import GenerateConfigurator from "@/components/business/globalConfig/GlobalConfig.vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useDataSourceDefaultStore} from "@/store/dataSource/dataSourceDefaultStore.ts";
import {onBeforeMount} from "vue";

const loadingStore = useGlobalLoadingStore()

onBeforeMount(async () => {
    const key = loadingStore.start('Stores init')

    await Promise.all([
        useJdbcTypeStore().init(),
        useGlobalGenConfigStore().init(),
        useColumnDefaultStore().init(),
        useDataSourceDefaultStore().init()
    ])

    loadingStore.stop(key)
})
</script>

<template>
	<div class="layout" v-loading.fullscreen.lock="loadingStore.isLoading">
		<RouterView></RouterView>
		<GenerateConfigurator></GenerateConfigurator>
	</div>
</template>
