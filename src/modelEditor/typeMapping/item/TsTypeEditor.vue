<script setup lang="ts">
import type {
    TsTypeInput,
    TsTypeInput_TargetOf_jvmMatchRules,
    TsTypeInput_TargetOf_sqlMatchRules,
} from "@/api/__generated/model/static";
import EditList from "@/components/list/selectableList/EditList.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {ref, watch} from "vue";
import {validateJvmMatchRule} from "@/type/__generated/jsonSchema/items/JvmMatchRule.ts";
import {validateSqlMatchRule} from "@/type/__generated/jsonSchema/items/SqlMatchRule.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import JvmLanguageOrAnySelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageOrAnySelect.vue";
import DatabaseTypeOrAnySelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeOrAnySelect.vue";
import {validateTsImport} from "@/type/__generated/jsonSchema/items/TsImport.ts";
import {validateRegExp} from "@/utils/regExp/parseRegExp.ts";

const tsTypeInput = defineModel<TsTypeInput>({
    required: true
})

const openState = ref(false)

const defaultTsImport = (): TsImport => {
    return {
        name: "",
        fromPath: "",
        typeOnly: true,
    }
}

const defaultJvmMatchRule = (): TsTypeInput_TargetOf_jvmMatchRules => {
    return {
        jvmSource: "ANY",
        matchRegExp: "",
    }
}

const defaultSqlMatchRule = (): TsTypeInput_TargetOf_sqlMatchRules => {
    return {
        databaseSource: "ANY",
        matchRegExp: "",
    }
}

// 表单验证错误
const errors = ref<Record<string, string>>({})
// 验证表单
const validateForm = (): boolean => {
    errors.value = {}

    if (!tsTypeInput.value.typeExpression || tsTypeInput.value.typeExpression.trim() === '') {
        errors.value.typeExpression = translate({key: 'not_blank_warning', args: [translate('typeExpression')]})
    }

    tsTypeInput.value.extraImports.forEach((importItem, index) => {
        if (importItem.name.trim() === '') {
            errors.value[`extraImports.${index}.name`] = translate({
                key: 'not_blank_warning',
                args: [translate('extraImports')]
            })
        }
        if (importItem.fromPath.trim() === '') {
            errors.value[`extraImports.${index}.fromPath`] = translate({
                key: 'not_blank_warning',
                args: [translate('extraImports')]
            })
        }
    })

    tsTypeInput.value.jvmMatchRules.forEach((rule, index) => {
        if (!rule.matchRegExp || rule.matchRegExp.trim() === '') {
            errors.value[`jvmMatchRules.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('matchRegExp')]
            })
        } else if (!validateRegExp(rule.matchRegExp)) {
            errors.value[`jvmMatchRules.${index}`] = translate('invalid_regexp')
        }
    })

    tsTypeInput.value.sqlMatchRules.forEach((rule, index) => {
        if (!rule.matchRegExp || rule.matchRegExp.trim() === '') {
            errors.value[`sqlMatchRules.${index}`] = translate({
                key: 'not_blank_warning',
                args: [translate('matchRegExp')]
            })
        } else if (!validateRegExp(rule.matchRegExp)) {
            errors.value[`sqlMatchRules.${index}`] = translate('invalid_regexp')
        }
    })

    return Object.keys(errors.value).length === 0
}

watch(() => tsTypeInput.value, () => {
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
        class="ts-type-editor"
    >
        <template #head>
            <div class="ts-type-editor-header">
                <div class="input-wrapper">
                    <input
                        v-model="tsTypeInput.typeExpression"
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
                <span class="label no-drag">{{ translate("extraImports") }}</span>
                <EditList
                    v-model:lines="tsTypeInput.extraImports"
                    :default-line="defaultTsImport"
                    :json-schema-validate="validateTsImport"
                >
                    <template #line="{index}">
                        <div class="sub-line">
                            <template v-if="tsTypeInput.extraImports[index]">
                                <input
                                    v-model="tsTypeInput.extraImports[index].typeOnly"
                                    type="checkbox"
                                >
                                <div class="input-wrapper">
                                    <input
                                        v-model="tsTypeInput.extraImports[index].name"
                                        :class="{ 'error': errors[`extraImports.${index}.name`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('extraImports')]})"
                                    >
                                    <div v-if="errors[`extraImports.${index}.name`]" class="error-message">
                                        {{ errors[`extraImports.${index}.name`] }}
                                    </div>
                                </div>
                                <span> from </span>
                                <div class="input-wrapper">
                                    <input
                                        v-model="tsTypeInput.extraImports[index].fromPath"
                                        :class="{ 'error': errors[`extraImports.${index}.fromPath`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('extraImports')]})"
                                    >
                                    <div v-if="errors[`extraImports.${index}.fromPath`]" class="error-message">
                                        {{ errors[`extraImports.${index}.fromPath`] }}
                                    </div>
                                </div>
                            </template>
                            <button class="delete-button" @click="tsTypeInput.extraImports.splice(index, 1)">
                                <IconDelete/>
                            </button>
                        </div>
                    </template>
                </EditList>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("jvmMatchRules") }}</span>
                <EditList
                    v-model:lines="tsTypeInput.jvmMatchRules"
                    :default-line="defaultJvmMatchRule"
                    :json-schema-validate="validateJvmMatchRule"
                >
                    <template #line="{index}">
                        <template v-if="tsTypeInput.jvmMatchRules[index]">
                            <div class="sub-line">
                                <JvmLanguageOrAnySelect v-model="tsTypeInput.jvmMatchRules[index].jvmSource"/>
                                <div class="input-wrapper">
                                    <input
                                        v-model="tsTypeInput.jvmMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`jvmMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`jvmMatchRules.${index}`]" class="error-message">
                                        {{ errors[`jvmMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <button class="delete-button" @click="tsTypeInput.jvmMatchRules.splice(index, 1)">
                                    <IconDelete/>
                                </button>
                            </div>
                        </template>
                    </template>
                </EditList>
            </div>

            <div class="editor-item">
                <span class="label no-drag">{{ translate("sqlMatchRules") }}</span>
                <EditList
                    v-model:lines="tsTypeInput.sqlMatchRules"
                    :default-line="defaultSqlMatchRule"
                    :json-schema-validate="validateSqlMatchRule"
                >
                    <template #line="{index}">
                        <template v-if="tsTypeInput.sqlMatchRules[index]">
                            <div class="sub-line">
                                <DatabaseTypeOrAnySelect v-model="tsTypeInput.sqlMatchRules[index].databaseSource"/>
                                <div class="input-wrapper">
                                    <input
                                        v-model="tsTypeInput.sqlMatchRules[index].matchRegExp"
                                        :class="{ 'error': errors[`sqlMatchRules.${index}`] }"
                                        :placeholder="translate({key: 'input_placeholder', args: [translate('matchRegExp')]})"
                                    >
                                    <div v-if="errors[`sqlMatchRules.${index}`]" class="error-message">
                                        {{ errors[`sqlMatchRules.${index}`] }}
                                    </div>
                                </div>
                                <button class="delete-button" @click="tsTypeInput.sqlMatchRules.splice(index, 1)">
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
.ts-type-editor {
    padding: 0.25rem 0.5rem;
}

.ts-type-editor-header {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
}

.ts-type-editor-header > .input-wrapper {
    width: 100%;
}

.ts-type-editor-header > .input-wrapper > input {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    flex-shrink: 0;
}

.ts-type-editor-header > .input-wrapper > input.error {
    border-color: var(--danger-color);
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
