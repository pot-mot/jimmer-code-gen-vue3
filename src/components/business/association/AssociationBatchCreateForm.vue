<script setup lang="ts">
import {
    GenAssociationModelInput,
    GenTableModelInput,
    type GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {AssociationType_CONSTANTS, DissociateAction_CONSTANTS} from "@/api/__generated/model/enums";
import {computed, DeepReadonly, ref, watch} from "vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {
    AssociationBatchCreateInput,
    AssociationBatchCreateInputModelValue,
    extractMultiCreateInput,
    getDefaultAssociationBatchCreateInput
} from "@/components/business/association/AssociationBatchCreateInput.ts";
import {
    ColumnCombineKey, createColumnCombineLabel,
    createColumnCombineMap,
    getColumnCombineKeyStr
} from "@/components/business/association/columnEquals.ts";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const props = defineProps<{
    sourceTables?: Array<GenTableModelInput> | undefined,

    validate: (association: DeepReadonly<Array<GenAssociationModelInput>>) => MainLocaleKeyParam[],

    createAssociationName: (
        association: DeepReadonly<GenAssociationModelInput>,
        sourceTableIsSuper: boolean,
        targetTableIsSuper: boolean,
    ) => string
}>()

const emits = defineEmits<FormEmits<
    GenAssociationModelInput[],
    AssociationBatchCreateInputModelValue
>>()

const association = ref<AssociationBatchCreateInputModelValue>(getDefaultAssociationBatchCreateInput())

watch(() => props.sourceTables, (value) => {
    if (value !== undefined) {
        association.value.sourceTables = value
    }
}, {immediate: true, deep: true})

// 数据计算属性

const sourceTablesIsEmpty = computed<boolean>(() =>
    association.value.sourceTables.length === 0
)

const sourceColumns = computed<ColumnCombineKey[]>(() =>
    association.value.columnReferences.map(it => it.sourceColumn).filter(it => !!it)
)

const targetColumnCombineKeys = computed<string[]>(() =>
    association.value.columnReferences.map(it => it.targetColumn).filter(it => !!it).map(it => getColumnCombineKeyStr(it))
)

// 选项计算属性

const sourceTableOptions = computed<GenTableModelInput[]>(() =>
    MODEL.tables.filter(table => {
        if (sourceColumns.value.length === 0)
            return true
        return table.columns.some(column =>
            sourceColumns.value
                .map(it => getColumnCombineKeyStr(it))
                .includes(getColumnCombineKeyStr(column))
        )
    })
)

const handleSelectAllSourceTable = () => {
    association.value.sourceTables = sourceTableOptions.value
}

/**
 * 源列选项
 * 如果当前 sourceTables 已存在，根据所有 sourceTable 的 columns 进行类型匹配组合
 * 如果当前 sourceTables 不存在，则根据所有存在的 table 的 columns 进行类型匹配组合
 */
const sourceColumnOptions = computed<ColumnCombineKey[]>(() => {
    const tables = sourceTablesIsEmpty.value ? MODEL.tables : association.value.sourceTables
    const columns = tables.flatMap(it => it.columns)

    const columnCombineMap = createColumnCombineMap(columns)

    return [...columnCombineMap.values()]
        .filter(it => sourceTablesIsEmpty.value ? true : it.length === tables.length)
        .map(it => it[0])
        .sort((a, b) => a.name.localeCompare(b.name))
})

const targetTableOptions = computed(() => {
    if (targetColumnCombineKeys.value.length > 0) {
        return MODEL.tables.filter(table => {
            for (const column of table.columns) {
                if (targetColumnCombineKeys.value.includes(getColumnCombineKeyStr(column)))
                    return true
            }
            return false
        })
    } else {
        return MODEL.tables
    }
})

const targetColumnOptions = computed<ColumnCombineKey[]>(() => {
    if (association.value.targetTable === undefined) {
        const columns = MODEL.tables.flatMap(it => it.columns)
        const columnCombineMap = createColumnCombineMap(columns)
        return [...columnCombineMap.values()]
            .map(it => it[0])
            .sort((a, b) => a.name.localeCompare(b.name))
    } else {
        return association.value.targetTable.columns
    }
})

// 索引双向计算属性

const handleSourceColumnChange = (
    column: GenTableModelInput_TargetOf_columns,
    columnReferenceIndex: number
) => {
    association.value.columnReferences[columnReferenceIndex].sourceColumn = column
}

const handleTargetColumnChange = (
    column: GenTableModelInput_TargetOf_columns,
    columnReferenceIndex: number
) => {
    association.value.columnReferences[columnReferenceIndex].targetColumn = column
}

const sourceTableIndexes = computed<number[]>({
    get() {
        const result: number[] = []
        for (let index = 0; index < sourceTableOptions.value.length; index++) {
            if (association.value.sourceTables.includes(sourceTableOptions.value[index])) {
                result.push(index)
            }
        }
        return result
    },
    set(indexes: number[]) {
        const sourceTables: GenTableModelInput[] = []
        for (const index of indexes) {
            sourceTables.push(sourceTableOptions.value[index])
        }
        association.value.sourceTables = sourceTables
    },
})

const targetTableIndex = computed<number | undefined>({
    get() {
        if (association.value.targetTable === undefined)
            return undefined

        for (let index = 0; index < targetTableOptions.value.length; index++) {
            if (targetTableOptions.value[index].name === association.value.targetTable.name) {
                return index
            }
        }
        return undefined
    },
    set(index: number | undefined) {
        if (index !== undefined) {
            association.value.targetTable = targetTableOptions.value[index]
        } else {
            association.value.targetTable = undefined
        }
    },
})

const handleCleanDissociateAction = () => {
    association.value.dissociateAction = undefined
}

const handleSubmit = async () => {
    if (association.value.sourceTables.length === 0) {
        sendI18nMessage('VALIDATE_GenAssociation_sourceTable_notFound')
        return
    }

    if (association.value.targetTable === undefined) {
        sendI18nMessage('VALIDATE_GenAssociation_targetTable_notFound')
        return
    }

    const associations = extractMultiCreateInput(association.value as AssociationBatchCreateInput)

    const messageList = props.validate(associations)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', associations)
}

const handleCancel = () => {
    emits('cancel', association.value)
}
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_mappingAssociation')">
            <template v-for="(columnReference, columnReferenceIndex) in association.columnReferences">
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr 2em 1fr 1fr;">
                    <!-- 源表选择器-->
                    <el-select
                        v-model="sourceTableIndexes" clearable filterable multiple
                        :placeholder="i18nStore.translate('LABEL_AssociationForm_sourceTableName_placeholder')"
                        collapse-tags collapse-tags-tooltip :max-collapse-tags="3"
                        @clear="association.sourceTables = []">
                        <el-option
                            v-for="(sourceTable, index) in sourceTableOptions"
                            :key="sourceTable.name" :value="index" :label="sourceTable.name"
                        />
                        <template #label="{ value }">
                            <el-text>{{ sourceTableOptions[value].name }}</el-text>
                        </template>
                        <template #header>
                            <el-button @click="handleSelectAllSourceTable">
                                {{ i18nStore.translate('LABEL_AssociationForm_sourceTableName_selectAll') }}
                            </el-button>
                        </template>
                    </el-select>

                    <!-- 源列选择器-->
                    <el-select
                        :model-value="columnReference.sourceColumn ? JSON.stringify(columnReference.sourceColumn) : undefined"
                        clearable filterable
                        @change="(data: string | undefined) => handleSourceColumnChange(data ? JSON.parse(data) : undefined, columnReferenceIndex)"
                        @clear="columnReference.sourceColumn = undefined"
                        :placeholder="i18nStore.translate('LABEL_AssociationForm_sourceColumnName_placeholder')">
                        <el-option
                            v-for="column in sourceColumnOptions"
                            :key="createColumnCombineLabel(column)"
                            :value="JSON.stringify(column)"
                            :label="createColumnCombineLabel(column)"
                        />
                        <template #label>
                            <el-text v-if="columnReference.sourceColumn?.name">
                                {{ columnReference.sourceColumn.name }}
                            </el-text>
                        </template>
                    </el-select>

                    <el-text style="text-align: center;">
                        {{ " -> " }}
                    </el-text>

                    <!-- 目标表选择器-->
                    <el-select
                        v-model="targetTableIndex" clearable filterable
                        :placeholder="i18nStore.translate('LABEL_AssociationForm_targetTableName_placeholder')"
                        @clear="targetTableIndex = undefined">
                        <el-option v-for="(targetTable, index) in targetTableOptions"
                                   :key="targetTable.name" :value="index" :label="targetTable.name"/>
                        <template #label>
                            <el-text>{{ association.targetTable?.name }}</el-text>
                        </template>
                    </el-select>

                    <!-- 目标列选择器-->
                    <el-select
                        :model-value="columnReference.targetColumn ? JSON.stringify(columnReference.targetColumn) : undefined"
                        clearable filterable
                        @change="(data: string | undefined) => handleTargetColumnChange(data ? JSON.parse(data) : undefined, columnReferenceIndex)"
                        @clear="columnReference.targetColumn = undefined"
                        :placeholder="i18nStore.translate('LABEL_AssociationForm_targetColumnName_placeholder')">
                        <el-option
                            v-for="column in targetColumnOptions"
                            :key="createColumnCombineLabel(column)"
                            :value="JSON.stringify(column)"
                            :label="createColumnCombineLabel(column)"
                        />
                        <template #label>
                            <el-text v-if="columnReference.targetColumn?.name">
                                {{ columnReference.targetColumn.name }}
                            </el-text>
                        </template>
                        <template #empty v-if="association.targetTable === undefined">
                            {{ i18nStore.translate('LABEL_AssociationForm_placeSelectTargetTableFirst') }}
                        </template>
                    </el-select>
                </div>
            </template>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_type')">
            <el-select v-model="association.type">
                <el-option v-for="associationType in AssociationType_CONSTANTS" :value="associationType"/>
            </el-select>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_fake')">
            <el-switch v-model="association.fake"/>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_dissociateAction')">
            <el-select v-model="association.dissociateAction"
                       clearable @clear="handleCleanDissociateAction">
                <el-option v-for="dissociateAction in DissociateAction_CONSTANTS" :value="dissociateAction"/>
            </el-select>
        </el-form-item>

        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_updateAction')">
                    <el-input v-model="association.updateAction"
                              :disabled="association.type === 'MANY_TO_MANY'"/>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_deleteAction')">
                    <el-input v-model="association.deleteAction"
                              :disabled="association.type === 'MANY_TO_MANY'"/>
                </el-form-item>
            </el-col>
        </el-row>

        <div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
        </div>
    </el-form>
</template>

