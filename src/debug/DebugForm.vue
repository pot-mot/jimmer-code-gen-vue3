<script setup lang="ts">
import {DEBUG_CONSTANTS, useDebugStore} from "@/debug/debugStore.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import Details from "@/components/global/common/Details.vue";
import {DeleteFilled} from "@element-plus/icons-vue";

const debugStore = useDebugStore()
</script>

<template>
	<el-form label-position="top">
		<el-form-item label="收集">
			<el-select multiple v-model="debugStore.collectTypes">
				<el-option v-for="item in DEBUG_CONSTANTS" :value="item"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="控制台输出">
			<el-select multiple v-model="debugStore.outputTypes">
				<el-option v-for="item in DEBUG_CONSTANTS" :value="item"></el-option>
			</el-select>
		</el-form-item>

		<div style="text-align: right;">
			<el-tooltip content="清空记录">
				<el-button :icon="DeleteFilled" link type="danger"
						   @click="debugStore.cleanLogs()"></el-button>
			</el-tooltip>
		</div>

		<ViewList
			:lines="debugStore.debugLogs"
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
					span: '6em'
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
		</ViewList>
	</el-form>
</template>

<style scoped>

</style>
