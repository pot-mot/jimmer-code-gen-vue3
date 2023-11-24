<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {api} from "@/api";
import {useLoading} from "@/hooks/useLoading.ts";
import {GenTypeMappingInput, GenTypeMappingView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendMessage} from "@/utils/message.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";

const typeMappingProps = <PropListColumn<GenTypeMappingInput>[]>[
	{
		prop: 'dataSourceType',
		label: '数据源类型',
		span: '7em'
	},
	{
		prop: 'typeExpression',
		label: '数据库类型匹配表达式（正则）',
	},
	{
		prop: 'language',
		label: '后端语言',
		span: '7em'
	},
	{
		prop: 'propertyType',
		label: '映射类型',
	},
	{
		prop: 'remark',
		label: '备注',
	},
]

const typeMappings = ref<GenTypeMappingView[]>([])

const typeMappingLoading = useLoading()

const defaultTypeMapping = ref<GenTypeMappingInput>({
	dataSourceType: "MySQL",
	language: "JAVA",
	propertyType: "",
	remark: "",
	typeExpression: "",
	orderKey: 0,
})

const getData = async () => {
	typeMappingLoading.start()
	await nextTick()

	defaultTypeMapping.value = await api.typeMappingService.getDefault()

	typeMappings.value = await api.typeMappingService.list()

	await nextTick()
	typeMappingLoading.end()
}

onMounted(() => {
	getData()
})

const emits = defineEmits<FormEmits<GenTypeMappingInput[]>>()

const handleSubmit = async () => {
	typeMappings.value.forEach((typeMapping, index) => {
		typeMapping.orderKey = index
	})
	await api.typeMappingService.saveAll({body: typeMappings.value})
	sendMessage('配置修改成功', 'success')
	emits('submit', typeMappings.value)
}

const handleCancel = () => {
	emits('cancel', typeMappings.value)
}
</script>

<template>
	<div v-loading="typeMappingLoading.isLoading()">
		<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">类型映射配置</h3>

		<EditList
			:columns="typeMappingProps"
			v-model:lines="typeMappings"
			:default-line="defaultTypeMapping"
			height="2em">
			<template #dataSourceType="{data}">
				<el-select v-model="data.dataSourceType">
					<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
							   :value="dataSourceType"></el-option>
				</el-select>
			</template>

			<template #language="{data}">
				<el-select v-model="data.language">
					<el-option v-for="language in GenLanguage_CONSTANTS" :value="language"></el-option>
				</el-select>
			</template>
		</EditList>

		<div style="text-align: right">
			<el-button type="info" @click="handleCancel">取消</el-button>

			<el-button type="warning" @click="handleSubmit">保存</el-button>
		</div>
	</div>
</template>