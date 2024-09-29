<script lang="ts" setup>
import {ref, watch} from 'vue';
import {api} from "@/api";
import {GenDataSourceInput} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
import {DataSourceFormEmits} from "./DataSourceFormEmits.ts";
import {DataSourceFormProps} from "./DataSourceFormProps.ts";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {useDataSourceDefaultStore} from "@/store/dataSource/dataSourceDefaultStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const loadingStore = useGlobalLoadingStore()

const dataSourceDefaults = useDataSourceDefaultStore()

const props = defineProps<DataSourceFormProps>()

const dataSource = ref<GenDataSourceInput>({
	name: "",
	url: "",
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
	const flag = loadingStore.start('DataSourceForm handleTest')

	const res = await api.dataSourceService.test({
		body: dataSource.value
	})

	loadingStore.stop(flag)

	if (res) {
		sendMessage("数据源测试成功", "success")
		return true
	} else {
		sendMessage("数据源测试失败", "error")
		return false
	}
}

const handleSubmit = async () => {
	const testFlag = loadingStore.start('DataSourceForm handleTest')

	const res = await api.dataSourceService.test({
		body: dataSource.value
	})

	loadingStore.stop(testFlag)

	if (!res) {
		sendMessage("数据源测试失败", "error")
		return
	}

	const flag = loadingStore.start('DataSourceForm handleSubmit')

	const id = await api.dataSourceService.save({
		body: dataSource.value
	})

	if (props.id) {
		emits("updated")
	} else {
		const savedDataSource = await api.dataSourceService.get({id})

		if (savedDataSource) {
			emits("added", savedDataSource)
		} else {
			sendMessage('数据源保存失败', 'error', savedDataSource)
		}
	}

	loadingStore.stop(flag)
}
</script>

<template>
	<el-form label-position="left" :label-width="i18nStore.language === 'zh-cn' ? '3rem' : '6em'">
		<el-form-item :label="i18nStore.translate('LABEL_DataSourceForm_name')">
			<el-input v-model="dataSource.name"/>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_DataSourceForm_url')">
			<el-col :span="6">
				<el-select v-model="dataSource.type" filterable name="type">
					<el-option v-for="type in DataSourceType_CONSTANTS"
							   :label="type.toLowerCase()" :value="type"/>
				</el-select>
			</el-col>
			<el-col :span="18">
				<el-input v-model="dataSource.url" style="width: 100%;"/>
			</el-col>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_DataSourceForm_username')">
			<el-input v-model="dataSource.username"/>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_DataSourceForm_password')">
			<el-input v-model="dataSource.password" show-password/>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_DataSourceForm_remark')">
			<el-input v-model="dataSource.remark" type="textarea"/>
		</el-form-item>

		<el-form-item>
			<div style="text-align: right;">
				<el-button type="info" @click="handleTest">{{ i18nStore.translate('BUTTON_test') }}</el-button>
				<el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
			</div>
		</el-form-item>
	</el-form>
</template>
