<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenColumnDefaultInput, GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendI18nMessage} from "@/message/message.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {cloneDeep} from "lodash";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";
import {validateColumnDefaultInput} from "@/shape/GenColumnDefaultInput.ts";
import {validateColumnDefaultForm} from "@/components/business/columnDefault/validate.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const editState = ref(false)

const columnDefaultProps = <Array<PropListColumn<GenColumnDefaultInput> | ListColumn<GenColumnDefaultInput>>>[
	{
		prop: 'dataSourceType',
		label: 'LABEL_GenColumnDefault_dataSourceType',
		span: '7em'
	},
	{
		prop: 'typeCode',
		label: 'LABEL_GenColumnDefault_typeCode',
	},

	{
		name: 'segment',
		label: 'LABEL_GenColumnDefault_segment',
		span: '2em'
	},

	{
		prop: 'rawType',
		label: 'LABEL_GenColumnDefault_rawType',
	},
	{
		prop: 'dataSize',
		label: 'LABEL_GenColumnDefault_dataSize',
	},
	{
		prop: 'numericPrecision',
		label: 'LABEL_GenColumnDefault_numericPrecision',
	},
	{
		prop: 'defaultValue',
		label: 'LABEL_GenColumnDefault_defaultValue',
	},
	{
		prop: 'remark',
		label: 'LABEL_GenColumnDefault_remark',
	},
]

const jdbcTypeStore = useJdbcTypeStore()

const genConfigStore = useGlobalGenConfigStore()

const columnDefaultStore = useColumnDefaultStore()

const columnDefaults = ref<GenColumnDefaultView[]>([])

const tempColumnDefaults = ref<GenColumnDefaultView[]>([])

const defaultColumnDefault = ref<GenColumnDefaultInput>({
	rawType: 'VARCHAR',
	typeCode: 12,
	dataSize: 0,
	numericPrecision: 0,
	remark: "",
	orderKey: 0,
})

genConfigStore.onLoaded(() => {
	if (genConfigStore.genConfig) {
		defaultColumnDefault.value.dataSourceType = genConfigStore.genConfig.dataSourceType
	}
})

jdbcTypeStore.onLoaded(() => {
	const first = jdbcTypeStore.jdbcTypeList[0]

	if (first) {
		defaultColumnDefault.value.rawType = first.type
		defaultColumnDefault.value.typeCode = first.typeCode
	}
})

onMounted(async () => {
	if (genConfigStore.isLoaded) {
		columnDefaults.value = columnDefaultStore.columnDefaults
	} else {
		const temp = await columnDefaultStore.reset()
		if (temp) {
			columnDefaults.value = temp
		}
	}
})

const handleEdit = async () => {
	tempColumnDefaults.value = cloneDeep(columnDefaults.value)
	editState.value = true
}

const handleSubmit = async () => {
	const messageList = validateColumnDefaultForm(tempColumnDefaults.value)

	if (messageList.length > 0) {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return
	}

	tempColumnDefaults.value.forEach((columnDefault, index) => {
		columnDefault.orderKey = index
	})
	const ids = await api.columnDefaultService.saveAll({body: tempColumnDefaults.value})

	await columnDefaultStore.reset()

	if (ids.length === tempColumnDefaults.value.length) {
		columnDefaults.value = tempColumnDefaults.value
		sendI18nMessage('MESSAGE_edit_success', 'success')
		editState.value = false
	} else {
		sendI18nMessage('MESSAGE_edit_fail', 'error', tempColumnDefaults)
	}
}

const handleCancel = () => {
	editState.value = false
}
</script>

<template>
	<template v-if="columnDefaultStore.isLoaded">
		<template v-if="editState">
			<EditList
				:columns="columnDefaultProps"
				v-model:lines="tempColumnDefaults"
				:defaultLine="defaultColumnDefault"
				:json-schema-validate="validateColumnDefaultInput"
				height="2em">
				<template #dataSourceType="{data}">
					<el-select v-model="data.dataSourceType" clearable placeholder="【ANY】">
						<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
								   :value="dataSourceType"></el-option>
					</el-select>
				</template>

				<template #typeCode="{data}">
					<el-select
						v-model="data.typeCode"
						@change="(typeCode: number) => {
								data.rawType = jdbcTypeStore.jdbcTypeMap.get(typeCode)!
							}"
						filterable
						style="width: 100%">
						<el-option v-for="type in jdbcTypeStore.jdbcTypeList"
								   :label="type.type" :value="type.typeCode"></el-option>
					</el-select>
				</template>

				<template #dataSize="{data}">
					<el-input-number v-model="data.dataSize" controls-position="right"></el-input-number>
				</template>

				<template #numericPrecision="{data}">
					<el-input-number v-model="data.numericPrecision" controls-position="right"></el-input-number>
				</template>
			</EditList>

			<div style="text-align: right">
				<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
				<el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
			</div>
		</template>

		<template v-else>
			<ViewList :columns="columnDefaultProps" :lines="columnDefaults" height="2em">
				<template #dataSourceType="{propData}">
					<el-text v-text="propData ?? '【ANY】'"></el-text>
				</template>
				<template #typeCode="{data}">
					<el-text v-text="jdbcTypeStore.jdbcTypeMap.get(data.typeCode)"></el-text>
				</template>
			</ViewList>

			<div style="text-align: right">
				<el-button type="warning" @click="handleEdit">{{ i18nStore.translate('BUTTON_edit') }}</el-button>
			</div>
		</template>
	</template>
</template>
