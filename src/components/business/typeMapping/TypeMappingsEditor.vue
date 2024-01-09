<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {api} from "@/api";
import {useLoading} from "@/hooks/useLoading.ts";
import {GenTypeMappingInput, GenTypeMappingView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendMessage} from "@/utils/message.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {cloneDeep, uniqWith} from "lodash";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {GenerateConfigurator} from "../globalConfig/constant.ts";
import {validateTypeMappingInput} from "@/shape/GenTypeMappingInput.ts";

const editState = ref(false)

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

const tempTypeMappings = ref<GenTypeMappingView[]>([])

const typeMappingLoading = useLoading()

const defaultTypeMapping = ref<GenTypeMappingInput>({
	dataSourceType: "MySQL",
	language: "JAVA",
	propertyType: "java.lang.String",
	typeExpression: "(.*)",
	remark: "",
	orderKey: 0,
})

const genConfigStore = useGenConfigStore()

genConfigStore.onLoaded(() => {
	if (genConfigStore.genConfig) {
		defaultTypeMapping.value.dataSourceType = genConfigStore.genConfig.dataSourceType
		defaultTypeMapping.value.language = genConfigStore.genConfig.language
		defaultTypeMapping.value.propertyType = defaultTypeMapping.value.language == "JAVA" ? "java.lang.String" : "kotlin.String"
	}
})

const getData = async () => {
	typeMappingLoading.start()
	await nextTick()

	typeMappings.value = await api.typeMappingService.list()

	await nextTick()
	typeMappingLoading.end()
}

onMounted(() => {
	getData()
})

const handleEdit = async () => {
	tempTypeMappings.value = cloneDeep(typeMappings.value)
	editState.value = true
}

const handleSubmit = async () => {
	const messageList: string[] = []

	const uniqueTypeMappings = uniqWith(tempTypeMappings.value, (mapping1, mapping2) => {
		const keys = <(keyof GenTypeMappingInput)[]>['dataSourceType', 'language', 'propertyType', 'typeExpression']
		for (let key of keys) {
			if (mapping1[key] != mapping2[key]) {
				return false
			}
		}
		return true
	})

	if (tempTypeMappings.value.some(mapping => mapping.typeExpression.length == 0 || mapping.propertyType.length == 0)) {
		messageList.push('TypeMapping 数据库类型表达式与属性均不可为空');
	}

	if (uniqueTypeMappings.length != tempTypeMappings.value.length) {
		messageList.push('TypeMapping 不可重复');
	}

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	tempTypeMappings.value.forEach((typeMapping, index) => {
		typeMapping.orderKey = index
	})
	const ids = await api.typeMappingService.saveAll({body: tempTypeMappings.value})
	if (ids.length == tempTypeMappings.value.length) {
		sendMessage('配置修改成功', 'success')
		typeMappings.value = tempTypeMappings.value
		editState.value = false
	} else {
		sendMessage('配置修改出错', 'error')
	}
}

const handleCancel = () => {
	editState.value = false
}
</script>

<template>
	<div v-loading="typeMappingLoading.isLoading()">
		<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">
			{{ GenerateConfigurator.TypeMappingsEditor.label }}
		</h3>

		<template v-if="editState">
			<EditList
				:columns="typeMappingProps"
				v-model:lines="tempTypeMappings"
				:defaultLine="defaultTypeMapping"
				:json-schema-validate="validateTypeMappingInput"
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
		</template>

		<template v-else>
			<ViewList :columns="typeMappingProps" :lines="typeMappings" height="2em"></ViewList>

			<div style="text-align: right">
				<el-button type="warning" @click="handleEdit">编辑</el-button>
			</div>
		</template>
	</div>
</template>
