<script lang="ts" setup>
import {computed, DeepReadonly, ref, watch} from 'vue'
import {
    GenModelInput_TargetOf_enums,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
    GenTableModelInput_TargetOf_indexes,
    GenTableModelInput_TargetOf_indexes_TargetOf_columns,
} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
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
import {RefreshRight} from "@element-plus/icons-vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import ColumnCategorySelect from "@/components/business/table/ColumnCategorySelect.vue";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

interface ModelFormProps {
    table?: GenTableModelInput,

    validate: (table: DeepReadonly<GenTableModelInput>) => string[],

    createIndexName: (
        tableName: string,
        index: DeepReadonly<Omit<GenTableModelInput_TargetOf_indexes, 'name'>>,
        tableIsSuper: boolean
    ) => string
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

const columnNames = ref<string[]>(table.value.columns.map(it => it.name))
const syncColumnNames = () => {
    columnNames.value = table.value.columns.map(it => it.name)
}

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

    syncColumnNames()
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

const KEY_INDEX_PREFIX = 'key_of'

const keyIndex = computed<GenTableModelInput_TargetOf_indexes | undefined>({
    get: (): GenTableModelInput_TargetOf_indexes | undefined => {
        return table.value.indexes.filter(it => it.name.toLowerCase().startsWith(KEY_INDEX_PREFIX))[0]
    },
    set: (value: GenTableModelInput_TargetOf_indexes | undefined) => {
        const oldKeyIndex =
            table.value.indexes.filter(it => it.name.toLowerCase().startsWith(KEY_INDEX_PREFIX))[0]

        if (value) {
            if (oldKeyIndex) {
                table.value.indexes = table.value.indexes.filter(it => it !== oldKeyIndex)
            }
            table.value.indexes.unshift(value)
        } else {
            table.value.indexes = table.value.indexes.filter(it => it !== oldKeyIndex)
        }
    }
})

const createKeyIndexName = (): string => {
    const context = useGenConfigContextStore().context

    return processNamingStrategy(
        `${KEY_INDEX_PREFIX}_${table.value.type === 'SUPER_TABLE' ? '{}' : table.value.name}`,
        context.databaseNamingStrategy
    )
}

const handleColumnToKey = () => {
    keyIndex.value = {
        name: createKeyIndexName(),
        uniqueIndex: true,
        columns: table.value.columns
            .filter(it => it.businessKey)
            .map(it => {
                return {name: it.name}
            }),
        remark: "",
    }
}

const handleColumnNotToKey = (columnIndex: number) => {
    if (keyIndex.value && keyIndex.value.columns) {
        const tempColumns = keyIndex.value.columns
            .filter(it => it.name !== table.value.columns[columnIndex].name)

        if (tempColumns.length > 0) {
            keyIndex.value.columns = tempColumns
        } else {
            keyIndex.value = undefined
        }
    }
}

const handleSyncIndexName = (index: number) => {
    const oldIndex = table.value.indexes[index]

    oldIndex.name = oldIndex.name.startsWith(KEY_INDEX_PREFIX) ?
        createKeyIndexName() :
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
                @update:lines="syncColumnNames"
                @delete="handleColumnDelete"
                :before-paste="columns => {
					columns.forEach(it => {it.orderKey = -1})
				}"
                :defaultLine="getDefaultColumn"
                :json-schema-validate="validateColumn"
                style="width: calc(100% - 0.5rem);">

                <template #icon="{data}">
                    <span style="padding-left: 0.5rem;">
                        <ColumnIcon :column="data"/>
                    </span>
                </template>

                <template #category="{index}">
                    <ColumnCategorySelect
                        v-model="table.columns[index]"
                        @updatePrimaryKey="value => {
                            if (value) handleColumnToPk(index)
                        }"
                        @updateBusinessKey="value => {
                            if (value) handleColumnToKey()
                            else handleColumnNotToKey(index)
                        }"/>
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

                <template #type="{index}">
                    <ColumnTypeForm
                        v-model="table.columns[index]"
                        @create-enum="emits('createEnum')"
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
                height="auto"
                style="width: calc(100% - 0.5rem);">

                <template #name="{data, index}">
                    <el-input v-model="data.name">
                        <template #append>
                            <el-button
                                :icon="RefreshRight"
                                @click="handleSyncIndexName(index)"/>
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
                        @focus="syncColumnNames"
                        multiple filterable style="width: 100%;">
                        <el-option v-for="name in columnNames" :value="name"/>
                    </el-select>
                </template>
            </EditList>
        </Details>

        <div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_submit') }}</el-button>
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
