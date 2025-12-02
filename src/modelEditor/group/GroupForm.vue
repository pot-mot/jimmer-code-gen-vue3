<script setup lang="ts" generic="T extends Group">
import ColorInput from "@/components/color/ColorInput.vue";
import {translate} from "@/store/i18nStore.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {ref, watch} from "vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";

const group = defineModel<T>({
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

    if (!group.value.name || group.value.name.trim() === '') {
        errors.value.name = translate({key: 'not_blank_warning', args: [translate('name')]})
    }

    return Object.keys(errors.value).length === 0
}

// 提交表单
const handleSubmit = () => {
    if (validateForm()) {
        emits('submit', group.value)
    }
}

// 监听模型变化并清除对应错误
watch(() => group.value, () => {
    errors.value = {}
}, { deep: true })

// 取消操作
const handleCancel = () => {
    emits('cancel')
}
</script>

<template>
    <form @submit.prevent class="group-form">

        <div class="form-item">
            <div style="display: flex; flex-wrap: nowrap; align-items: center; gap: 0.5rem;">
                <ColorInput v-model="group.color" :preset-colors="presetColor"/>
                <input
                    v-model="group.name"
                    type="text"
                    :class="{ 'error': errors.name }"
                    :placeholder="translate({key: 'input_placeholder', args: [translate('name')]})"
                />
            </div>
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-item">
            <input
                v-model="group.comment"
                type="text"
                :placeholder="translate({key: 'input_placeholder', args: [translate('comment')]})"
            />
        </div>

        <div class="form-item">
            <input
                v-model="group.basePackagePath"
                type="text"
                :placeholder="translate({key: 'input_placeholder', args: [translate('basePackagePath')]})"
            />
        </div>

        <div class="form-item">
            <input
                v-model="group.baseTableSchema"
                type="text"
                :placeholder="translate({key: 'input_placeholder', args: [translate('baseTableSchema')]})"
            />
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
.group-form {
    height: 100%;
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
    overflow-y: auto;
}

.form-item {
    margin-bottom: 0.5rem;
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
