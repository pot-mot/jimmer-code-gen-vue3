<script setup lang="ts">
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";

defineProps<{
    messages?: DeepReadonly<DiagnoseMessage[]>
}>()
</script>

<template>
    <div class="diagnose-viewer" v-if="messages && messages.length > 0">
        <div
            v-for="message in messages"
            class="message-content"
            :class="message.type"
        >
            {{ message.content }}
        </div>
    </div>
</template>

<style scoped>
.message-content {
    cursor: text;
    font-size: 0.8em;
    padding: 0 0.2em;
    line-height: 1rem;
    height: 1rem;
    white-space: nowrap;
}

.message-content.primary {
    color: var(--primary-color);
}

.message-content.success {
    color: var(--success-color);
}

.message-content.error {
    color: var(--danger-color);
}

.message-content.warning {
    color: var(--warning-color);
}

.message-content.info {
    color: var(--info-color);
}
</style>