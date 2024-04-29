<script setup lang="ts">
import {DEBUG_CONSTANTS, useDebugStore} from "@/debug/debugStore.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import Details from "@/components/global/common/Details.vue";
import {DeleteFilled} from "@element-plus/icons-vue";
import {datetimeFormat} from "@/utils/dateFormat.ts";

const debugStore = useDebugStore()
</script>

<template>
	<el-form label-width="6em" label-position="left">
		<Details>
			<template #title>
				<el-text>debug 配置</el-text>
			</template>
			<el-form-item label="类型过滤">
				<el-select multiple v-model="debugStore.filterTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="控制台输出">
				<el-select multiple v-model="debugStore.outputTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="收集">
				<el-select multiple v-model="debugStore.collectTypes">
					<el-option v-for="item in DEBUG_CONSTANTS" :value="item"></el-option>
				</el-select>
			</el-form-item>
		</Details>

		<div style="text-align: right;">
			<el-tooltip content="清空记录">
				<el-button :icon="DeleteFilled" link type="danger"
						   @click="debugStore.cleanLogs()"></el-button>
			</el-tooltip>
		</div>

		<ViewList
			:lines="debugStore.filteredLogs"
			:columns="[
				{
					prop: 'type',
					label: '类型',
					span: '4em'
				},
				{
					prop: 'message',
					label: '消息',
				},
				{
					prop: 'timestamp',
					label: '时间',
					span: '8em'
				},
			]"
			height="auto">

			<template #message="{data, propData}">
				<Details :disabled="!(data.data)" position="right">
					<template #title>
						<el-text v-text="propData ?? '[no message]'"></el-text>
					</template>

					<div style="max-width: 30em; white-space: pre;">
						<el-text v-text="data.data"></el-text>
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
