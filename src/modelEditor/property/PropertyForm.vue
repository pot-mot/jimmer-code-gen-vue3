<script setup lang="ts">
import type {PropertyWithSource} from "@/modelEditor/property/usePropertyEditDialog.ts";
import {translate} from "@/store/i18nStore.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {ref, watch} from "vue";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";
import DiffJsonEditor from "@/components/code/jsonEditor/DiffJsonEditor.vue";
import {usePropertyJsonType} from "@/modelEditor/property/PropertyJsonType.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import type {ErrorObject} from "ajv";
import {formatErrorMessage} from "@/utils/type/typeGuard.ts";
import {validateEntityProperty} from "@/type/__generated/jsonSchema/items/EntityProperty.ts";
import {validateMappedSuperClassProperty} from "@/type/__generated/jsonSchema/items/MappedSuperClassProperty.ts";
import {validateEmbeddableTypeProperty} from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts";

const props = defineProps<{
    propertyWithSource: PropertyWithSource
}>()

const emits = defineEmits<{
    (name: 'submit', propertyWithProperty: PropertyWithSource): void
    (name: 'cancel'): void
}>()

const useDiff = ref(false)

const jsonType = usePropertyJsonType(() => props.propertyWithSource.property)

const originValue = ref<string>("")
const currentValue = ref<string>("")
watch(() => props.propertyWithSource, () => {
    const jsonStr = jsonPrettyFormat(props.propertyWithSource.property)
    originValue.value = jsonStr
    currentValue.value = jsonStr
}, {immediate: true})

// 表单验证错误
const errors = ref<Record<string, string>>({})

// 验证表单
const validateForm = (): {
    valid: true,
    propertyWithProperty: PropertyWithSource
} | {
    valid: false
} => {
    errors.value = {}

    try {
        const parsedProperty = JSON.parse(currentValue.value)
        let validateError: ErrorObject[] | null | undefined

        let parsedPropertyWithProperty: PropertyWithSource | undefined

        if ("entityId" in props.propertyWithSource) {
            if (!validateEntityProperty(parsedProperty, e => validateError = e)) {
                errors.value.jsonData = translate('json_validate_error')
                console.warn(formatErrorMessage(validateError))
            } else {
                parsedPropertyWithProperty = {
                    entityId: props.propertyWithSource.entityId,
                    property: parsedProperty
                }
            }
        } else if ("mappedSuperClassId" in props.propertyWithSource) {
            if (!validateMappedSuperClassProperty(parsedProperty, e => validateError = e)) {
                errors.value.jsonData = translate('json_validate_error')
                console.warn(formatErrorMessage(validateError))
            } else {
                parsedPropertyWithProperty = {
                    mappedSuperClassId: props.propertyWithSource.mappedSuperClassId,
                    property: parsedProperty
                }
            }
        } else if ("embeddableTypeId" in props.propertyWithSource) {
            if (!validateEmbeddableTypeProperty(parsedProperty, e => validateError = e)) {
                errors.value.jsonData = translate('json_validate_error')
                console.warn(formatErrorMessage(validateError))
            } else {
                parsedPropertyWithProperty = {
                    embeddableTypeId: props.propertyWithSource.embeddableTypeId,
                    property: parsedProperty
                }
            }
        }

        if (parsedPropertyWithProperty === undefined) {
            errors.value.jsonData = translate('json_validate_error')
            console.error("unsupported property type")
            return {
                valid: false
            }
        }

        return {
            valid: Object.keys(errors.value).length === 0,
            propertyWithProperty: parsedPropertyWithProperty
        }
    } catch (e) {
        errors.value.jsonData = `${translate('json_validate_error')}:\n${e}`
        console.error(e)

        return {
            valid: false
        }
    }
}

// 提交表单
const handleSubmit = () => {
    const validateResult = validateForm()
    if (validateResult.valid) {
        emits('submit', validateResult.propertyWithProperty)
    }
}

// 监听模型变化并清除对应错误
watch(() => [props.propertyWithSource, originValue.value, currentValue.value], () => {
    errors.value = {}
}, {deep: true})

// 取消操作
const handleCancel = () => {
    emits('cancel')
}
</script>

<template>
    <form @submit.prevent class="property-form">
        <div>
            Use Diff
            <input type="checkbox" v-model="useDiff">
        </div>

        <DiffJsonEditor
            class="property-json-editor"
            v-if="useDiff"
            :json-type="jsonType"
            v-model="currentValue"
            :origin-value="originValue"
        />
        <JsonEditor
            class="property-json-editor"
            v-else
            :json-type="jsonType"
            v-model="currentValue"
        />
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
.property-form {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
    overflow-y: auto;
}

.property-json-editor {
    height: calc(100% - 4rem);
}

textarea {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 1rem;
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