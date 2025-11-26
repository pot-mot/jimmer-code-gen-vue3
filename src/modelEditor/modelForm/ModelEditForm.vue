<script setup lang="ts" generic="T extends ModelInsertInput | ModelUpdateInput">
import type {ModelInsertInput, ModelUpdateInput} from "@/api/__generated/model/static";
import {onMounted, ref, watch} from "vue";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";
import {jsonPrettyFormat, jsonStrPrettyFormat} from "@/utils/json/jsonStringify.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";
import JvmLanguageSelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageSelect.vue";
import DatabaseTypeSelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeSelect.vue";
import type {ErrorObject} from "ajv";
import {formatErrorMessage} from "@/utils/type/typeGuard.ts";
import {translate} from "@/store/i18nStore.ts";
import {togglePropertyRawTypeByJvmLanguage} from "@/modelEditor/modelForm/jvmLanguage/togglePropertyRawTypeByJvmLanguage.ts";

const model = defineModel<T>({
    required: true
})

onMounted(() => {
    model.value.jsonData = jsonStrPrettyFormat(model.value.jsonData)
})

const emits = defineEmits<{
    (name: 'submit', value: T): void
    (name: 'cancel'): void
}>()

// 表单验证错误
const errors = ref<Record<string, string>>({})

// 验证表单
const validateForm = (): boolean => {
    errors.value = {}

    if (!model.value.name || model.value.name.trim() === '') {
        errors.value.name = translate({key: 'not_blank_warning', args: [translate('name')]})
    }

    try {
        let validateError: ErrorObject[] | null | undefined
        if (!validatePartialModelGraphSubData(JSON.parse(model.value.jsonData), e => validateError = e)) {
            errors.value.jsonData = `${translate('json_validate_error')}:\n${formatErrorMessage(validateError)}`
        }
    } catch (e) {
        errors.value.jsonData = `${translate('json_validate_error')}:\n${e}`
    }

    return Object.keys(errors.value).length === 0
}

// 提交表单
const handleSubmit = () => {
    if (validateForm()) {
        emits('submit', model.value)
    }
}

// 监听模型变化并清除对应错误
watch(() => model.value, () => {
    errors.value = {}
}, { deep: true })

watch(() => model.value.jvmLanguage, (_, oldValue) => {
    debugger
    try {
        const graphSubData = JSON.parse(model.value.jsonData)

        let validateError: ErrorObject[] | null | undefined
        if (!validatePartialModelGraphSubData(graphSubData, e => validateError = e)) {
            errors.value.jsonData = `${translate('json_validate_error')}:\n${formatErrorMessage(validateError)}`
        } else {
            togglePropertyRawTypeByJvmLanguage(graphSubData, oldValue)
            model.value.jsonData = jsonPrettyFormat(graphSubData)
        }
    } catch (e) {
        errors.value.jsonData = `${translate('json_validate_error')}:\n${e}`
    }
})

// 取消操作
const handleCancel = () => {
    emits('cancel')
}
</script>

<template>
    <form @submit.prevent class="model-edit-form">
        <div class="form-item">
            <input
                v-model="model.name"
                type="text"
                :class="{ 'error': errors.name }"
                :placeholder="translate({key: 'input_placeholder', args: [translate('name')]})"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-row">
            <div class="form-item">
                <JvmLanguageSelect v-model="model.jvmLanguage"/>
            </div>

            <div class="form-item">
                <DatabaseTypeSelect v-model="model.databaseType"/>
            </div>
        </div>

        <div class="form-row">
            <div class="form-item">
                <select v-model="model.defaultForeignKeyType">
                    <option value="REAL">{{ translate('model_fk_real') }}</option>
                    <option value="FAKE">{{ translate('model_fk_fake') }}</option>
                </select>
            </div>

            <div class="form-item">
                <select v-model="model.defaultEnumerationStrategy">
                    <option value="NAME">{{ translate('model_enum_name') }}</option>
                    <option value="ORDINAL">{{ translate('model_enum_ordinal') }}</option>
                </select>
            </div>

            <div class="form-item">
                <select v-model="model.databaseNameStrategy">
                    <option value="LOWER_SNAKE">{{ translate('model_db_lower_snake') }}</option>
                    <option value="UPPER_SNAKE">{{ translate('model_db_upper_snake') }}</option>
                </select>
            </div>
        </div>

        <div class="form-item">
            <textarea
                v-model="model.description"
                :placeholder="translate({key: 'input_placeholder', args: [translate('description')]})"
                rows="3"
            />
        </div>

        <div class="json-data-editor">
            <JsonEditor json-type="PartialModelGraphSubData" v-model="model.jsonData"/>
        </div>
        <div v-if="errors.jsonData" class="error-message">{{ errors.jsonData }}</div>

        <div class="form-actions">
            <button @click="handleCancel" class="cancel-button">
                <IconClose/>
                {{ translate('cancel') }}
            </button>
            <button @click="handleSubmit" class="submit-button">
                <IconCheck/>
                {{ translate('save') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.model-edit-form {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
    overflow-y: auto;
}

.form-item {
    margin-bottom: 0.5rem;
}

.form-row {
    display: flex;
    gap: 0.5rem;
}

.form-row .form-item {
    flex: 1;
}

input {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 0.9rem;
}

select {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 0.8rem;
}

:deep(.database-type-selected-option),
:deep(.jvm-language-selected-option) {
    padding: 0.5rem;
}

textarea {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 1rem;
}

.json-data-editor {
    height: calc(100% - 18rem - 2px);
}

input.error, select.error, textarea.error {
    border-color: var(--danger-color);
}

.error-message {
    margin-top: 6px;
    color: var(--danger-color);
    font-size: 0.8rem;
    white-space: pre-line;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

.cancel-button,
.submit-button {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.8rem;
}

.cancel-button {
    border-color: var(--warning-color);
    --icon-color: var(--warning-color);
}

.submit-button {
    border-color: var(--success-color);
    --icon-color: var(--success-color);
}
</style>
