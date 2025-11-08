<script setup lang="ts" generic="T extends DatabaseInsertInput | DatabaseUpdateInput">
import {ref, watch} from 'vue'
import type {DatabaseInsertInput} from '@/api/__generated/model/static/DatabaseInsertInput'
import DatabaseTypeSelect from '@/modelEditor/modelForm/databaseType/DatabaseTypeSelect.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconClose from '@/components/icons/IconClose.vue'
import type {DatabaseUpdateInput} from "@/api/__generated/model/static";
import {defaultDatabase} from "@/modelEditor/database/defaultDatabase.ts";
import {translate} from "@/store/i18nStore.ts";

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
        errors.value.name = translate({key: 'not_blank_warning', args: [translate('name')]})
    }

    if (!model.value.url || model.value.url.trim() === '') {
        errors.value.url = translate({key: 'not_blank_warning', args: [translate('url')]})
    }

    if (!model.value.username || model.value.username.trim() === '') {
        errors.value.username = translate({key: 'not_blank_warning', args: [translate('username')]})
    }

    // 对于新增操作，密码是必需的
    if (!model.value.password || model.value.password.trim() === '') {
        errors.value.password = translate({key: 'not_blank_warning', args: [translate('password')]})
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
}, {deep: true})

const handleDatabaseTypeChange = () => {
    const {url, username} = defaultDatabase(model.value.type)
    model.value = {
        ...model.value,
        url,
        username,
    }
}

// 取消操作
const handleCancel = () => {
    emits('cancel')
}
</script>

<template>
    <form @submit.prevent class="database-form">
        <div class="form-item">
            <DatabaseTypeSelect
                v-model="model.type"
                @change="handleDatabaseTypeChange"
            />
        </div>

        <div class="form-item">
            <label>{{ translate("name") }}</label>
            <input
                v-model="model.name"
                type="text"
                :class="{ 'error': errors.name }"
                :placeholder="translate({key: 'input_placeholder', args: [translate('name')]})"
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-item">
            <label>{{ translate("url") }}</label>
            <input
                v-model="model.url"
                type="text"
                :class="{ 'error': errors.url }"
                :placeholder="translate({key: 'input_placeholder', args: [translate('url')]})"
            />
            <div v-if="errors.url" class="error-message">{{ errors.url }}</div>
        </div>

        <div class="form-item">
            <label>{{ translate('username') }}</label>
            <input
                v-model="model.username"
                type="text"
                :class="{ 'error': errors.username }"
                :placeholder="translate({key: 'input_placeholder', args: [translate('username')]})"
            />
            <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>

        <div class="form-item">
            <label>{{ translate('password') }}</label>
            <input
                v-model="model.password"
                type="password"
                :class="{ 'error': errors.password }"
                :placeholder="translate({key: 'input_placeholder', args: [translate('password')]})"
                autocomplete="current-password"
            />
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

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
.database-form {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
    overflow-y: auto;
}

.form-item {
    display: flex;
    margin-bottom: 0.5rem;
}

label {
    min-width: 4rem;
    white-space: nowrap;
    padding: 0.5rem;
}

input {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 0.9rem;
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
