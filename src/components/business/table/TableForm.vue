<script lang="ts" setup>
import {computed, DeepReadonly, ref, watch} from 'vue'
import {
    GenModelInput_TargetOf_enums,
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
import {tableIndexColumns} from "@/components/business/table/tableIndexColumns.ts";
import Details from "@/components/global/common/Details.vue";
import {getDefaultColumn, getDefaultIndex, getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {validateColumn, validateIndex} from "@/shape/GenTableModelInput.ts";
import {getLegalSuperTables} from "@/components/business/table/tableInheritAnalyse.ts";
import {processNamingStrategy} from "@/components/business/genConfig/namingStrategyProcess.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {Delete, Plus, RefreshRight} from "@element-plus/icons-vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import ColumnCategorySelect from "@/components/business/table/ColumnCategorySelect.vue";
import {cloneDeep} from "lodash";
import {MainLocaleKeyParam} from "@/i18n";
import {getColumnKeyGroups} from "@/components/business/table/columnKeyGroups.ts";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

const props = defineProps<{
    table?: GenTableModelInput | undefined,

    validate: (table: DeepReadonly<GenTableModelInput>) => MainLocaleKeyParam[],

    createIndexName: (
        tableName: string,
        index: DeepReadonly<Omit<GenTableModelInput_TargetOf_indexes, 'name'>>,
        tableIsSuper: boolean
    ) => string
}>()

interface ModelFormEmits {
    (event: "createEnum", options: { propertyName: string }): void

    (event: "editEnum", data: { genEnum: GenModelInput_TargetOf_enums }): void
}

const emits = defineEmits<FormEmits<GenTableModelInput> & ModelFormEmits>()

const table = ref<GenTableModelInput>(cloneDeep(props.table) ?? getDefaultTable())

watch(() => props.table, (value) => {
    if (!value) return
    table.value = cloneDeep(value)
})

const superTables = computed(() =>
    MODEL.superTables.filter(superTable => table.value.superTables.map(it => it.name).includes(superTable.name))
)

const columnNames = computed<string[]>(() =>
    [
        ...superTables.value.flatMap(it => it.columns.map(it => it.name)),
        ...table.value.columns.map(it => it.name)
    ]
)

const handleColumnDelete = (deleteColumns: GenTableModelInput_TargetOf_columns[]) => {
    const messageList: string[] = []

    for (let index of table.value.indexes) {
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
}

const handleColumnToPk = (columnIndex: number) => {
    if (!jdbcTypeStore.isLoaded) {
        sendMessage('数据库类型未成功获取')
        return
    }

    const pkColumn = table.value.columns[columnIndex]
    pkColumn.rawType = "INTEGER"
    pkColumn.typeCode = jdbcTypeStore.jdbcTypes[pkColumn.rawType]!

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

const keyGroups = computed<Array<string>>(() =>
    [
        ...new Set([
            defaultKeyGroup,
            ...table.value.columns
                .filter(it => it.businessKey && it.keyGroup !== undefined)
                .flatMap(it => getColumnKeyGroups(it))
        ])
    ].sort()
)

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

    return [...keyColumnMap.entries()].map(([group, columns]) => {
        return {
            name: createKeyIndexName(group),
            uniqueIndex: true,
            columns: columns.map(it => {
                return {name: it.name}
            }),
            remark: "",
        }
    })
})

const keyIndexNames = computed(() => keyIndexes.value.map(it => it.name))

watch(() => keyIndexes.value, (value, oldValue) => {
    table.value.indexes = [
        ...value,
        ...table.value.indexes.filter(index => !oldValue.map(it => it.name).includes(index.name))
    ]
})

const handleSyncIndexName = (index: number) => {
    const oldIndex = table.value.indexes[index]

    oldIndex.name =
        props.createIndexName(
            table.value.name,
            oldIndex,
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
    const messageList = props.validate(table.value)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', table.value)
}

const handleCancel = () => {
    emits('cancel', table.value)
}

const onEnumCreated = (
    columnName: string,
    enumName: string,
) => {
    table.value.columns.forEach(column => {
        if (column.name === columnName) {
            column.enum = {name: enumName}
        }
    })
}

defineExpose({
    onEnumCreated
})
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <el-row :gutter="12" style="line-height: 2em; padding-left: 1em; padding-bottom: 1em;">
            <el-col :span="8">
                <el-input v-model="table.name" placeholder="name"/>
            </el-col>

            <el-col :span="8">
                <el-text class="comment">
                    <span>/* </span>
                    <span><el-input v-model="table.comment" placeholder="comment"/></span>
                    <span> */</span>
                </el-text>
            </el-col>

            <el-col :span="7">
                <el-select disabled :placeholder="table.type"/>
            </el-col>

            <el-col :span="4">
                <el-checkbox v-model="isSuperTable"
                             :label="i18nStore.translate('LABEL_TableForm_asSuperTable')"/>
            </el-col>

            <el-text>
                {{ i18nStore.translate('LABEL_TableForm_extendTables') }}
            </el-text>
            <el-col :span="16">
                <el-select :model-value="table.superTables.map(it => it.name)"
                           multiple filterable
                           @change="handleSuperTablesChange"
                           @focus="syncSuperTableNames">
                    <el-option v-for="name in superTableNames" :value="name"/>
                </el-select>
            </el-col>

            <el-col :span="23">
                <el-input v-model="table.remark" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="remark"
                          type="textarea"/>
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
                @delete="handleColumnDelete"
                :before-paste="columns => {
					columns.forEach(it => {it.orderKey = -1})
				}"
                :defaultLine="getDefaultColumn"
                :json-schema-validate="validateColumn"
                height="2em"
                style="width: calc(100% - 0.5rem);">

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

                <template #name="{data, index}">
                    <el-input v-model="data.name"
                              @input="(value: string) => {
								  if (value) handleInputColumnName(value, index)
							  }"/>
                </template>

                <template #comment="{data}">
                    <el-text class="comment">
                        <span>/* </span>
                        <span><el-input v-model="data.comment" placeholder="comment"/></span>
                        <span> */</span>
                    </el-text>
                </template>

                <template #type="{data, index}">
                    <ColumnTypeForm
                        v-model="table.columns[index]"
                        @create-enum="emits('createEnum', {propertyName: data.name})"
                        @edit-enum="handleEnumEdit"/>
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

            <EditList
                :default-line="getDefaultIndex"
                :columns="tableIndexColumns"
                v-model:lines="table.indexes"
                :json-schema-validate="validateIndex"
                height="2em"
                style="width: calc(100% - 0.5rem);"
            >

                <template #name="{data, index}">
                    <el-input
                        v-model="data.name"
                        :disabled="keyIndexNames.includes(data.name)"
                    >
                        <template #append>
                            <el-button
                                :icon="RefreshRight"
                                @click="handleSyncIndexName(index)"
                                :disabled="keyIndexNames.includes(data.name)"
                            />
                        </template>
                    </el-input>
                </template>

                <template #uniqueIndex="{data}">
                    <div style="text-align: center;">
                        <el-switch
                            v-model="data.uniqueIndex"
                            :disabled="keyIndexNames.includes(data.name)"
                        />
                    </div>
                </template>

                <template #columns="{data}">
                    <el-select
                        :model-value="data.columns.map(it => it.name)"
                        :disabled="keyIndexNames.includes(data.name)"
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

                <template #operation="{handleAddLine, handleRemoveLine, data, index}">
                    <el-button @click.prevent.stop="handleAddLine(index)"
                               :icon="Plus" link style="margin-left: 0.3em;"/>
                    <el-button @click.prevent.stop="handleRemoveLine(index)"
                               v-if="!keyIndexNames.includes(data.name)"
                               :icon="Delete" link style="margin-left: 0.3em;" type="danger"/>
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
