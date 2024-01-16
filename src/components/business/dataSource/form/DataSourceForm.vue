<script lang="ts" setup>
import {ref, watch} from 'vue';
import {api} from "@/api";
import {GenDataSourceInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import {ElForm, ElFormItem, ElOption, ElSelect} from "element-plus";
import {DataSourceFormEmits} from "./DataSourceFormEmits.ts";
import {DataSourceFormProps} from "./DataSourceFormProps.ts";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {useDataSourceDefaultStore} from "@/components/business/dataSource/dataSourceDefaultStore.ts";

const loadingStore = useGlobalLoadingStore()

const dataSourceDefaults = useDataSourceDefaultStore()

const props = defineProps<DataSourceFormProps>()

const dataSource = ref<GenDataSourceInput>({
	name: "",
	host: "127.0.0.1",
	port: "3306",
	urlSuffix: "",
	orderKey: 0,
	username: "",
	password: "",
	remark: "",
	type: "MySQL"
})

watch(() => dataSource.value.type, async (type) => {
	if (!props.id) {
		const defaultDataSource = dataSourceDefaults.get(type)
		dataSource.value = {
			...dataSource.value,
			...defaultDataSource,
		}
	}
}, {immediate: true})

watch(() => props.dataSource, (prop) => {
	if (prop) {
		dataSource.value = {
			...dataSource.value,
			...prop
		}
	}
}, {immediate: true})

const emits = defineEmits<DataSourceFormEmits>()

const handleTest = async () => {
	loadingStore.add()

	const res = await api.dataSourceService.test({
		body: dataSource.value
	})

	loadingStore.sub()

	if (res) {
		sendMessage("数据源测试成功", "success")
		return true
	} else {
		sendMessage("数据源测试失败", "error")
		return false
	}
}

const handleSubmit = async () => {
	const testResult = await handleTest()

	if (!testResult) return

	loadingStore.add()

	if (props.id) {
		await api.dataSourceService.edit({
			id: props.id,
			body: dataSource.value
		})

		emits("updated")
	} else {
		const id = await api.dataSourceService.create({
			body: dataSource.value
		})
		const savedDataSource = await api.dataSourceService.get({id})

		if (savedDataSource) {
			emits("added", savedDataSource)
		} else {
			sendMessage('数据源保存失败', 'error', savedDataSource)
		}
	}

	loadingStore.sub()
}
</script>

<template>
	<el-form label-position="left" label-width="6em">
		<el-form-item label="name">
			<el-input v-model="dataSource.name"></el-input>
		</el-form-item>

		<el-form-item label="url">
			<Line>
				<LineItem span="1fr">
					<el-select v-model="dataSource.type" class="cling-right" filterable name="type">
						<template #prefix>jdbc:</template>
						<el-option v-for="(type) in DataSourceType_CONSTANTS" :label="type.toLowerCase()"
								   :value="type"></el-option>
					</el-select>
				</LineItem>

				<LineItem span="1fr">
					<el-input v-model="dataSource.host" class="cling-left cling-right" name="host">
						<template #prefix>://</template>
					</el-input>
				</LineItem>

				<LineItem span="0.6fr">
					<el-input v-model="dataSource.port" class="cling-left cling-right" name="port">
						<template #prefix>:</template>
					</el-input>
				</LineItem>

				<LineItem span="0.6fr">
					<el-input v-model="dataSource.urlSuffix" class="cling-left" name="urlSuffix">
						<template #prefix>&nbsp</template>
					</el-input>
				</LineItem>
			</Line>
		</el-form-item>

		<el-form-item label="username">
			<el-input v-model="dataSource.username"></el-input>
		</el-form-item>

		<el-form-item label="password">
			<el-input v-model="dataSource.password" show-password></el-input>
		</el-form-item>

		<el-form-item label="remark">
			<el-input v-model="dataSource.remark" type="textarea"></el-input>
		</el-form-item>

		<el-form-item>
			<div style="text-align: right;">
				<el-button type="info" @click="handleTest">测试</el-button>
				<el-button type="warning" @click="handleSubmit">提交</el-button>
			</div>
		</el-form-item>
	</el-form>
</template>
