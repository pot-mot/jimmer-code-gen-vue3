<script lang="ts" setup>
import {ref, watch} from 'vue';
import {api} from "@/api";
import {GenDataSourceInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import {ElForm, ElFormItem, ElOption, ElSelect} from "element-plus";
import {DataSourceFormEmits} from "./DataSourceFormEmits.ts";
import {DataSourceFormProps} from "./DataSourceFormProps.ts";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";

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
		const defaultDataSource = await api.dataSourceService.getDefault({dataSourceType: type})
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

const handleTest = () => {
	api.dataSourceService.test({
		body: dataSource.value
	}).then(res => {
		if (res) {
			sendMessage("数据源测试成功", "success")
		} else {
			sendMessage("数据源测试失败", "error")
		}
	})
}

const handleSubmit = () => {
	if (props.id) {
		api.dataSourceService.edit({
			id: props.id,
			body: dataSource.value
		}).then(id => {
			if (id == props.id) {
				emits("updated")
			}
		})
	} else {
		api.dataSourceService.create({
			body: dataSource.value
		}).then(id => {
			api.dataSourceService.get({id}).then(res => {
				if (!!res) {
					emits("added", res)
				}
			})
		})
	}
}
</script>

<template>
	<el-form label-position="left" label-width="6em">
		<el-form-item label="name">
			<el-input v-model="dataSource.name"></el-input>
		</el-form-item>
		<el-form-item label="url">
			<el-col :span="9">
				<el-select v-model="dataSource.type" class="cling-right" filterable name="type">
					<template #prefix>jdbc:</template>
					<el-option v-for="(type) in DataSourceType_CONSTANTS" :label="type.toLowerCase()"
							   :value="type"></el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-input v-model="dataSource.host" class="cling-left cling-right" name="host">
					<template #prefix>://</template>
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-input v-model="dataSource.port" class="cling-left cling-right" name="port">
					<template #prefix>:</template>
				</el-input>
			</el-col>
			<el-col :span="5">
				<el-input v-model="dataSource.urlSuffix" class="cling-left" name="urlSuffix">
					<template #prefix>&nbsp</template>
				</el-input>
			</el-col>
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
			<el-button type="info" @click="handleTest">测试</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</el-form-item>
	</el-form>
</template>