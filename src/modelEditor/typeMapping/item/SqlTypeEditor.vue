<script setup lang="ts">
import type {
    SqlTypeInput, SqlTypeInput_TargetOf_jvmMatchRules, SqlTypeInput_TargetOf_tsMatchRules,
} from "@/api/__generated/model/static";
import EditList from "@/components/list/selectableList/EditList.vue";
import JvmLanguageOrAnySelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageOrAnySelect.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {ref, watch} from "vue";
import {isString} from "@/utils/type/typeGuard.ts";
import {validateTsMatchRule} from "@/type/__generated/jsonSchema/items/TsMatchRule.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import DatabaseTypeOrAnySelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeOrAnySelect.vue";
import {validateRegExp} from "@/utils/regExp/parseRegExp.ts";

const sqlTypeInput = defineModel<SqlTypeInput>({
    required: true
})

const openState = ref(false)

const defaultJvmMatchRule = (): SqlTypeInput_TargetOf_jvmMatchRules => {
    return {
        jvmSource: "ANY",
        matchRegExp: "",
    }
}

const defaultTsMatchRule = (): SqlTypeInput_TargetOf_tsMatchRules => {
    return {
        matchRegExp: "",
    }
}


// 表单验证错误
const errors = ref<Record<string, string>>({})
// 验证表单
const validateForm = (): boolean => {
    errors.value = {}

    if (!sqlTypeInput.value.type || sqlTypeInput.value.type.trim() === '') {
        errors.value.type = translate({key: 'not_blank_warning', args: [translate('typeExpression')]})
    }

    sqlTypeInput.value.jvmMatchRules.forEach((rule, index) => {
        if (!rule.matchRegExp || rule.matchRegExp.trim() === '') {
            errors.value[`jvmMatchRules.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('matchRegExp')]
            })
        } else if (!validateRegExp(rule.matchRegExp)) {
            errors.value[`jvmMatchRules.${index}`] = translate('invalid_regexp')
        }
    })
    sqlTypeInput.value.tsMatchRules.forEach((rule, index) => {
        if (!rule.matchRegExp || rule.matchRegExp.trim() === '') {
            errors.value[`tsMatchRules.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('matchRegExp')]
            })
        } else if (!validateRegExp(rule.matchRegExp)) {
            errors.value[`tsMatchRules.${index}`] = translate('invalid_regexp')
        }
    })

    return Object.keys(errors.value).length === 0
}

watch(() => sqlTypeInput.value, () => {
    errors.value = {}
}, {deep: true})

defineExpose({
    validateForm,
    errors
})
</script>

<template>
    <CollapseDetail
        v-model="openState"
        class="sql-type-editor"
    >
        <template #head>
            <div class="sql-type-editor-header">
                <DatabaseTypeOrAnySelect v-model="sqlTypeInput.databaseSource"/>
                <div class="input-wrapper">
                    <input
                        v-model="sqlTypeInput.type"
                        :class="{ 'error': errors.type }"
                        :placeholder="translate({key: 'input_placeholder', args: [translate('typeExpression')]})"
                    >
                    <div v-if="errors.type" class="error-message">{{ errors.type }}</div>
                    <div
                        class="error-message"
                        v-if="!openState && (
                            (!errors.type && Object.keys(errors).length > 0) ||
                            (Object.keys(errors).length > 1)
                        )"
                    >
                        {{ translate('validate_fail') }}
                    </div>
                </div>
            </div>
        </template>

        <template #body>
            <div class="editor-item">
                <span class="label no-drag">{{ translate("dataSize") }}</span>
                <div class="input-wrapper">
                    <input
                        v-model="sqlTypeInput.dataSize"
                        type="number"
                        :placeholder="translate({key: 'input_placeholder', args: [translate('dataSize')]})"
                    >
                </div>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("numericPrecision") }}</span>
                <div class="input-wrapper">
                    <input
                        v-model="sqlTypeInput.numericPrecision"
                        type="number"
                        :placeholder="translate({key: 'input_placeholder', args: [translate('numericPrecision')]})"
                    >
                </div>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("defaultValue") }}</span>
                <div class="input-wrapper">
                    <input
                        v-model="sqlTypeInput.defaultValue"
                        :placeholder="translate({key: 'input_placeholder', args: [translate('defaultValue')]})"
                    >
                </div>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("jvmMatchRules") }}</span>
                <EditList
                    v-model:lines="sqlTypeInput.jvmMatchRules"
                    :default-line="defaultJvmMatchRule"
                    :json-schema-validate="isString"
                >
                    <template #line="{index}">
                        <template v-if="sqlTypeInput.jvmMatchRules[index]">
                            <div class="sub-line">
                                <JvmLanguageOrAnySelect v-model="sqlTypeInput.jvmMatchRules[index].jvmSource"/>
                                <div class="input-wrapper">
                                    <input
                                        v-model="sqlTypeInput.jvmMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`jvmMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`jvmMatchRules.${index}`]" class="error-message">
                                        {{ errors[`jvmMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <button class="delete-button" @click="sqlTypeInput.jvmMatchRules.splice(index, 1)">
                                    <IconDelete/>
                                </button>
                            </div>
                        </template>
                    </template>
                </EditList>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("tsMatchRules") }}</span>
                <EditList
                    v-model:lines="sqlTypeInput.tsMatchRules"
                    :default-line="defaultTsMatchRule"
                    :json-schema-validate="validateTsMatchRule"
                >
                    <template #line="{index}">
                        <template v-if="sqlTypeInput.tsMatchRules[index]">
                            <div class="sub-line">
                                <div class="input-wrapper">
                                    <input
                                        v-model="sqlTypeInput.tsMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`tsMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`tsMatchRules.${index}`]" class="error-message">
                                        {{ errors[`tsMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <button class="delete-button" @click="sqlTypeInput.tsMatchRules.splice(index, 1)">
                                    <IconDelete/>
                                </button>
                            </div>
                        </template>
                    </template>
                </EditList>
            </div>
        </template>
    </CollapseDetail>
</template>

<style scoped>
.sql-type-editor {
    padding: 0.25rem 0.5rem;
}

.sql-type-editor-header {
    display: grid;
    grid-template-columns: 6rem 1fr;
    grid-gap: 0.5rem;
}

.sql-type-editor-header > .input-wrapper {
    width: 100%;
}

.editor-item {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 8rem 1fr;
    margin-bottom: 0.5rem;
}

.editor-item .label {
    text-align: right;
}

.input-wrapper {
    position: relative;
}

.input-wrapper > input {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    flex-shrink: 0;
}

.input-wrapper > input.error {
    border-color: var(--danger-color);
}

.sub-line {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0.25rem 0.5rem;
}

.sub-line > .input-wrapper {
    flex: 1;
}

.sub-line > .input-wrapper > input {
    flex: 1;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    flex-shrink: 0;
    width: 100%;
}

.sub-line > .input-wrapper > input.error {
    border-color: var(--danger-color);
}

.delete-button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    flex-shrink: 0;
}

.error-message {
    margin-top: 6px;
    color: var(--danger-color);
    font-size: 0.8rem;
    white-space: pre-line;
}
</style>
