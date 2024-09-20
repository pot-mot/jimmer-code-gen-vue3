<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {api} from "@/api";
import {useLoading} from "@/utils/useLoading.ts";
import {GenTypeMappingInput, GenTypeMappingView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendI18nMessage} from "@/message/message.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {cloneDeep} from "lodash";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";
import {validateTypeMappingInput} from "@/shape/GenTypeMappingInput.ts";
import {validateTypeMappingForm} from "@/components/business/typeMapping/validate.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const editState = ref(false)

const typeMappingProps = <PropListColumn<GenTypeMappingInput>[]>[
	{
		prop: 'dataSourceType',
		label: 'LABEL_GenTypeMapping_dataSourceType',
		span: '7em'
	},
	{
		prop: 'typeExpression',
		label: 'LABEL_GenTypeMapping_typeExpression',
	},
	{
		prop: 'language',
		label: 'LABEL_GenTypeMapping_language',
		span: '7em'
	},
	{
		prop: 'propertyType',
		label: 'LABEL_GenTypeMapping_propertyType',
	},
	{
		prop: 'remark',
		label: 'LABEL_GenTypeMapping_remark',
	},
]

const typeMappings = ref<GenTypeMappingView[]>([])

const tempTypeMappings = ref<GenTypeMappingView[]>([])

const typeMappingLoading = useLoading('TypeMappingsEditor.typeMappingLoading')

const defaultTypeMapping = ref<GenTypeMappingInput>({
	dataSourceType: "MySQL",
	language: "JAVA",
	propertyType: "java.lang.String",
	typeExpression: "(.*)",
	remark: "",
	orderKey: 0,
})

const genConfigStore = useGlobalGenConfigStore()

genConfigStore.onLoaded(() => {
	if (genConfigStore.genConfig) {
		defaultTypeMapping.value.dataSourceType = genConfigStore.genConfig.dataSourceType
		defaultTypeMapping.value.language = genConfigStore.genConfig.language
		defaultTypeMapping.value.propertyType = defaultTypeMapping.value.language === "JAVA" ? "java.lang.String" : "kotlin.String"
	}
})

const getData = async () => {
	const flag = typeMappingLoading.start('get')
	await nextTick()

	typeMappings.value = await api.typeMappingService.list()

	await nextTick()
	typeMappingLoading.stop(flag)
}

onMounted(() => {
	getData()
})

const handleEdit = async () => {
	tempTypeMappings.value = cloneDeep(typeMappings.value)
	editState.value = true
}

const handleSubmit = async () => {
	const messageList = validateTypeMappingForm(tempTypeMappings.value)

	if (messageList.length > 0) {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return
	}

	tempTypeMappings.value.forEach((typeMapping, index) => {
		typeMapping.orderKey = index
	})
	const ids = await api.typeMappingService.saveAll({body: tempTypeMappings.value})
	if (ids.length === tempTypeMappings.value.length) {
		sendI18nMessage('MESSAGE_edit_success', 'success')
		typeMappings.value = tempTypeMappings.value
		editState.value = false
	} else {
		sendI18nMessage('MESSAGE_edit_fail', 'error', tempTypeMappings)
	}
}

const handleCancel = () => {
	editState.value = false
}
</script>

<template>
	<div v-loading="typeMappingLoading.isLoading.value">
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
				<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
				<el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
			</div>
		</template>

		<template v-else>
			<ViewList :columns="typeMappingProps" :lines="typeMappings" height="2em"></ViewList>

			<div style="text-align: right">
				<el-button type="warning" @click="handleEdit">{{ i18nStore.translate('BUTTON_edit') }}</el-button>
			</div>
		</template>
	</div>
</template>
