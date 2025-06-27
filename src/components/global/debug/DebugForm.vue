<script setup lang="ts">
import {DEBUG_CONSTANTS, useDebugStore} from "@/store/debug/DebugStore.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import Details from "@/components/global/common/Details.vue";
import {DeleteFilled} from "@element-plus/icons-vue";
import {datetimeFormat} from "@/utils/dateFormat.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const debugStore = useDebugStore()
</script>

<template>
	<el-form label-width="6em" label-position="left">
		<Details>
			<template #title>
				<el-text>{{ i18nStore.translate('LABEL_DebugLog_config') }}</el-text>
			</template>
			<el-form-item :label="i18nStore.translate('LABEL_DebugLog_filterTypes')">
				<el-select multiple v-model="debugStore.filterTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"/>
				</el-select>
			</el-form-item>
			<el-form-item :label="i18nStore.translate('LABEL_DebugLog_outputTypes')">
				<el-select multiple v-model="debugStore.outputTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"/>
				</el-select>
			</el-form-item>
			<el-form-item :label="i18nStore.translate('LABEL_DebugLog_collectTypes')">
				<el-select multiple v-model="debugStore.collectTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"/>
				</el-select>
			</el-form-item>
		</Details>

		<div style="text-align: right;">
			<el-button :icon="DeleteFilled" link type="warning"
					   @click="debugStore.cleanLogs()">
				{{ i18nStore.translate('BUTTON_clear') }}
			</el-button>
		</div>

		<ViewList
			:lines="debugStore.filteredLogs"
			:columns="[
				{
					prop: 'type',
					label: 'LABEL_DEBUG_type',
					span: '4em'
				},
				{
					prop: 'message',
					label: 'LABEL_DEBUG_message',
				},
				{
					prop: 'timestamp',
					label: 'LABEL_DEBUG_timestamp',
					span: '8em'
				},
			]"
			height="auto">

			<template #message="{data, propData}">
				<Details :disabled="!(data.data)" position="right">
					<template #title>
						<el-text v-text="propData ?? '[no message]'"/>
					</template>

					<div style="max-width: 30em; white-space: pre;">
						<el-text v-text="data.data"/>
					</div>
				</Details>
			</template>

			<template #timestamp="{propData}">
				<el-text>{{ datetimeFormat(propData) }}</el-text>
			</template>
		</ViewList>
	</el-form>
</template>

<style scoped>

</style>
