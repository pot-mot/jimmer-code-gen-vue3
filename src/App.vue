<script lang="ts" setup>
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import GlobalConfig from "@/components/business/globalConfig/GlobalConfig.vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";
import {useColumnDefaultStore} from "@/store/columnDefault/ColumnDefaultStore.ts";
import {useDataSourceDefaultStore} from "@/store/dataSource/DataSourceDefaultStore.ts";
import {onBeforeMount} from "vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const loadingStore = useGlobalLoadingStore()
const i18nStore = useI18nStore()

onBeforeMount(loadingStore.withLoading(
	'Stores init',
	async () => {
		await Promise.all([
			useJdbcTypeStore().init(),
			useGlobalGenConfigStore().init(),
			useColumnDefaultStore().init(),
			useDataSourceDefaultStore().init()
		])
	}
))
</script>

<template>
	<el-config-provider :locale="i18nStore.elementLocale">
		<div class="layout" v-loading.fullscreen.lock="loadingStore.isLoading">
			<RouterView/>
			<GlobalConfig/>
		</div>
	</el-config-provider>
</template>
