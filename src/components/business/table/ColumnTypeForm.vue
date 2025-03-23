<script setup lang="ts">
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/store/columnDefault/ColumnDefaultStore.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {containsClassList, interactionTagClassList, judgeTarget} from "@/utils/clickUtils.ts";
import {useZIndex} from "element-plus";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import EnumSelect from "@/components/business/enum/EnumSelect.vue";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

const columnDefaultStore = useColumnDefaultStore()

const column = defineModel<GenTableModelInput_TargetOf_columns>({
    required: true
})

const emits = defineEmits<{
    (event: "editEnum", name: string): void,
    (event: "createEnum"): void,
}>()

const popoverOpenState = ref(false)

const zIndexManager = useZIndex()
const currentZIndex = ref<number>()
watch(() => popoverOpenState.value, (value) => {
    if (value) {
        if (currentZIndex.value == undefined || currentZIndex.value <= zIndexManager.currentZIndex.value) {
            currentZIndex.value = zIndexManager.nextZIndex()
        }
    }
})

const handleTypeCodeChange = () => {
    if (!column.value) return

    const typeCode = column.value.typeCode

    const columnDefaults = columnDefaultStore.get(typeCode)

    if (columnDefaults.length === 1) {
        const columnDefault = columnDefaults[0]

        column.value.overwriteByRaw = true
        column.value.rawType = columnDefault.rawType
        column.value.dataSize = columnDefault.dataSize
        column.value.numericPrecision = columnDefault.numericPrecision
        if (columnDefault.defaultValue) column.value.defaultValue = columnDefault.defaultValue
    } else {
        const type = jdbcTypeStore.codeTypeMap.get(typeCode)
        if (type) {
            column.value.rawType = type
        }
        column.value.overwriteByRaw = false
        column.value.dataSize = 0
        column.value.numericPrecision = 0
    }
}

const wrapper = ref()

useClickOutside(() => wrapper.value, (e) => {
    if (!popoverOpenState.value) return
    if (!judgeTarget(e, (el) => {
        if ('contenteditable' in el) {
            return true
        }
        if (interactionTagClassList.includes(el.tagName)) {
            return true
        }
        if (containsClassList(el, [...interactionTagClassList, 'column-type-form-input'])) {
            return true
        }
    })) {
        popoverOpenState.value = false
    }
})
</script>

<template>
    <div class="column-type-form" v-if="column">
        <div @click="popoverOpenState = !popoverOpenState" class="column-type-form-input">
            <el-input readonly :model-value="column.rawType">
                <template v-if="column.enum !== undefined" #prefix>
                    <span :class="`model-sub-group-${MODEL.enumNameGroupNameMap.get(column.enum.name)}`" style="transform: translateY(-0.1em);">
                        【{{ column.enum.name }}】
                    </span>
                </template>
            </el-input>
        </div>

        <div ref="wrapper" class="column-type-form-wrapper" v-show="popoverOpenState"
             :style="`z-index: ${currentZIndex};`">
            <el-form v-if="jdbcTypeStore.isLoaded && columnDefaultStore.isLoaded">
                <el-form-item :label="i18nStore.translate('LABEL_ColumnTypeForm_jdbcType')">
                    <el-select
                        v-model="column.typeCode"
                        filterable
                        style="width: 100%"
                        @change="handleTypeCodeChange"
                    >
                        <el-option
                            v-for="type in jdbcTypeStore.list"
                            :label="type.type"
                            :value="type.code"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item :label="i18nStore.translate('LABEL_ColumnTypeForm_overwriteByRaw')">
                    <el-switch v-model="column.overwriteByRaw"/>
                </el-form-item>

                <el-form-item :label="i18nStore.translate('LABEL_ColumnTypeForm_rawType')">
                    <el-input v-model="column.rawType" :disabled="!column.overwriteByRaw"/>
                </el-form-item>

                <el-form-item :label="i18nStore.translate('LABEL_ColumnTypeForm_sizeAndPrecision')">
                    <el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
                        <span>(</span>
                        <span><el-input-number v-model="column.dataSize" controls-position="right"/></span>
                        <span style="padding-left: 0.3em;">,</span>
                        <span><el-input-number v-model="column.numericPrecision" controls-position="right"/></span>
                        <span style="padding-left: 0.3em;">)</span>
                    </el-text>
                </el-form-item>

                <el-form-item :label="i18nStore.translate('LABEL_ColumnTypeForm_mappedEnum')">
                    <EnumSelect
                        :model-value="modelValue"
                        :enums="MODEL.enums"
                        @create="() => emits('createEnum')"
                        @edit="genEnum => emits('editEnum', genEnum.name)"
                    />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.column-type-form {
    position: relative;
}

.column-type-form-wrapper {
    position: absolute;
    top: 2em;
    padding: 20px 10px 10px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.column-type-form :deep(.el-input__prefix-inner>:last-child) {
    margin-right: 0;
}
</style>
