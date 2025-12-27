<script setup lang="ts">
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import IconDiagnoseError from "@/components/icons/IconDiagnoseError.vue";
import IconDiagnoseWarning from "@/components/icons/IconDiagnoseWarning.vue";
import IconDiagnoseInfo from "@/components/icons/IconDiagnoseInfo.vue";
import {computed} from "vue";

const props = defineProps<{
    messages?: DeepReadonly<DiagnoseMessage[]>
}>()

const infoMessages = computed(() => props.messages?.filter(message => message.type === "info") ?? [])
const warningMessages = computed(() => props.messages?.filter(message => message.type === "warning") ?? [])
const dangerMessages = computed(() => props.messages?.filter(message => message.type === "error") ?? [])
</script>

<template>
    <div class="diagnose-count">
        <div class="diagnose-count-item" v-if="infoMessages.length > 0">
            <IconDiagnoseInfo/>
            <span class="count-label info">{{ infoMessages.length }}</span>
        </div>
        <div class="diagnose-count-item" v-if="warningMessages.length > 0">
            <IconDiagnoseWarning/>
            <span class="count-label warning">{{ warningMessages.length }}</span>
        </div>
        <div class="diagnose-count-item" v-if="dangerMessages.length > 0">
            <IconDiagnoseError/>
            <span class="count-label error">{{ dangerMessages.length }}</span>
        </div>
    </div>
</template>

<style scoped>
.diagnose-count {
    display: flex;
    gap: 0.4rem;
    padding: 0.1rem;
    flex-wrap: nowrap;
}

.diagnose-count-item {
    background-color: var(--background-color);
    border: var(--border);
    border-color: var(--background-color-hover);
    border-radius: 0.25rem;
    white-space: nowrap;
}

.count-label {
    font-size: 0.8rem;
    padding: 0 0.2rem;
}

.count-label.error {
    color: var(--danger-color);
}

.count-label.warning {
    color: var(--warning-color);
}

 .count-label.info {
    color: var(--info-color);
}
</style>
