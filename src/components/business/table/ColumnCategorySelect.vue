<script setup lang="ts">
import {type Component, computed} from "vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";
import PrimaryKeyIcon from "@/components/global/icons/database/PrimaryKeyIcon.vue";
import BusinessKeyIcon from "@/components/global/icons/database/BusinessKeyIcon.vue";
import LogicalDeleteIcon from "@/components/global/icons/database/LogicalDeleteIcon.vue";
import AutoIncrementIcon from "@/components/global/icons/database/AutoIncrementIcon.vue";

const i18nStore = useI18nStore()

const columnCategory_CONSTANT = [
    'PRIMARY_KEY',
    'BUSINESS_KEY',
    'LOGICAL_DELETE',
    'AUTO_INCREMENT'
] as const

type ColumnCategory = typeof columnCategory_CONSTANT[number]

const columnCategoryComponent: { [key in ColumnCategory]: Component } = {
    PRIMARY_KEY: PrimaryKeyIcon,
    BUSINESS_KEY: BusinessKeyIcon,
    LOGICAL_DELETE: LogicalDeleteIcon,
    AUTO_INCREMENT: AutoIncrementIcon,
}


const column = defineModel<GenTableModelInput_TargetOf_columns>("column", {
    required: true
})

const keyGroups = defineModel<Array<string>>("keyGroups", {
    required: true
})

const emits = defineEmits<{
    (event: "updatePrimaryKey", value: boolean): void,
    (event: "updateBusinessKey", value: boolean): void,
    (event: "updateLogicalDelete", value: boolean): void,
    (event: "updateAutoIncrement", value: boolean): void,
}>()

const columnCategories = computed<ColumnCategory[]>({
    get() {
        const result: ColumnCategory[] = []

        if (column.value.partOfPk) {
            result.push('PRIMARY_KEY')
        }
        if (column.value.autoIncrement) {
            result.push('AUTO_INCREMENT')
        }
        if (column.value.businessKey) {
            result.push('BUSINESS_KEY')
        }
        if (column.value.logicalDelete) {
            result.push('LOGICAL_DELETE')
        }

        return result
    },
    set(value: ColumnCategory[]) {
        const newPartOfPk = value.includes('PRIMARY_KEY')
        if (column.value.partOfPk !== newPartOfPk) {
            if (newPartOfPk) {
                column.value.typeNotNull = true
                column.value.businessKey = false
                column.value.logicalDelete = false
                column.value.enum = undefined
            } else {
                value = value.filter(it => it !== 'AUTO_INCREMENT')
            }
            column.value.partOfPk = newPartOfPk
            emits('updatePrimaryKey', newPartOfPk)
        }

        const newBusinessKey = value.includes('BUSINESS_KEY')
        if (column.value.businessKey !== newBusinessKey) {
            if (newBusinessKey) {
                column.value.partOfPk = false
            } else {
                column.value.keyGroup = undefined
            }
            column.value.businessKey = newBusinessKey
            emits('updateBusinessKey', newBusinessKey)
        }

        const newLogicalDelete = value.includes('LOGICAL_DELETE')
        if (column.value.logicalDelete !== newLogicalDelete) {
            if (newLogicalDelete) {
                column.value.partOfPk = false
            }
            column.value.logicalDelete = newLogicalDelete
            emits('updateLogicalDelete', newLogicalDelete)
        }

        const newAutoIncrement = value.includes('AUTO_INCREMENT')
        if (column.value.autoIncrement !== newAutoIncrement) {
            column.value.autoIncrement = newAutoIncrement
            emits('updateAutoIncrement', newAutoIncrement)
        }
    },
})
</script>

<template>
    <el-select multiple clearable placeholder="" v-model="columnCategories">
        <template #tag>
            <span style="padding: 0 0.5rem; overflow: hidden;">
                <component v-for="category in columnCategories"
                           :key="category"
                           :is="columnCategoryComponent[category]"/>
                <el-text v-if="column.keyGroup" type="info">
                    {{ column.keyGroup }}
                </el-text>
            </span>
        </template>

        <el-option
            :disabled="column.businessKey || column.logicalDelete"
            value="PRIMARY_KEY">
            <PrimaryKeyIcon/>
            {{ i18nStore.translate('LABEL_TableForm_columnType_pk') }}
        </el-option>

        <el-option
            :disabled="!column.partOfPk"
            value="AUTO_INCREMENT">
            <AutoIncrementIcon/>
            {{ i18nStore.translate('LABEL_TableForm_columnType_autoIncrement') }}
        </el-option>

        <el-option
            :disabled="column.partOfPk"
            value="BUSINESS_KEY"
            :style="column.businessKey ? 'height: 5rem;' : ''"
        >
            <BusinessKeyIcon/>
            {{ i18nStore.translate('LABEL_TableForm_columnType_businessKey') }}
            <br>
            <el-select
                v-if="column.businessKey"
                v-model="column.keyGroup"
                :placeholder="i18nStore.translate('LABEL_TableForm_columnType_keyGroup')"
                clearable
                filterable
                allow-create
                @click="(e: Event) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.stopImmediatePropagation()
                }"
            >
                <el-option
                    v-for="keyGroup in [...keyGroups]"
                    :key="keyGroup"
                    :value="keyGroup"
                />
            </el-select>
        </el-option>

        <el-option
            :disabled="column.partOfPk"
            value="LOGICAL_DELETE">
            <LogicalDeleteIcon/>
            {{ i18nStore.translate('LABEL_TableForm_columnType_logicalDelete') }}
        </el-option>
    </el-select>
</template>
