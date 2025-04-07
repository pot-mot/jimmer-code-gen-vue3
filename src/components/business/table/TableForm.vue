<script lang="ts" setup>
import {computed, DeepReadonly, ref, toRaw} from 'vue'
import {
	GenModelInput_TargetOf_enums,
	GenModelInput_TargetOf_subGroups,
	GenTableModelInput,
	GenTableModelInput_TargetOf_columns,
	GenTableModelInput_TargetOf_indexes,
	GenTableModelInput_TargetOf_indexes_TargetOf_columns,
} from "@/api/__generated/model/static";
import {sendI18nMessage, sendMessage} from "@/message/message.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import EditList from "@/components/global/list/EditList.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";
import {tableColumnColumns} from "@/components/business/table/tableColumnColumns.ts";
import ColumnTypeForm from "@/components/business/table/ColumnTypeForm.vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {tableIndexColumns, tableKeyIndexColumns} from "@/components/business/table/tableIndexColumns.ts";
import Details from "@/components/global/common/Details.vue";
import {getDefaultColumn, getDefaultIndex} from "@/components/business/table/defaultTable.ts";
import {validateColumn, validateIndex} from "@/shape/GenTableModelInput.ts";
import {getLegalSuperTables} from "@/components/business/table/tableInheritAnalyse.ts";
import {processNamingStrategy} from "@/components/business/genConfig/namingStrategyProcess.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {RefreshRight} from "@element-plus/icons-vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import ColumnCategorySelect from "@/components/business/table/ColumnCategorySelect.vue";
import {MainLocaleKeyParam} from "@/i18n";
import {getColumnKeyGroups} from "@/components/business/table/columnKeyGroups.ts";
import {TableType} from "@/api/__generated/model/enums";
import ModelSubGroupSelect from "@/components/business/modelSubGroup/ModelSubGroupSelect.vue";
import ViewList from "@/components/global/list/ViewList.vue";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

const contextStore = useGenConfigContextStore()

const table = defineModel<GenTableModelInput>({
	required: true
})

const props = defineProps<{
	validate: (table: DeepReadonly<GenTableModelInput>) => MainLocaleKeyParam[],

	subGroups: Array<GenModelInput_TargetOf_subGroups>,

	createIndexName: (
		tableName: string,
		index: DeepReadonly<Omit<GenTableModelInput_TargetOf_indexes, 'name'>>,
		tableIsSuper: boolean
	) => string
}>()

const emits = defineEmits<FormEmits<GenTableModelInput> & {
	(event: "createSubGroup"): void
	(event: "editSubGroup", data: { subGroup: GenModelInput_TargetOf_subGroups }): void

	(event: "createEnum", options: { propertyName: string }): void
	(event: "editEnum", data: { genEnum: GenModelInput_TargetOf_enums }): void
}>()

const currentSuperTables = computed(() => {
	const currentSuperTableNames = table.value.superTables.map(it => it.name)
	return MODEL.superTables.filter(superTable => currentSuperTableNames.includes(superTable.name))
})

const columnNames = computed<string[]>(() =>
	[
		...currentSuperTables.value.flatMap(it => it.columns.map(it => it.name)),
		...table.value.columns.map(it => it.name)
	]
)

const getSelectableSuperTables = () => {
	return getLegalSuperTables(
		table.value,
		MODEL.superTables
	)
}

const getSelectableSuperTableNames = () => {
	return getSelectableSuperTables().map(it => it.name)
}

const superTableNames = ref<string[]>(getSelectableSuperTableNames())
const syncSuperTableNames = () => {
	superTableNames.value = getSelectableSuperTableNames()
}

// 记录原始表类型
let baseTableType: TableType = table.value.type === "SUPER_TABLE" ? "TABLE" : table.value.type

// 是否是上级表
const isSuperTable = computed<boolean>({
	get: () => {
		return table.value.type === "SUPER_TABLE"
	},
	set: (value: boolean) => {
		if (value) table.value.type = "SUPER_TABLE"
		else table.value.type = baseTableType
	}
})

const handleColumnToPk = (columnIndex: number) => {
	if (!jdbcTypeStore.isLoaded) {
		sendMessage('数据库类型未成功获取')
		return
	}

	const idTypeCode = contextStore.context.defaultIdType
	if (idTypeCode !== undefined) {
		const pkColumn = table.value.columns[columnIndex]
		pkColumn.typeCode = idTypeCode
		const rawType = jdbcTypeStore.codeTypeMap.get(idTypeCode)
		if (rawType !== undefined) {
			pkColumn.rawType = rawType
		}
		pkColumn.typeNotNull = true
	}

	// 主键变更将排除其他主键
	table.value.columns.forEach((column, index) => {
		if (index !== columnIndex && column.partOfPk) {
			column.partOfPk = false
			column.autoIncrement = false
		}
	})
}

const defaultKeyGroup = ""

const KEY_INDEX_PREFIX = 'key_of'

const keyGroupSet = computed<Set<string>>(() =>
	new Set([
		defaultKeyGroup,
		...table.value.columns
			.filter(it => it.businessKey && it.keyGroup !== undefined)
			.flatMap(it => getColumnKeyGroups(it))
	])
)

const keyGroups = computed<Array<string>>(() =>
	[...keyGroupSet.value].sort()
)

const syncIndexColumnNameChange = (oldName: string, newName: string) => {
	notKeyIndexes.value = notKeyIndexes.value.map(index => {
		const newIndexColumns: GenTableModelInput_TargetOf_indexes_TargetOf_columns[] = []
		index.columns.forEach(it => {
			if (it.name === oldName) {
				newIndexColumns.push({name: newName})
			} else {
				newIndexColumns.push(it)
			}
		})
		index.columns = newIndexColumns
		return index
	})
}

const syncIndexColumnDelete = (deleteColumns: GenTableModelInput_TargetOf_columns[]) => {
	const messageList: string[] = []

	for (const index of notKeyIndexes.value) {
		const includeDeletedColumnNames: string[] = []
		const tempColumns = index.columns.filter(it => {
			const isIncludeDeletedColumn = deleteColumns.map(it => it.name).includes(it.name)
			if (isIncludeDeletedColumn) {
				includeDeletedColumnNames.push(it.name)
			}
			return !isIncludeDeletedColumn
		})
		if (includeDeletedColumnNames.length > 0) {
			messageList.push(`索引【${index.name}】引用列【${includeDeletedColumnNames.join("、")}】被移除`)
			index.columns = tempColumns
		}
	}

	messageList.forEach(it => sendMessage(it, 'warning'))
}

const createKeyIndexName = (group: string): string => {
	const context = useGenConfigContextStore().context

	return processNamingStrategy(
		`${KEY_INDEX_PREFIX}_${table.value.type === 'SUPER_TABLE' ? '{}' : table.value.name}${group === defaultKeyGroup ? '' : `_${group}`}`,
		context.databaseNamingStrategy
	)
}

const keyIndexes = computed<Array<GenTableModelInput_TargetOf_indexes>>(() => {
	const keyColumnMap = new Map<string, Array<GenTableModelInput_TargetOf_columns>>

	for (const column of table.value.columns) {
		if (column.businessKey) {
			const columnKeyGroups = getColumnKeyGroups(column)

			if (columnKeyGroups.length === 0) {
				const columns = keyColumnMap.get(defaultKeyGroup)
				if (columns === undefined) {
					keyColumnMap.set(defaultKeyGroup, [column])
				} else {
					columns.push(column)
				}
			}

			for (const columnKeyGroup of columnKeyGroups) {
				const columns = keyColumnMap.get(columnKeyGroup)
				if (columns === undefined) {
					keyColumnMap.set(columnKeyGroup, [column])
				} else {
					columns.push(column)
				}
			}
		}
	}

	const result: GenTableModelInput_TargetOf_indexes[] = []

	for (const [group, columns] of keyColumnMap.entries()) {
		result.push({
			name: createKeyIndexName(group),
			uniqueIndex: true,
			columns: columns.map(it => {
				return {name: it.name}
			}),
			remark: "",
		})
	}

	return result
})

const keyIndexNames = computed<Set<string>>(() => {
	return new Set([...keyIndexes.value.map(it => it.name)])
})

const notKeyIndexes = computed<Array<GenTableModelInput_TargetOf_indexes>>({
	get(): Array<GenTableModelInput_TargetOf_indexes> {
		return table.value.indexes.filter(it => {
			return !keyIndexNames.value.has(it.name)
		})
	},
	set(newVal: Array<GenTableModelInput_TargetOf_indexes>) {
		table.value.indexes = [
			...keyIndexes.value,
			...newVal.filter(it => {
				return !keyIndexNames.value.has(it.name)
			})
		]
	}
})

const handleSyncIndexName = (index: GenTableModelInput_TargetOf_indexes) => {
	index.name = props.createIndexName(
		table.value.name,
		index,
		table.value.type === 'SUPER_TABLE'
	)
}

const handleSuperTablesChange = (value: string[]) => {
	table.value.superTables = value.map(it => {
		return {name: it}
	})
}

const handleEnumEdit = (name: string) => {
	let genEnum = MODEL.enums.filter(it => it.name === name)[0]
	if (!genEnum) {
		sendMessage(`枚举【${name}】不存在`)
		return
	}
	emits('editEnum', {genEnum})
}

const handleSubmit = () => {
	const mergeKeyIndexData = toRaw({
		...table.value,
		indexes: [
			...keyIndexes.value,
			...notKeyIndexes.value,
		]
	})

	const messageList = props.validate(mergeKeyIndexData)

	if (messageList.length > 0) {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return
	}

	emits('submit', mergeKeyIndexData)
}

const handleCancel = () => {
	const mergeKeyIndexData = toRaw({
		...table.value,
		indexes: [
			...keyIndexes.value,
			...notKeyIndexes.value,
		]
	})

	emits('cancel', mergeKeyIndexData)
}
</script>

<template>
	<el-form style="width: calc(100% - 0.5rem); min-width: 45em;">
		<el-row :gutter="12" style="line-height: 2em; padding-left: 1em; padding-bottom: 1em;">
			<el-col :span="23">
				<ModelSubGroupSelect
					v-model="table"
					:sub-groups="subGroups"
					@create="emits('createSubGroup')"
					@edit="(subGroup) => emits('editSubGroup', {subGroup})"
				/>
			</el-col>

			<el-col :span="8">
				<el-input
					v-model="table.name"
					:placeholder="i18nStore.translate('LABEL_TableForm_name')"
				/>
			</el-col>

			<el-col :span="8">
				<el-text class="comment">
					<span>/* </span>
					<span>
						<el-input
							v-model="table.comment"
							:placeholder="i18nStore.translate('LABEL_TableForm_comment')"
						/>
					</span>
					<span> */</span>
				</el-text>
			</el-col>

			<el-col :span="7">
				<el-select disabled :placeholder="table.type"/>
			</el-col>

			<el-col :span="4">
				<el-checkbox
					v-model="isSuperTable"
					:label="i18nStore.translate('LABEL_TableForm_asSuperTable')"
				/>
			</el-col>

			<el-text>
				{{ i18nStore.translate('LABEL_TableForm_extendTables') }}
			</el-text>
			<el-col :span="16">
				<el-select
					:model-value="table.superTables.map(it => it.name)"
					multiple filterable
					@change="handleSuperTablesChange"
					@focus="syncSuperTableNames">
					<el-option v-for="name in superTableNames" :value="name"/>
				</el-select>
			</el-col>

			<el-col :span="23">
				<el-input
					v-model="table.remark"
					:autosize="{ minRows: 1, maxRows: 4 }"
					:placeholder="i18nStore.translate('LABEL_TableForm_remark')"
					type="textarea"
				/>
			</el-col>
		</el-row>

		<Details open style="padding-bottom: 0.5em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">
					{{ i18nStore.translate('LABEL_TableForm_columns') }}
				</el-text>
			</template>

			<EditList
				:columns="tableColumnColumns"
				v-model:lines="table.columns"
				@delete="syncIndexColumnDelete"
				:before-paste="columns => {
					columns.forEach(it => {it.orderKey = -1})
				}"
				:defaultLine="getDefaultColumn"
				:json-schema-validate="validateColumn"
				style="line-height: 2em;"
			>
				<template #icon="{data}">
                    <span style="padding-left: 0.5rem;">
                        <ColumnIcon :column="data"/>
                    </span>
				</template>

				<template #category="{index}">
					<ColumnCategorySelect
						v-model:column="table.columns[index]"
						:default-key-group="defaultKeyGroup"
						:key-groups="keyGroups"
						@updatePrimaryKey="value => {
                            if (value) handleColumnToPk(index)
                        }"
					/>
				</template>

				<template #name="{data}">
					<el-input
						:model-value="data.name"
						@input="(value: string) => {
						    syncIndexColumnNameChange(data.name, value);
						    data.name = value;
					    }"
					/>
				</template>

				<template #comment="{data}">
					<el-text class="comment">
						<span>/* </span>
						<span><el-input v-model="data.comment"/></span>
						<span> */</span>
					</el-text>
				</template>

				<template #type="{data, index}">
					<ColumnTypeForm
						v-model="table.columns[index]"
						@create-enum="emits('createEnum', {propertyName: data.name})"
						@edit-enum="handleEnumEdit"
					/>
				</template>

				<template #typeNotNull="{data}">
					<div style="text-align: center;">
						<el-checkbox v-model="data.typeNotNull" :disabled="data.partOfPk"/>
					</div>
				</template>

				<template #defaultValue="{data}">
					<el-input v-model="data.defaultValue" :disabled="data.partOfPk"/>
				</template>
			</EditList>
		</Details>

		<Details open style="padding-bottom: 3em">
			<template #title>
				<el-text style="line-height: 2.5em;" size="default">
					{{ i18nStore.translate('LABEL_TableForm_indexes') }}
				</el-text>
			</template>

			<ViewList
				v-if="tableKeyIndexColumns.length > 0"
				:columns="tableKeyIndexColumns"
				:lines="keyIndexes"
				style="line-height: 2em;"
			>
				<template #columns="{data}">
					<el-tag v-for="column in data.columns" type="info" style="padding: 0 0.5em; margin-left: 0.5em;">
						{{ column.name }}
					</el-tag>
				</template>
			</ViewList>

			<EditList
				:default-line="getDefaultIndex"
				:columns="tableIndexColumns"
				v-model:lines="notKeyIndexes"
				:json-schema-validate="validateIndex"
				style="line-height: 2em;"
			>
				<template #name="{data}">
					<el-input v-model="data.name">
						<template #append>
							<el-button
								:icon="RefreshRight"
								@click="handleSyncIndexName(data)"
							/>
						</template>
					</el-input>
				</template>

				<template #uniqueIndex="{data}">
					<div style="text-align: center;">
						<el-switch v-model="data.uniqueIndex"/>
					</div>
				</template>

				<template #columns="{data}">
					<el-select
						:model-value="data.columns.map(it => it.name)"
						@change="(value: string[]) => {
                           data.columns = value.map(it => {return {name: it}})
                        }"
						multiple
						filterable
						style="width: 100%;"
					>
						<el-option v-for="name in columnNames" :value="name"/>
					</el-select>
				</template>
			</EditList>
		</Details>

		<div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
			<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
			<el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
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
</style>
