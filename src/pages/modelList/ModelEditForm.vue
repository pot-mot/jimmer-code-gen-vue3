<script setup lang="ts" generic="T extends ModelInsertInput | ModelUpdateInput">
import type {ModelInsertInput, ModelUpdateInput} from "@/api/__generated/model/static";
import {onMounted, ref, watch} from "vue";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";
import {jsonStrPrettyFormat} from "@/utils/json/jsonStringify.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";

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
        errors.value.name = '模型名称不能为空'
    }

    try {
        let error
        if (!validatePartialModelGraphSubData(JSON.parse(model.value.jsonData), e => error = e)) {
            errors.value.jsonData = `JSON 数据格式错误: ${error}`
        }
    } catch (e) {
        errors.value.jsonData = 'JSON 数据格式不正确'
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
watch(model, () => {
    errors.value = {}
}, { deep: true })

// 取消操作
const handleCancel = () => {
    emits('cancel')
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="model-edit-form">
        <div class="form-group">
            <input
                v-model="model.name"
                type="text"
                :class="{ 'error': errors.name }"
                placeholder="请输入模型名称"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-group">
            <textarea
                v-model="model.description"
                placeholder="请输入模型描述"
                rows="3"
            />
        </div>

        <div class="form-row">
            <div class="form-group">
                <select v-model="model.jvmLanguage">
                    <option value="KOTLIN">Kotlin</option>
                    <option value="JAVA">Java</option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="model.databaseType">
                    <option value="POSTGRESQL">PostgreSQL</option>
                    <option value="MYSQL">MySQL</option>
                    <option value="ORACLE">Oracle</option>
                    <option value="SQLSERVER">SQL Server</option>
                    <option value="H2">H2</option>
                    <option value="SQLITE">Sqlite</option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <select v-model="model.defaultForeignKeyType">
                    <option value="REAL">真实外键（REAL）</option>
                    <option value="FAKE">虚拟外键（FAKE）</option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="model.defaultEnumerationStrategy">
                    <option value="NAME">枚举使用名称（NAME）</option>
                    <option value="ORDINAL">枚举使用序号（ORDINAL）</option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="model.databaseNameStrategy">
                    <option value="LOWER_SNAKE">小写蛇形 (lower_snake)</option>
                    <option value="UPPER_SNAKE">大写蛇形 (UPPER_SNAKE)</option>
                </select>
            </div>
        </div>

        <div class="json-data-editor">
            <JsonEditor json-type="PartialModelGraphSubData" v-model="model.jsonData"/>
            <div v-if="errors.jsonData" class="error-message">{{ errors.jsonData }}</div>
        </div>

        <div class="form-actions">
            <button type="button" @click="handleCancel" class="cancel-button">
                <IconClose/>
                取消
            </button>
            <button type="submit" class="submit-button">
                <IconCheck/>
                保存
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

.form-group {
    margin-bottom: 0.5rem;
}

.form-row {
    display: flex;
    gap: 0.5rem;
}

.form-row .form-group {
    flex: 1;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #333;
}

input,
select,
textarea {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
}

.json-data-editor {
    height: calc(100% - 18rem);
}

input.error, select.error, textarea.error {
    border-color: var(--danger-color);
}

.error-message {
    margin-top: 6px;
    color: var(--danger-color);
    font-size: 0.8rem;
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
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 14px;
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
