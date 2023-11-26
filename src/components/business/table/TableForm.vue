<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import {cloneDeep} from 'lodash'
import {GenTableColumnsInput} from "@/api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {api} from "@/api";
import {objToMap} from "@/utils/mapOperation.ts";
import {useLoading} from "@/hooks/useLoading.ts";
import {sendMessage} from "@/utils/message.ts";
import {useModelEditorStore} from "../../pages/ModelEditor/store/ModelEditorStore.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import {ListColumn, PropListColumn} from "@/components/global/list/ListProps.ts";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";

const store = useModelEditorStore()

const columnTypeMap = ref(new Map<string, number>)

const columnTypeMapLoading = useLoading()

const tableColumnProps = <(PropListColumn<GenTableColumnsInput_TargetOf_columns> | ListColumn<GenTableColumnsInput_TargetOf_columns>)[]>[
	{
		name: 'icon',
		span: '1.5em'
	},
	{
		prop: 'partOfPk',
		label: '主键',
		span: '2em',
	},
	{
		prop: 'name',
		label: '列名',
	},
	{
		prop: 'comment',
		label: '注释',
		span: '1.2fr',
	},
	{
		prop: 'partOfUniqueIdx',
		label: '唯一/键',
		span: '3em',
	},
	{
		prop: 'type',
		label: '字面类型',
	},
	{
		prop: 'typeCode',
		label: 'JDBC 类型',
	},
	{
		prop: 'displaySize',
		label: '长度与精度',
		span: '1.5fr',
	},
	{
		name: 'typeNotNull',
		label: '非空',
		span: '1.5em',
	},
	{
		prop: 'defaultValue',
		label: '默认值',
	},
]

onMounted(async () => {
	columnTypeMapLoading.start()
	await nextTick()

	const columnTypeMapObj = await api.modelService.listDatabaseType()
	columnTypeMap.value = objToMap(columnTypeMapObj)

	await nextTick()
	columnTypeMapLoading.end()
})


const defaultTable: GenTableColumnsInput = {
	name: "",
	comment: "",
	remark: "",
	orderKey: 0,
	type: "TABLE",
	columns: []
}

const defaultColumn: GenTableColumnsInput_TargetOf_columns = {
	orderKey: 0,
	name: "",
	comment: "",
	type: "VARCHAR",
	typeCode: 12,
	typeNotNull: true,
	displaySize: 0,
	numericPrecision: 0,
	defaultValue: undefined,
	partOfPk: false,
	autoIncrement: false,
	partOfFk: false,
	partOfUniqueIdx: false,
	remark: "",
	logicalDelete: false,
	businessKey: false,
	enumId: undefined,
}

interface ModelFormProps {
	id?: string,
	table?: GenTableColumnsInput
}

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenTableColumnsInput>>()

const table = ref<GenTableColumnsInput>(cloneDeep(defaultTable))

watch(() => props.table, (value) => {
	if (!value) return

	table.value = cloneDeep(value)

}, {immediate: true})

const handleColumnToPk = (pkIndex: number) => {
	const pkColumn = table.value.columns[pkIndex]
	pkColumn.typeNotNull = true
	pkColumn.type = "BIGINT"
	pkColumn.typeCode = columnTypeMap.value!.get(pkColumn.type)!
	pkColumn.partOfUniqueIdx = true

	table.value.columns.forEach((column, index) => {
		if (index != pkIndex && column.partOfPk) {
			column.partOfPk = false
			column.autoIncrement = false
		}
	})
}

const handleSubmit = () => {
	const messageList: string[] = []

	if (table.value.name.trim().length == 0) {
		messageList.push('表名不得为空')
	}

	if (store.nodes
		.filter(node => node.id != props.id)
		.map(it => it.getData().table.name.trim())
		.filter(name => name == table.value.name.trim())
		.length > 0) {
		messageList.push('表名不可重复')
	}

	const nameSet = new Set<string>(table.value.columns.map(it => it.name.trim()))

	for (let columnName of nameSet.values()) {
		if (columnName.length == 0) {
			messageList.push('列名不得为空')
			break
		}
	}

	if (nameSet.size < table.value.columns.length) {
		messageList.push('列名不可重复')
	}

	if (table.value.columns.filter(column => column.partOfPk).length != 1) {
		messageList.push('表必须有且仅有一个主键列')
	} else {
		const pk = table.value.columns.filter(column => column.partOfPk)[0]

		if (!pk.partOfUniqueIdx) {
			messageList.push('主键列必须唯一')
		}

		if (!pk.typeNotNull) {
			messageList.push('主键列必须非空')
		}
	}

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	table.value.columns.forEach((column, index) => {
		column.orderKey = index + 1
	})

	emits('submit', table.value)
}

const handleCancel = () => {
	emits('cancel', table.value)
}
</script>

<template>
	<el-form v-if="!columnTypeMapLoading.isLoading()" style="width: 98%;">
		<el-row :gutter="12" style="line-height: 2em; padding-left: 1em;">
			<el-col :span="6">
				<el-input v-model="table.name" placeholder="name"></el-input>
			</el-col>

			<el-col :span="8">
				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="table.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>
			</el-col>

			<el-col :span="18">
				<el-input v-model="table.remark" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="remark"
						  type="textarea"></el-input>
			</el-col>
		</el-row>

		<EditList
			:columns="tableColumnProps"
			v-model:lines="table.columns"
			:default-line="defaultColumn">

			<template #icon="{data}">
				<ColumnIcon :column="data"></ColumnIcon>
			</template>

			<template #partOfPk="{data, index}">
				<el-checkbox v-model="data.partOfPk"
							 class="cling-checkbox"
							 @change="(value: boolean) => {if (value) handleColumnToPk(index)}"></el-checkbox>
				<el-tooltip v-if="data.partOfPk" :auto-close="500" content="自增">
					<el-checkbox v-model="data.autoIncrement" class="cling-checkbox"></el-checkbox>
				</el-tooltip>
			</template>

			<template #comment="{data}">
				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="data.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>
			</template>

			<template #partOfUniqueIdx="{data}">
				<el-checkbox v-model="data.partOfUniqueIdx" class="cling-checkbox"></el-checkbox>
				<el-checkbox v-model="data.businessKey" class="cling-checkbox"></el-checkbox>
			</template>

			<template #typeCode="{data}">
				<el-select v-model="data.typeCode" clearable filterable>
					<el-option v-for="key in [...columnTypeMap.keys()]" :label="key"
							   :value="columnTypeMap.get(key)!"></el-option>
				</el-select>
			</template>

			<template #displaySize="{data}">
				<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
					<span>(</span>
					<span><el-input v-model="data.displaySize"></el-input></span>
					<span style="padding-left: 0.3em;">,</span>
					<span><el-input v-model="data.numericPrecision"></el-input></span>
					<span style="padding-left: 0.3em;">)</span>
				</el-text>
			</template>

			<template #typeNotNull="{data}">
				<el-checkbox v-model="data.typeNotNull"></el-checkbox>
			</template>

			<template #defaultValue="{data}">
				<el-tooltip :auto-close="2000">
					<el-input v-model="data.defaultValue" placeholder="default"></el-input>

					<template #content>
						此处将直接拼入 ddl，如果是字符串请加上引号
					</template>
				</el-tooltip>
			</template>
		</EditList>

		<div style="text-align: right;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
	<el-empty v-else></el-empty>
</template>

<style scoped>
.comment {
	display: grid;
	grid-template-columns: 1em 1fr 1em;
	color: var(--el-text-color-placeholder);
	padding-right: 0.5em;
}

.cling-checkbox {
	width: 1em;
	padding: 0;
	margin: 0;
}
</style>