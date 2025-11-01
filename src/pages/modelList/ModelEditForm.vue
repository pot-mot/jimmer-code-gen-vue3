<script setup lang="ts" generic="T extends ModelInsertInput | ModelUpdateInput">
import type {ModelInsertInput, ModelUpdateInput} from "@/api/__generated/model/static";
import {ref, watch} from "vue";

const model = defineModel<T>({
    required: true
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

    if (!model.value.description || model.value.description.trim() === '') {
        errors.value.description = '模型描述不能为空'
    }

    try {
        JSON.parse(model.value.jsonData)
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
            <label for="modelName">模型名称 *</label>
            <input
                id="modelName"
                v-model="model.name"
                type="text"
                :class="{ 'error': errors.name }"
                placeholder="请输入模型名称"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-group">
            <label for="modelDescription">模型描述 *</label>
            <textarea
                id="modelDescription"
                v-model="model.description"
                :class="{ 'error': errors.description }"
                placeholder="请输入模型描述"
                rows="3"
            ></textarea>
            <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="databaseType">数据库类型</label>
                <select id="databaseType" v-model="model.databaseType">
                    <option value="POSTGRESQL">PostgreSQL</option>
                    <option value="MYSQL">MySQL</option>
                    <option value="ORACLE">Oracle</option>
                    <option value="SQLSERVER">SQL Server</option>
                    <option value="H2">H2</option>
                </select>
            </div>

            <div class="form-group">
                <label for="databaseNameStrategy">数据库命名策略</label>
                <select id="databaseNameStrategy" v-model="model.databaseNameStrategy">
                    <option value="LOWER_SNAKE">小写蛇形 (lower_snake)</option>
                    <option value="UPPER_SNAKE">大写蛇形 (UPPER_SNAKE)</option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="defaultForeignKeyType">外键类型</label>
                <select id="defaultForeignKeyType" v-model="model.defaultForeignKeyType">
                    <option value="REAL">真实外键</option>
                    <option value="SIMULATED">模拟外键</option>
                </select>
            </div>

            <div class="form-group">
                <label for="jvmLanguage">JVM 语言</label>
                <select id="jvmLanguage" v-model="model.jvmLanguage">
                    <option value="KOTLIN">Kotlin</option>
                    <option value="JAVA">Java</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label for="defaultEnumerationStrategy">枚举策略</label>
            <select id="defaultEnumerationStrategy" v-model="model.defaultEnumerationStrategy">
                <option value="NAME">名称</option>
                <option value="ORDINAL">序号</option>
            </select>
        </div>

        <div class="form-group">
            <label for="jsonData">JSON 数据 *</label>
            <textarea
                id="jsonData"
                v-model="model.jsonData"
                :class="{ 'error': errors.jsonData }"
                placeholder='请输入有效的 JSON 数据，例如: {"key": "value"}'
                rows="6"
            ></textarea>
            <div v-if="errors.jsonData" class="error-message">{{ errors.jsonData }}</div>
        </div>

        <div class="form-actions">
            <button type="button" @click="handleCancel" class="cancel-button">取消</button>
            <button type="submit" class="submit-button">保存</button>
        </div>
    </form>
</template>

<style scoped>
.model-edit-form {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
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

input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: var(--border);
    border-radius: var(--border-radius);
    font-size: 14px;
    box-sizing: border-box;
    transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary-color);
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
    gap: 12px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: var(--border);
}

.cancel-button,
.submit-button {
    padding: 0.5rem;
    cursor: pointer;
}
</style>
