<script setup lang="ts">
import {
    GenAssociationModelInput,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {AssociationType_CONSTANTS, DissociateAction_CONSTANTS} from "@/api/__generated/model/enums";
import {RefreshRight} from "@element-plus/icons-vue";
import {computed, DeepReadonly, ref, watch} from "vue";
import {cloneDeep} from "lodash";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {type Edge} from "@antv/x6";
import {MainLocaleKeyParam} from "@/i18n";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {
    createColumnNameSet
} from "@/components/business/association/columnEquals.ts";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const props = defineProps<{
    association?: GenAssociationModelInput | undefined,

    edge: DeepReadonly<Edge> | undefined,

    validate: (association: DeepReadonly<GenAssociationModelInput>) => MainLocaleKeyParam[],

    createAssociationName: (
        association: DeepReadonly<GenAssociationModelInput>,
        sourceTableIsSuper: boolean,
        targetTableIsSuper: boolean,
    ) => string
}>()

const association = ref<GenAssociationModelInput>(cloneDeep(props.association) ?? getDefaultAssociation())

watch(() => props.association, (value) => {
    if (!value) return
    association.value = cloneDeep(value)
})

const emits = defineEmits<FormEmits<GenAssociationModelInput>>()

// 数据计算属性

const sourceTable = computed<GenTableModelInput | undefined>(() =>
    MODEL.tables.filter(table => table.name === association.value.sourceTableName)[0]
)

const targetTable = computed<GenTableModelInput | undefined>(() =>
    MODEL.tables.filter(table => table.name === association.value.targetTableName)[0]
)

const sourceColumnNames = computed<string[]>(() =>
    association.value.columnReferences.map(it => it.sourceColumnName).filter(it => it.length > 0)
)

const targetColumnNames = computed<string[]>(() =>
    association.value.columnReferences.map(it => it.targetColumnName).filter(it => it.length > 0)
)

// 选项计算属性

const sourceTableOptions = computed(() => {
    if (sourceColumnNames.value.length > 0) {
        return MODEL.tables.filter(table => {
            for (const column of table.columns) {
                if (sourceColumnNames.value.includes(column.name))
                   return true
            }
            return false
        })
    } else {
        return MODEL.tables
    }
})

const targetTableOptions = computed(() => {
    if (targetColumnNames.value.length > 0) {
        return MODEL.tables.filter(table => {
            for (const column of table.columns) {
                if (targetColumnNames.value.includes(column.name))
                    return true
            }
            return false
        })
    } else {
        return MODEL.tables
    }
})

const sourceColumnNameOptions = computed<string[]>(() => {
    if (sourceTable.value === undefined) {
        const columns = MODEL.tables.flatMap(it => it.columns)
        return [...createColumnNameSet(columns)]
    } else {
        return sourceTable.value.columns.map(it => it.name)
    }
})

const targetColumnNameOptions = computed<string[]>(() => {
    if (targetTable.value === undefined) {
        const columns = MODEL.tables.flatMap(it => it.columns)
        return [...createColumnNameSet(columns)]
    } else {
        return targetTable.value.columns.map(it => it.name)
    }
})

// 刷新关联名称
const handleRefreshAssociationName = () => {
    if (sourceTable.value === undefined) {
        sendI18nMessage('VALIDATE_GenAssociation_sourceTable_notFound')
        return
    }

    if (targetTable.value === undefined) {
        sendI18nMessage('VALIDATE_GenAssociation_targetTable_notFound')
        return
    }

    association.value.name = createAssociationName(
        association.value,
        sourceTable.value.type === 'SUPER_TABLE',
        targetTable.value.type === 'SUPER_TABLE',
    )
}

const handleCleanDissociateAction = () => {
    association.value.dissociateAction = undefined
}

const handleSubmit = async () => {
    const messageList = props.validate(association.value)

    if (messageList.length > 0) {
        messageList.forEach(it => sendI18nMessage(it, 'warning'))
        return
    }

    emits('submit', association.value)
}

const handleCancel = () => {
    emits('cancel', association.value)
}
</script>

<template>
    <el-form style="width: calc(100% - 0.5rem);">
        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_mappingAssociation')">
            <template v-for="columnReference in association.columnReferences">
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr 2em 1fr 1fr;">
                    <!-- 源表选择器-->
                    <el-select v-model="association.sourceTableName" clearable filterable
                               :placeholder="i18nStore.translate('LABEL_AssociationForm_sourceTableName_placeholder')">
                        <el-option v-for="table in sourceTableOptions" :key="table.name" :value="table.name"/>
                    </el-select>

                    <!-- 源列选择器-->
                    <el-select v-model="columnReference.sourceColumnName" clearable filterable
                               :placeholder="i18nStore.translate('LABEL_AssociationForm_sourceColumnName_placeholder')">
                        <el-option v-for="columnName in sourceColumnNameOptions" :key="columnName" :value="columnName"/>
                        <template #empty v-if="!association.sourceTableName">
                            {{ i18nStore.translate('LABEL_AssociationForm_placeSelectSourceTableFirst') }}
                        </template>
                    </el-select>

                    <el-text style="text-align: center;">
                        {{ " -> " }}
                    </el-text>

                    <!-- 目标表选择器-->
                    <el-select v-model="association.targetTableName" clearable filterable
                               :placeholder="i18nStore.translate('LABEL_AssociationForm_targetTableName_placeholder')">
                        <el-option v-for="table in targetTableOptions" :key="table.name" :value="table.name"/>
                    </el-select>

                    <!-- 目标列选择器-->
                    <el-select v-model="columnReference.targetColumnName" clearable filterable
                               :placeholder="i18nStore.translate('LABEL_AssociationForm_targetColumnName_placeholder')">
                        <el-option v-for="columnName in targetColumnNameOptions" :key="columnName" :value="columnName"/>
                        <template #empty v-if="!association.targetTableName">
                            {{ i18nStore.translate('LABEL_AssociationForm_placeSelectTargetTableFirst') }}
                        </template>
                    </el-select>
                </div>
            </template>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_name')">
            <el-input v-model="association.name">
                <template #append>
                    <el-button
                        :icon="RefreshRight"
                        @click="handleRefreshAssociationName"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_type')">
            <el-select v-model="association.type">
                <el-option v-for="associationType in AssociationType_CONSTANTS" :value="associationType"/>
            </el-select>
        </el-form-item>

        <el-form-item :label="i18nStore.translate('LABEL_AssociationForm_fake')">
            <el-switch v-model="association.fake"></el-switch>
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

        <div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
            <el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
            <el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
        </div>
    </el-form>
</template>
