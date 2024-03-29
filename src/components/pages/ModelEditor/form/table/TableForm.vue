<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {
	GenTableModelInput,
	GenTableModelInput_TargetOf_indexes_TargetOf_columns
} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
import {useModelEditorStore} from "../../store/ModelEditorStore.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import {tableColumnColumns} from "@/components/business/table/tableColumnColumns.ts";
import ColumnTypeForm from "@/components/business/table/ColumnTypeForm.vue";
import {useJdbcTypeStore} from "@/components/business/jdbcType/jdbcTypeStore.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {tableIndexColumns} from "@/components/business/table/tableIndexColumns.ts";
import Details from "@/components/global/common/Details.vue";
import {getDefaultTable, getDefaultColumn, getDefaultIndex} from "@/components/business/table/defaultTable.ts";
import {validateColumn, validateIndex} from "@/shape/GenTableModelInput.ts";
import {createIndexName} from "@/components/pages/ModelEditor/graph/nameTemplate/createIndexName.ts";

const store = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

interface ModelFormProps {
	id?: string,
	table?: GenTableModelInput
}

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenTableModelInput>>()

const table = ref<GenTableModelInput>(getDefaultTable())

watch(() => props.table, (value) => {
	if (!value) return
	table.value = value
}, {immediate: true})

const checkConfig = ref({
	onlyOnePk: true
})

const columnNames = computed<string[]>(() => {
	return table.value.columns.map(it => it.name)
})

watch(() => table.value.columns, () => {
	table.value.indexes.forEach(index => {
		const newColumns: GenTableModelInput_TargetOf_indexes_TargetOf_columns[] = []
		index.columns.forEach(column => {
			if (columnNames.value.includes(column.name)) {
				newColumns.push(column)
			}
		})
		index.columns = newColumns
	})
})

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

	if (checkConfig.value.onlyOnePk) {
		table.value.columns.forEach((column, index) => {
			if (index !== pkIndex && column.partOfPk) {
				column.partOfPk = false
				column.autoIncrement = false
			}
		})
	}
}

const handleSubmit = () => {
	const messageList: string[] = []

	if (table.value.name.length === 0) {
		messageList.push('表名不得为空')
	}

	if (store.nodes
		.filter(node => node.id !== props.id)
		.map(it => it.getData().table.name)
		.filter(name => name === table.value.name)
		.length > 0) {
		messageList.push('表名不可重复')
	}

	for (let column of table.value.columns) {
		if (column.enum !== undefined && !store._currentModel().enums.map(it => it.name).includes(column.enum.name)) {
			messageList.push(`column ${column.name} 对应的 enum ${column.enum.name} 不存在，已自动移除`)
			column.enum = undefined
		}
		if (!column.name) {
			messageList.push('列名不得为空')
		}
		if (column.dataSize === null) {
			messageList.push('column 的 dataSize 不可为空');
		}
		if (column.numericPrecision === null) {
			messageList.push('column 的 numericPrecision 不可为空');
		}
	}

	const columnNameSet = new Set<string>(table.value.columns.map(it => it.name))

	if (columnNameSet.size !== table.value.columns.length) {
		messageList.push('列名不可重复')
	}

	const indexNameSet = new Set<string>(table.value.indexes.map(it => it.name))

	for (let indexName of indexNameSet.values()) {
		if (indexName.length === 0) {
			messageList.push('索引名不得为空')
			break
		}
	}
	if (indexNameSet.size !== table.value.indexes.length) {
		messageList.push('索引名不可重复')
	}

	for (let index of table.value.indexes) {
		const newColumns = []
		for (let column of index.columns) {
			if (!columnNames.value.includes(column.name)) {
				messageList.push(`索引 ${index.name} 引用列 ${column.name} 不存在，已自动移除`)
			} else {
				newColumns.push(column)
			}
		}

		if (newColumns.length === 0) {
			messageList.push('索引引用列不得为空')
			break
		}

		const columnNameSet = new Set<string>(newColumns.map(it => it.name))
		for (let columnName of columnNameSet.values()) {
			if (columnName.length === 0) {
				messageList.push('索引引用列名不得为空')
				break
			}
		}
		if (columnNameSet.size !== newColumns.length) {
			messageList.push('索引引用列名不可重复')
		}

		index.columns = newColumns
	}

	const pkColumns = table.value.columns.filter(column => column.partOfPk)

	if (pkColumns.length !== 1 && checkConfig.value.onlyOnePk) {
		messageList.push('实体模型主键列数量仅可为一')
	}

	for (let pkColumn of pkColumns) {
		if (!pkColumn.typeNotNull) {
			messageList.push('主键列必须非空')
		}

		if (pkColumn.enum) {
			messageList.push('主键列不可为枚举类型')
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
	<el-form style="width: 98%;">
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

		<Details open style="padding-bottom: 0.5em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">列配置</el-text>
			</template>

			<el-form-item label="唯一主键列" style="margin-bottom: 0.3em;">
				<el-checkbox v-model="checkConfig.onlyOnePk"></el-checkbox>
			</el-form-item>

			<EditList
				:columns="tableColumnColumns"
				v-model:lines="table.columns"
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
									 @change="(value: boolean) => {if (value) handleColumnToPk(index)}"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="data.partOfPk" :auto-close="500" content="自增">
						<el-checkbox v-model="data.autoIncrement" class="cling-checkbox"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="!data.partOfPk" :auto-close="500" content="业务键">
						<el-checkbox v-model="data.businessKey" class="cling-checkbox"></el-checkbox>
					</el-tooltip>

					<el-tooltip v-if="!data.partOfPk" :auto-close="500" content="逻辑删除">
						<el-checkbox v-model="data.logicalDelete" class="cling-checkbox"></el-checkbox>
					</el-tooltip>
				</template>

				<template #comment="{data}">
					<el-text class="comment">
						<span>/* </span>
						<span><el-input v-model="data.comment" placeholder="comment"></el-input></span>
						<span> */</span>
					</el-text>
				</template>

				<template #type="{data}">
					<ColumnTypeForm :enumNames="store._currentModel().enums.map(it => it.name)"
									:model-value="data"
									@create-enum="() => ModelEditorEventBus.emit('createEnum')"
									@edit-enum="(name) => {
										let genEnum = store._currentModel().enums.filter(it => it.name === name)[0]
										if (!genEnum) genEnum = {...getDefaultEnum(),name}
										ModelEditorEventBus.emit('modifyEnum', {name, genEnum})
									}"
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
					<el-select :model-value="data.columns.map(it => it.name)" multiple style="width: 100%;"
							   @change="(value: string[]) => {
								   data.columns = value.map(it => {return {name: it}})
								   data.name = createIndexName(data)
							   }">
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
