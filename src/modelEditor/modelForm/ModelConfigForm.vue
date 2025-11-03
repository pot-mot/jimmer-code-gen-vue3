<script setup lang="ts" generic="T extends Omit<Model, 'id' | 'createdTime' | 'modifiedTime'>">
import {ref, watch} from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";
import DatabaseTypeSelect from "@/modelEditor/modelForm/databaseType/DatabaseTypeSelect.vue";
import JvmLanguageSelect from "@/modelEditor/modelForm/jvmLanguage/JvmLanguageSelect.vue";

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
    <form @submit.prevent class="model-edit-form">
        <div class="form-group">
            <input
                v-model="model.name"
                type="text"
                :class="{ 'error': errors.name }"
                placeholder="请输入模型名称"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <JvmLanguageSelect v-model="model.jvmLanguage"/>
            </div>

            <div class="form-group">
                <DatabaseTypeSelect v-model="model.databaseType"/>
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

        <div style="height: calc(100% - 12.5rem);">
            <textarea
                v-model="model.description"
                placeholder="请输入模型描述"
                rows="3"
                style="height: 100%;"
            />
        </div>

        <div class="form-actions">
            <button @click="handleCancel" class="cancel-button">
                <IconClose/>
                取消
            </button>
            <button @click="handleSubmit" class="submit-button">
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
    padding: 0.5rem 0.5rem 0.5rem;
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
