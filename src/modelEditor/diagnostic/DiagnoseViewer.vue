<script setup lang="ts">
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";

defineProps<{
    messages?: DeepReadonly<DiagnoseMessage[]>
}>()
</script>

<template>
    <div tabindex="-1" class="diagnose-viewer" v-if="messages && messages.length > 0">
        <div v-for="message in messages">
            <span
                class="diagnose-info no-drag"
                :class="message.type"
            >
                {{ message.content }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.diagnose-info {
    cursor: text;
    font-size: 0.8rem;
    padding: 0 0.2rem;
    line-height: 1rem;
    height: 1rem;
    white-space: nowrap;
    user-select: text;
}

.diagnose-info.primary {
    color: var(--primary-color);
}

.diagnose-info.success {
    color: var(--success-color);
}

.diagnose-info.error {
    color: var(--danger-color);
}

.diagnose-info.warning {
    color: var(--warning-color);
}

.diagnose-info.info {
    color: var(--info-color);
}
</style>