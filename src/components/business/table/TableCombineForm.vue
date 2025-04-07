<script setup lang="ts">
import {computed, DeepReadonly, ref, watch} from "vue";
import {
    ColumnCombineKey, createColumnCombineLabel,
    createColumnCombineMap,
    getColumnCombineKeyStr
} from "@/components/business/association/columnEquals.ts";
import {TableNodePair, useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {createTableCombineData, TableCombineData} from "@/components/business/table/TableCombineData.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {MainLocaleKeyParam} from "@/i18n";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const props = defineProps<{
    tableNodePairs?: Array<TableNodePair> | undefined,
    validate: (table: DeepReadonly<TableCombineData>) => MainLocaleKeyParam[],
}>()

const emits = defineEmits<FormEmits<TableCombineData>>()

const superTableName = ref<string>("")

const tableNodePairs = ref<TableNodePair[]>([])

watch(() => props.tableNodePairs, (value) => {
    if (value !== undefined) {
        tableNodePairs.value = value
    }
}, {immediate: true, deep: true})

const columns = ref<ColumnCombineKey[]>([])

const tableNodePairsIsEmpty = computed<boolean>(() =>
    tableNodePairs.value.length === 0
)

const tableNodePairOptions = computed(() => {
    const combineKeyList = columns.value.map(it => getColumnCombineKeyStr(it))

    return MODEL.tableNodePairs.filter(pair => {
        const {table} = pair

        if (columns.value.length === 0)
            return true

        const currentCombineKeyList = table.columns.map(it => getColumnCombineKeyStr(it))

        return combineKeyList.every(key => currentCombineKeyList.includes(key))
    })
})

const tableIndexes = computed<number[]>({
    get() {
        const result: number[] = []
        for (let index = 0; index < tableNodePairOptions.value.length; index++) {
            if (tableNodePairs.value.includes(tableNodePairOptions.value[index])) {
                result.push(index)
            }
        }
        return result
    },
    set(indexes: number[]) {
        const temp: TableNodePair[] = []
        for (const index of indexes) {
            temp.push(tableNodePairOptions.value[index])
        }
        tableNodePairs.value = temp
    },
})

const handleSelectAllTable = () => {
    tableNodePairs.value = tableNodePairOptions.value
}

/**
 * 源列选项
 * 如果当前 tables 已存在，根据所有 table 的 columns 进行类型匹配组合
 * 如果当前 tables 不存在，则根据所有存在的 table 的 columns 进行类型匹配组合
 */
const columnOptions = computed<ColumnCombineKey[]>(() => {
    const tablePairs = tableNodePairsIsEmpty.value ? MODEL.tableNodePairs : tableNodePairs.value
    const columns = tablePairs.flatMap(it => it.table.columns)

    const columnCombineMap = createColumnCombineMap(columns)

    return [...columnCombineMap.values()]
        .filter(it => tableNodePairsIsEmpty.value ? true : it.length === tableNodePairs.value.length)
        .map(it => it[0])
        .sort((a, b) => a.name.localeCompare(b.name))
})

const columnIndexes = computed<number[]>({
    get() {
        const result: number[] = []
        for (let index = 0; index < columnOptions.value.length; index++) {
            if (columns.value.includes(columnOptions.value[index])) {
                result.push(index)
            }
        }
        return result
    },
    set(indexes: number[]) {
        const temp: ColumnCombineKey[] = []
        for (const index of indexes) {
            temp.push(columnOptions.value[index])
        }
        columns.value = temp
    },
})

const handleSelectAllColumn = () => {
    columns.value = columnOptions.value
}

const handleSubmit = async () => {
    if (tableNodePairs.value.length === 0) {
        sendI18nMessage('VALIDATE_GenAssociation_sourceTable_notFound')
        return
    }

    const data = createTableCombineData(
        superTableName.value,
        tableNodePairs.value,
        columns.value
    )

    const messageList = props.validate(data)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', data)
}

const handleCancel = () => {
    emits('cancel', createTableCombineData(
        superTableName.value,
        tableNodePairs.value,
        columns.value
    ))
}
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <el-form-item :label="i18nStore.translate('LABEL_TableCombineForm_superTableName')">
            <el-input v-model="superTableName"/>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_TableCombineForm_tables')">
            <!-- 表选择器-->
            <el-select
                v-model="tableIndexes"
                :placeholder="i18nStore.translate('LABEL_TableCombineForm_tables_placeholder')"
                clearable filterable multiple
                collapse-tags collapse-tags-tooltip :max-collapse-tags="8"
                @clear="tableNodePairs = []">
                <el-option
                    v-for="({table, node}, index) in tableNodePairOptions"
                    :key="node.id" :value="index" :label="table.name"
                />
                <template #label="{ value }">
                    <el-text>{{ tableNodePairOptions[value].table.name }}</el-text>
                </template>
                <template #header>
                    <el-button @click="handleSelectAllTable">
                        {{ i18nStore.translate('LABEL_TableCombineForm_tables_selectAll') }}
                    </el-button>
                </template>
            </el-select>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_TableCombineForm_columns')">
            <!-- 列选择器-->
            <el-select
                v-model="columnIndexes"
                clearable filterable multiple
                collapse-tags collapse-tags-tooltip :max-collapse-tags="8"
                @clear="columns = []"
                :placeholder="i18nStore.translate('LABEL_TableCombineForm_columns_placeholder')">
                <el-option
                    v-for="(column, index) in columnOptions"
                    :key="createColumnCombineLabel(column)"
                    :value="index"
                    :label="createColumnCombineLabel(column)"
                />
                <template #label="{ value }">
                    <el-text>{{ columnOptions[value].name }}</el-text>
                </template>
                <template #header>
                    <el-button @click="handleSelectAllColumn">
                        {{ i18nStore.translate('LABEL_TableCombineForm_columns_selectAll') }}
                    </el-button>
                </template>
            </el-select>
        </el-form-item>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
        </div>
    </el-form>
</template>
