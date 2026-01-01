<script setup lang="ts">
import type {
    JvmTypeInput, JvmTypeInput_TargetOf_sqlMatchRules, JvmTypeInput_TargetOf_tsMatchRules,
} from "@/api/__generated/model/static";
import EditList from "@/components/list/selectableList/EditList.vue";
import DatabaseTypeOrAnySelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeOrAnySelect.vue";
import JvmLanguageOrAnySelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageOrAnySelect.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {translate} from "@/store/i18nStore.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import {validateTsMatchRule} from "@/type/__generated/jsonSchema/items/TsMatchRule.ts";
import {validateSqlMatchRule} from "@/type/__generated/jsonSchema/items/SqlMatchRule.ts";
import {isString} from "@/utils/type/typeGuard.ts";
import {ref, watch} from "vue";
import {validateRegExp} from "@/utils/regExp/parseRegExp.ts";
import NullableLimitSelect from "@/modelEditor/typeMapping/select/NullableLimitSelect.vue";

const jvmTypeInput = defineModel<JvmTypeInput>({
    required: true
})

const openState = ref(false)

const defaultSqlMatchRule = (): JvmTypeInput_TargetOf_sqlMatchRules => {
    return {
        databaseSource: "ANY",
        matchRegExp: "",
    }
}

const defaultTsMatchRule = (): JvmTypeInput_TargetOf_tsMatchRules => {
    return {
        matchRegExp: "",
    }
}

// 表单验证错误
const errors = ref<Record<string, string>>({})
// 验证表单
const validateForm = (): boolean => {
    errors.value = {}

    if (!jvmTypeInput.value.typeExpression || jvmTypeInput.value.typeExpression.trim() === '') {
        errors.value.typeExpression = translate({key: 'not_blank_warning', args: [translate('typeExpression')]})
    }
    jvmTypeInput.value.extraImports.forEach((importItem, index) => {
        if (!importItem || importItem.trim() === '') {
            errors.value[`extraImports.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('extraImports')]
            })
        }
    })
    jvmTypeInput.value.extraAnnotations.forEach((annotation, index) => {
        if (!annotation || annotation.trim() === '') {
            errors.value[`extraAnnotations.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('extraAnnotations')]
            })
        }
    })
    jvmTypeInput.value.sqlMatchRules.forEach((rule, index) => {
        if (!rule.matchRegExp || rule.matchRegExp.trim() === '') {
            errors.value[`sqlMatchRules.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('matchRegExp')]
            })
        } else if (!validateRegExp(rule.matchRegExp)) {
            errors.value[`sqlMatchRules.${index}`] = translate('invalid_regexp')
        }
    })
    jvmTypeInput.value.tsMatchRules.forEach((rule, index) => {
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

watch(() => jvmTypeInput.value, () => {
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
        class="jvm-type-editor"
    >
        <template #head>
            <div class="jvm-type-editor-header">
                <JvmLanguageOrAnySelect v-model="jvmTypeInput.jvmSource"/>
                <div class="input-wrapper">
                    <input
                        v-model="jvmTypeInput.typeExpression"
                        :class="{ 'error': errors.typeExpression }"
                        :placeholder="translate({key: 'input_placeholder', args: [translate('typeExpression')]})"
                    >
                    <div v-if="errors.typeExpression" class="error-message">{{ errors.typeExpression }}</div>
                    <div
                        class="error-message"
                        v-if="!openState && (
                            (!errors.typeExpression && Object.keys(errors).length > 0) ||
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
                <span class="label no-drag">@Serialized</span>
                <div>
                    <input type="checkbox" v-model="jvmTypeInput.serialized">
                </div>
            </div>
            <div class="editor-item">
                <span class="label no-drag">{{ translate("extraImports") }}</span>
                <EditList
                    v-model:lines="jvmTypeInput.extraImports"
                    default-line=""
                    :json-schema-validate="isString"
                >
                    <template #line="{index}">
                        <div class="sub-line">
                            <div class="input-wrapper">
                                <input
                                    v-model="jvmTypeInput.extraImports[index]"
                                    :class="{ 'error': errors[`extraImports.${index}`] }"
                                    :placeholder="translate({key: 'input_placeholder', args: [translate('extraImports')]})"
                                >
                                <div v-if="errors[`extraImports.${index}`]" class="error-message">
                                    {{ errors[`extraImports.${index}`] }}
                                </div>
                            </div>
                            <button class="delete-button" @click="jvmTypeInput.extraImports.splice(index, 1)">
                                <IconDelete/>
                            </button>
                        </div>
                    </template>
                </EditList>
            </div>
            <div class="editor-item">
                <span class="label no-drag">{{ translate("extraAnnotations") }}</span>
                <EditList
                    v-model:lines="jvmTypeInput.extraAnnotations"
                    default-line=""
                    :json-schema-validate="isString"
                >
                    <template #line="{index}">
                        <div class="sub-line">
                            <div class="input-wrapper">
                                <input
                                    v-model="jvmTypeInput.extraAnnotations[index]"
                                    :class="{ 'error': errors[`extraAnnotations.${index}`] }"
                                    :placeholder="translate({key: 'input_placeholder', args: [translate('extraAnnotations')]})"
                                >
                                <div v-if="errors[`extraAnnotations.${index}`]" class="error-message">
                                    {{ errors[`extraAnnotations.${index}`] }}
                                </div>
                            </div>
                            <button class="delete-button" @click="jvmTypeInput.extraAnnotations.splice(index, 1)">
                                <IconDelete/>
                            </button>
                        </div>
                    </template>
                </EditList>
            </div>
            <div class="editor-item">
                <span class="label no-drag">{{ translate("sqlMatchRules") }}</span>
                <EditList
                    v-model:lines="jvmTypeInput.sqlMatchRules"
                    :default-line="defaultSqlMatchRule"
                    :json-schema-validate="validateSqlMatchRule"
                >
                    <template #line="{index}">
                        <template v-if="jvmTypeInput.sqlMatchRules[index]">
                            <div class="sub-line">
                                <DatabaseTypeOrAnySelect v-model="jvmTypeInput.sqlMatchRules[index].databaseSource"/>
                                <div class="input-wrapper">
                                    <input
                                        v-model="jvmTypeInput.sqlMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`sqlMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`sqlMatchRules.${index}`]" class="error-message">
                                        {{ errors[`sqlMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <NullableLimitSelect v-model="jvmTypeInput.sqlMatchRules[index].nullableLimit"/>
                                <button class="delete-button" @click="jvmTypeInput.sqlMatchRules.splice(index, 1)">
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
                    v-model:lines="jvmTypeInput.tsMatchRules"
                    :default-line="defaultTsMatchRule"
                    :json-schema-validate="validateTsMatchRule"
                >
                    <template #line="{index}">
                        <template v-if="jvmTypeInput.tsMatchRules[index]">
                            <div class="sub-line">
                                <div class="input-wrapper">
                                    <input
                                        v-model="jvmTypeInput.tsMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`tsMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`tsMatchRules.${index}`]" class="error-message">
                                        {{ errors[`tsMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <button class="delete-button" @click="jvmTypeInput.tsMatchRules.splice(index, 1)">
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
.jvm-type-editor {
    padding: 0.25rem 0.5rem;
}

.jvm-type-editor-header {
    display: grid;
    grid-template-columns: 6rem 1fr;
    grid-gap: 0.5rem;
}

.jvm-type-editor-header > .input-wrapper {
    width: 100%;
}

.jvm-type-editor-header > .input-wrapper > input {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    flex-shrink: 0;
}

.jvm-type-editor-header > .input-wrapper > input.error {
    border-color: var(--danger-color);
}

.editor-item {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 8rem 1fr;
}

.editor-item .label {
    text-align: right;
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

.sub-line > input {
    flex: 1;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    flex-shrink: 0;
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
