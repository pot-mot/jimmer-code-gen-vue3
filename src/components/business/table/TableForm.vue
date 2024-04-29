<script lang="ts" setup>
import {computed, DeepReadonly, ref, watch} from 'vue'
import {
	GenModelInput_TargetOf_enums,
	GenTableModelInput,
	GenTableModelInput_TargetOf_indexes,
	GenTableModelInput_TargetOf_indexes_TargetOf_columns,
} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import {tableColumnColumns} from "@/components/business/table/tableColumnColumns.ts";
import ColumnTypeForm from "@/components/business/table/ColumnTypeForm.vue";
import {useJdbcTypeStore} from "@/components/business/jdbcType/jdbcTypeStore.ts";
import {tableIndexColumns} from "@/components/business/table/tableIndexColumns.ts";
import Details from "@/components/global/common/Details.vue";
import {getDefaultColumn, getDefaultIndex, getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {validateColumn, validateIndex} from "@/shape/GenTableModelInput.ts";
import {Refresh} from "@element-plus/icons-vue";
import {getLegalSuperTables} from "@/components/business/table/tableInheritAnalyse.ts";

const jdbcTypeStore = useJdbcTypeStore()

interface ModelFormProps {
	table?: GenTableModelInput,
	getSuperTables: () => DeepReadonly<Array<GenTableModelInput>>,
	getEnums: () => Array<GenModelInput_TargetOf_enums>,

	validate: (table: DeepReadonly<GenTableModelInput>) => string[],

	createIndexName: (index: DeepReadonly<GenTableModelInput_TargetOf_indexes>) => string
}

const props = defineProps<ModelFormProps>()

interface ModelFormEmits {
	(event: "createEnum"): void

	(event: "editEnum", data: { genEnum: GenModelInput_TargetOf_enums }): void
}

const emits = defineEmits<FormEmits<GenTableModelInput> & ModelFormEmits>()

const table = ref<GenTableModelInput>(getDefaultTable())

watch(() => props.table, (value) => {
	if (!value) return
	table.value = value
}, {immediate: true})

const getSelectableSuperTables = () => {
	return getLegalSuperTables(
		table.value,
		props.getSuperTables()
	)
}

const getSelectableSuperTableNames = () => {
	return getSelectableSuperTables().map(it => it.name)
}

const superTableNames = ref(getSelectableSuperTableNames())

const columnNames = ref<string[]>(table.value.columns.map(it => it.name))
const syncColumnNames = () => {
	columnNames.value = table.value.columns.map(it => it.name)
}

// 记录原始表类型
let baseTableType = (props.table?.type === "SUPER_TABLE" ? "TABLE" : props.table?.type) ?? "TABLE"

// 是否是上级表
const isSuperTable = computed<boolean>({
	get: () =>
		table.value.type === "SUPER_TABLE",
	set: (value: boolean) => {
		if (value) table.value.type = "SUPER_TABLE"
		else table.value.type = baseTableType
	}
})

const handleInputColumnName = (newName: string, index: number) => {
	const oldName = columnNames.value[index]

	if (oldName !== newName && columnNames.value.filter(it => it === newName).length > 0) {
		sendMessage('新列名存在同名', 'warning')
		return
	}

	table.value.indexes.forEach(index => {
		const newIndexColumns: GenTableModelInput_TargetOf_indexes_TargetOf_columns[] = []
		index.columns.forEach(it => {
			if (it.name === oldName) {
				newIndexColumns.push({name: newName})
			} else {
				newIndexColumns.push(it)
			}
		})
		index.columns = newIndexColumns
	})

	syncColumnNames()
}

const handleColumnToPk = (pkIndex: number) => {
	if (!jdbcTypeStore.isLoaded) {
		sendMessage('数据库类型未成功获取')
		return
	}

	const pkColumn = table.value.columns[pkIndex]
	pkColumn.typeNotNull = true
	pkColumn.rawType = "BIGINT"
	pkColumn.enum = undefined
	pkColumn.typeCode = jdbcTypeStore.jdbcTypes[pkColumn.rawType]!
	pkColumn.logicalDelete = false
	pkColumn.businessKey = false

	// 主键变更将排除其他主键
	table.value.columns.forEach((column, index) => {
		if (index !== pkIndex && column.partOfPk) {
			column.partOfPk = false
			column.autoIncrement = false
		}
	})
}

const handleSuperTablesChange = (value: string[]) => {
	table.value.superTables = value.map(it => {
		return {name: it}
	})
}

const handleEnumEdit = (name: string) => {
	let genEnum = props.getEnums().filter(it => it.name === name)[0]
	if (!genEnum) {
		sendMessage(`枚举【${name}】不存在`)
		return
	}
	emits('editEnum', {genEnum})
}

const handleSubmit = () => {
	const messageList = props.validate(table.value)

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	emits('submit', table.value)
}

const handleCancel = () => {
	emits('cancel', table.value)
}
</script>

<template>
	<el-form style="width: 98%;">
		<el-row :gutter="12" style="line-height: 2em; padding-left: 1em;">
			<el-col :span="8">
				<el-input v-model="table.name" placeholder="name"></el-input>
			</el-col>

			<el-col :span="8">
				<el-text class="comment">
					<span>/* </span>
					<span><el-input v-model="table.comment" placeholder="comment"></el-input></span>
					<span> */</span>
				</el-text>
			</el-col>

			<el-col :span="7">
				<el-select disabled :placeholder="table.type"></el-select>
			</el-col>

			<el-col :span="23">
				<el-input v-model="table.remark" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="remark"
						  type="textarea"></el-input>
			</el-col>
		</el-row>

		<Details open style="padding-bottom: 0.5em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">继承与上级表</el-text>
			</template>

			<el-row :gutter="12" style="line-height: 2em; width: 80%;">
				<el-col :span="6">
					<el-checkbox v-model="isSuperTable" label="作为上级表"></el-checkbox>
				</el-col>

				<el-col :span="16">
					<el-select :model-value="table.superTables.map(it => it.name)" multiple filterable
							   placeholder="继承的上级表" style="width: 100%;"
							   @change="handleSuperTablesChange">
						<el-option v-for="name in superTableNames" :value="name"></el-option>
					</el-select>
				</el-col>

				<el-col :span="2">
					<el-tooltip content="刷新高级表多选列表">
						<el-button :icon="Refresh"
								   @click="superTableNames = getSelectableSuperTableNames()"></el-button>
					</el-tooltip>
				</el-col>
			</el-row>
		</Details>

		<Details open style="padding-bottom: 0.5em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">列</el-text>
			</template>

			<EditList
				:columns="tableColumnColumns"
				v-model:lines="table.columns"
				@update:lines="syncColumnNames"
				:defaultLine="getDefaultColumn"
				:json-schema-validate="validateColumn"
				style="width: 98%;">

				<template #icon="{data}">
					<ColumnIcon :column="data"></ColumnIcon>
				</template>

				<template #columnType="{data, index}">
					<el-tooltip :auto-close="500" content="主键">
						<el-checkbox v-model="data.partOfPk"
									 class="cling-checkbox"
									 @change="(value: boolean) => {
										 if (value) handleColumnToPk(index)
									 }"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="data.partOfPk" :auto-close="500" content="自增">
						<el-checkbox v-model="data.autoIncrement"
									 class="cling-checkbox"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="!data.partOfPk" :auto-close="500" content="业务键">
						<el-checkbox v-model="data.businessKey"
									 class="cling-checkbox"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="!data.partOfPk" :auto-close="500" content="逻辑删除">
						<el-checkbox v-model="data.logicalDelete"
									 class="cling-checkbox"></el-checkbox>
					</el-tooltip>
				</template>

				<template #name="{data, index}">
					<el-input v-model="data.name"
							  @input="(value: string) => {
								  handleInputColumnName(value, index)
							  }"></el-input>
				</template>

				<template #comment="{data}">
					<el-text class="comment">
						<span>/* </span>
						<span><el-input v-model="data.comment" placeholder="comment"></el-input></span>
						<span> */</span>
					</el-text>
				</template>

				<template #type="{data}">
					<ColumnTypeForm
						:enumNames="getEnums().map(it => it.name)"
						:model-value="data"
						@create-enum="emits('createEnum')"
						@edit-enum="handleEnumEdit"
					></ColumnTypeForm>
				</template>

				<template #typeNotNull="{data}">
					<el-checkbox v-model="data.typeNotNull" :disabled="data.partOfPk"></el-checkbox>
				</template>

				<template #defaultValue="{data}">
					<el-input v-model="data.defaultValue" :disabled="data.partOfPk"></el-input>
				</template>
			</EditList>
		</Details>

		<Details open style="padding-bottom: 3em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">索引</el-text>
			</template>

			<EditList
				:default-line="getDefaultIndex"
				:columns="tableIndexColumns"
				v-model:lines="table.indexes"
				:json-schema-validate="validateIndex"
				height="auto"
				style="width: 98%;">

				<template #uniqueIndex="{data}">
					<el-switch v-model="data.uniqueIndex"
							   @change="data.name = createIndexName(data)"></el-switch>
				</template>

				<template #columns="{data}">
					<el-select :model-value="data.columns.map(it => it.name)" multiple filterable style="width: 100%;"
							   @change="(value: string[]) => {
								   data.columns = value.map(it => {return {name: it}})
								   data.name = createIndexName(data)
							   }"
							   @focus="syncColumnNames">
						<el-option v-for="name in columnNames" :value="name"></el-option>
					</el-select>
				</template>
			</EditList>
		</Details>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
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
