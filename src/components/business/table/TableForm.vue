<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {cloneDeep} from 'lodash'
import {GenTableModelInput} from "@/api/__generated/model/static";
import {
	GenTableModelInput_TargetOf_columns,
	GenTableModelInput_TargetOf_indexes, GenTableModelInput_TargetOf_indexes_TargetOf_columns_2
} from "@/api/__generated/model/static/GenTableModelInput.ts";
import {useLoading} from "@/hooks/useLoading.ts";
import {sendMessage} from "@/utils/message.ts";
import {useModelEditorStore} from "../../pages/ModelEditor/store/ModelEditorStore.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import {tableColumnColumns} from "@/components/business/table/tableColumnColumns.ts";
import ColumnTypeForm from "@/components/business/table/ColumnTypeForm.vue";
import {useJDBCTypeStore} from "@/components/business/jdbcType/JDBCTypeStore.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {tableIndexColumns} from "@/components/business/table/tableIndexColumns.ts";
import Details from "@/components/global/common/Details.vue";

const store = useModelEditorStore()

const columnTypeMapLoading = useLoading()

const jdbcTypeStore = useJDBCTypeStore()

const defaultTable: GenTableModelInput = {
	name: "",
	comment: "",
	remark: "",
	orderKey: 0,
	type: "TABLE",
	columns: [],
	indexes: [],
}

const defaultColumn: GenTableModelInput_TargetOf_columns = {
	orderKey: 0,
	name: "",
	comment: "",
	typeCode: 12,
	overwriteByType: false,
	type: "VARCHAR",
	typeNotNull: true,
	displaySize: 0,
	numericPrecision: 0,
	defaultValue: undefined,
	partOfPk: false,
	autoIncrement: false,
	remark: "",
	logicalDelete: false,
	businessKey: false,
	enum: undefined,
}

const defaultIndex: GenTableModelInput_TargetOf_indexes = {
	name: "",
	uniqueIndex: false,
	columns: []
}

interface ModelFormProps {
	id?: string,
	table?: GenTableModelInput
}

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenTableModelInput>>()

const table = ref<GenTableModelInput>(cloneDeep(defaultTable))

watch(() => props.table, (value) => {
	if (!value) return

	table.value = cloneDeep(value)

}, {immediate: true})

const checkConfig = ref({
	onlyOnePk: true
})

const columnNames = computed<string[]>(() => {
	return table.value.columns.map(it => it.name)
})

watch(() => table.value.columns, () => {
	table.value.indexes.forEach(index => {
		const newColumns: GenTableModelInput_TargetOf_indexes_TargetOf_columns_2[] = []
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
	pkColumn.type = "BIGINT"
	pkColumn.enum = undefined
	pkColumn.typeCode = jdbcTypeStore.jdbcTypes[pkColumn.type]!
	pkColumn.logicalDelete = false
	pkColumn.businessKey = false

	if (checkConfig.value.onlyOnePk) {
		table.value.columns.forEach((column, index) => {
			if (index != pkIndex && column.partOfPk) {
				column.partOfPk = false
				column.autoIncrement = false
			}
		})
	}
}

const handleSubmit = () => {
	const messageList: string[] = []

	if (table.value.name.length == 0) {
		messageList.push('表名不得为空')
	}

	if (store.nodes
		.filter(node => node.id != props.id)
		.map(it => it.getData().table.name)
		.filter(name => name == table.value.name)
		.length > 0) {
		messageList.push('表名不可重复')
	}



	for (let column of table.value.columns) {
		if (column.enum != undefined && !store._currentModel().enums.map(it => it.name).includes(column.enum.name)) {
			messageList.push(`column ${column.name} 对应的 enum ${column.enum.name} 不存在，已自动移除`)
			column.enum = undefined
		}
	}

	const columnNameSet = new Set<string>(table.value.columns.map(it => it.name))

	for (let columnName of columnNameSet.values()) {
		if (columnName.length == 0) {
			messageList.push('列名不得为空')
			break
		}
	}
	if (columnNameSet.size != table.value.columns.length) {
		messageList.push('列名不可重复')
	}

	const indexNameSet = new Set<string>(table.value.indexes.map(it => it.name))

	for (let indexName of indexNameSet.values()) {
		if (indexName.length == 0) {
			messageList.push('索引名不得为空')
			break
		}
	}
	if (indexNameSet.size != table.value.indexes.length) {
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

		const columnNameSet = new Set<string>(newColumns.map(it => it.name))
		for (let columnName of columnNameSet.values()) {
			if (columnName.length == 0) {
				messageList.push('索引引用列名不得为空')
				break
			}
		}
		if (columnNameSet.size != newColumns.length) {
			messageList.push('索引引用列名不可重复')
		}

		index.columns = newColumns
	}

	const pkColumns = table.value.columns.filter(column => column.partOfPk)

	if (pkColumns.length != 1 && checkConfig.value.onlyOnePk) {
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
				:defaultLine="defaultColumn"
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
				</template>

				<template #comment="{data}">
					<el-text class="comment">
						<span>/* </span>
						<span><el-input v-model="data.comment" placeholder="comment"></el-input></span>
						<span> */</span>
					</el-text>
				</template>

				<template #type="{data}">
					<ColumnTypeForm v-if="jdbcTypeStore.isLoaded && store.isModelLoaded"
									:enumNames="store._currentModel().enums.map(it => it.name)"
									:model-value="data"
									@create-enum="() => ModelEditorEventBus.emit('createEnum')"
									@edit-enum="(name) => {
									let genEnum = store._currentModel().enums.filter(it => it.name == name)[0]
									if (!genEnum) genEnum = {...getDefaultEnum(),name}
									ModelEditorEventBus.emit('modifyEnum', {name, genEnum})
								}"
					></ColumnTypeForm>
				</template>

				<template #typeNotNull="{data}">
					<el-checkbox v-model="data.typeNotNull" :disabled="data.partOfPk"></el-checkbox>
				</template>

				<template #defaultValue="{data}">
					<el-tooltip :auto-close="2000" :disabled="data.partOfPk">
						<el-input v-model="data.defaultValue" :disabled="data.partOfPk"></el-input>

						<template #content>
							此处将直接拼入 ddl，如果是字符串请加上引号
						</template>
					</el-tooltip>
				</template>
			</EditList>
		</Details>

		<Details open style="padding-bottom: 3em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">索引</el-text>
			</template>

			<EditList
				:default-line="defaultIndex"
				:columns="tableIndexColumns"
				v-model:lines="table.indexes"
				height="auto"
				style="width: 98%;">

				<template #uniqueIndex="{data}">
					<el-switch v-model="data.uniqueIndex"></el-switch>
				</template>

				<template #columns="{data}">
					<el-select :model-value="data.columns.map(it => it.name)" multiple style="width: 100%;"
							   @change="(value: string[]) => {data.columns = value.map(it => {return {name: it}})}">
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
	<el-empty v-else style="height: 55vh;"></el-empty>
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
