<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenColumnDefaultInput, GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS} from "@/api/__generated/model/enums";
import EditList from "@/components/global/list/EditList.vue";
import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {sendMessage} from "@/utils/message.ts";
import ViewList from "@/components/global/list/ViewList.vue";
import {cloneDeep, uniqWith} from "lodash";
import {useJDBCTypeStore} from "@/components/business/jdbcType/JDBCTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {validateColumnDefaultInput} from "@/shape/GenColumnDefaultInput.ts";

const editState = ref(false)

const columnDefaultProps = <PropListColumn<GenColumnDefaultInput>[]>[
	{
		prop: 'dataSourceType',
		label: '数据源类型',
		span: '7em'
	},
	{
		prop: 'typeCode',
		label: 'JDBC 类型',
	},

	{
		prop: 'type',
		label: '类型',
	},
	{
		prop: 'displaySize',
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

const jdbcTypeStore = useJDBCTypeStore()

const genConfigStore = useGenConfigStore()

const columnDefaultStore = useColumnDefaultStore()

const columnDefaults = ref<GenColumnDefaultView[]>([])

const tempColumnDefaults = ref<GenColumnDefaultView[]>([])

const defaultColumnDefault = ref<GenColumnDefaultInput>({
	dataSourceType: "MySQL",
	type: 'BIGINT',
	typeCode: -7,
	displaySize: 0,
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
	const first = jdbcTypeStore.list[0]

	if (first) {
		defaultColumnDefault.value.type = first.type
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
	const messageList: string[] = []

	const uniqueColumnDefaults = uniqWith(tempColumnDefaults.value, (mapping1, mapping2) => {
		const keys = <(keyof GenColumnDefaultInput)[]>['dataSourceType', 'typeCode']
		for (let key of keys) {
			if (mapping1[key] != mapping2[key]) {
				return false
			}
		}
		return true
	})

	if (uniqueColumnDefaults.length != tempColumnDefaults.value.length) {
		messageList.push('ColumnDefault 的 dataSourceType 和 typeCode 不可重复');
	}

	tempColumnDefaults.value.forEach((columnDefault) => {
		if (columnDefault.displaySize == null) {
			messageList.push('ColumnDefault 的 displaySize 不可为空');
		}
		if (columnDefault.numericPrecision == null) {
			messageList.push('ColumnDefault 的 numericPrecision 不可为空');
		}
	})

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	tempColumnDefaults.value.forEach((columnDefault, index) => {
		columnDefault.orderKey = index
	})
	const ids = await api.columnDefaultService.saveAll({body: tempColumnDefaults.value})

	await columnDefaultStore.reset()

	if (ids.length == tempColumnDefaults.value.length) {
		columnDefaults.value = tempColumnDefaults.value
		sendMessage('配置修改成功', 'success')
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
	<div v-loading="!columnDefaultStore.isLoaded">
		<template v-if="columnDefaultStore.isLoaded">
			<template v-if="editState">
				<EditList
					:columns="columnDefaultProps"
					v-model:lines="tempColumnDefaults"
					:defaultLine="defaultColumnDefault"
					:json-schema-validate="validateColumnDefaultInput"
					height="2em">
					<template #dataSourceType="{data}">
						<el-select v-model="data.dataSourceType">
							<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
									   :value="dataSourceType"></el-option>
						</el-select>
					</template>

					<template #typeCode="{data}">
						<el-select
							v-model="data.typeCode"
							@change="(typeCode: number) => {
								data.type = jdbcTypeStore.map.get(typeCode)!
							}"
							filterable
							style="width: 100%">
							<el-option v-for="type in jdbcTypeStore.list"
									   :label="type.type" :value="type.typeCode"></el-option>
						</el-select>
					</template>

					<template #displaySize="{data}">
						<el-input-number v-model="data.displaySize" controls-position="right"></el-input-number>
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
					<template #typeCode="{data}">
						<el-text>{{ jdbcTypeStore.map.get(data.typeCode) }}</el-text>
					</template>
				</ViewList>

				<div style="text-align: right">
					<el-button type="warning" @click="handleEdit">编辑</el-button>
				</div>
			</template>
		</template>
	</div>
</template>
