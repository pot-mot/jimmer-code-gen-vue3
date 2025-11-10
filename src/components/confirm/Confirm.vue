<script setup lang="ts">
import IconCheck from "@/components/icons/IconCheck.vue";
import IconClose from "@/components/icons/IconClose.vue";
import type {ConfirmProps} from "@/components/confirm/ConfirmType.ts";

const props = defineProps<ConfirmProps>()

const handleSubmit = () => {
    props.onConfirm()
}

const handleCancel = () => {
    props.onCancel()
}

const handleClose = () => {
    props.onClose()
}
</script>

<template>
    <div class="confirm-mask">
        <div class="confirm-container">
            <div class="confirm-header">
                <div class="confirm-title">{{ props.title }}</div>
                <button @click="handleClose" class="close-button">
                    <IconClose/>
                </button>
            </div>
            <div class="confirm-content">{{ props.content }}</div>
            <div class="confirm-actions">
                <button @click="handleCancel" class="cancel-button">
                    <IconClose/>
                    {{ props.cancelText }}
                </button>
                <button @click="handleSubmit" class="confirm-button">
                    <IconCheck/>
                    {{ props.confirmText }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.confirm-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--mask-z-index);
    background-color: var(--mask-color);
    width: 100%;
    height: 100%;
}

.confirm-container {
    margin: 30vh auto auto;
    width: fit-content;
    height: fit-content;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    background: var(--background-color);
    overflow: hidden;
}

.confirm-header {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
}

.confirm-title {
    padding: 0.5rem;
    font-weight: 600;
}

.confirm-content {
    padding: 0 1rem;
    width: fit-content;
    height: fit-content;
    min-width: 30vw;
    max-width: 80vw;
    overflow: auto;
    font-size: 1rem;
    line-height: 1.5rem;
    word-wrap: break-word;
    word-break: break-word;
}

.confirm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
}

.close-button {
    border: none;
    padding: 0.5rem;
    height: 2rem;
    line-height: 1rem;
    cursor: pointer;
}

.close-button:hover {
    background-color: var(--danger-color);
    --icon-color: #fff;
}

.cancel-button,
.confirm-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
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

.confirm-button {
    border-color: var(--success-color);
    --icon-color: var(--success-color);
}
</style>