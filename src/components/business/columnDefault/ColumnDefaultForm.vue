<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenColumnDefaultInput, GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendMessage} from "@/message/message.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {cloneDeep} from "lodash";
import {useJdbcTypeStore} from "@/components/business/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useGlobalGenConfigStore} from "@/components/business/genConfig/GlobalGenConfigStore.ts";
import {validateColumnDefaultInput} from "@/shape/GenColumnDefaultInput.ts";
import {validateColumnDefaultForm} from "@/components/business/columnDefault/validate.ts";

const editState = ref(false)

const columnDefaultProps = <Array<PropListColumn<GenColumnDefaultInput> | ListColumn<GenColumnDefaultInput>>>[
	{
		prop: 'dataSourceType',
		label: '数据源类型',
		span: '7em'
	},
	{
		prop: 'typeCode',
		label: 'Jdbc 类型',
	},

	{
		name: 'segment', label: '→', span: '2em'
	},

	{
		prop: 'rawType',
		label: '字面类型',
	},
	{
		prop: 'dataSize',
		label: '长度',
	},
	{
		prop: 'numericPrecision',
		label: '精度',
	},
	{
		prop: 'defaultValue',
		label: '默认值',
	},
	{
		prop: 'remark',
		label: '备注',
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
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	tempColumnDefaults.value.forEach((columnDefault, index) => {
		columnDefault.orderKey = index
	})
	const ids = await api.columnDefaultService.saveAll({body: tempColumnDefaults.value})

	await columnDefaultStore.reset()

	if (ids.length === tempColumnDefaults.value.length) {
		columnDefaults.value = tempColumnDefaults.value
		sendMessage('配置修改成功', 'success')
		editState.value = false
	} else {
		sendMessage('配置修改出错', 'error', tempColumnDefaults)
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
				<el-button type="info" @click="handleCancel">取消</el-button>
				<el-button type="warning" @click="handleSubmit">保存</el-button>
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
				<el-button type="warning" @click="handleEdit">编辑</el-button>
			</div>
		</template>
	</template>
</template>
