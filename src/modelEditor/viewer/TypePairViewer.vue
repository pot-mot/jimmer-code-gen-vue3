<script setup lang="ts">
import {translate} from "@/store/i18nStore.ts";

defineProps<{
    typePair: DeepReadonly<Pick<CrossType, 'jvmType' | 'sqlType' | 'nullable'>>
}>()
</script>

<template>
    <span class="type-pair-viewer">
        <span class="back-end-type">
            {{ typePair.jvmType.typeExpression }}
        </span>
        <span class="sql-type">
             {{ typePair.sqlType.type }}
        </span>

        <span v-if="typePair.nullable === true">{{ translate('nullableLimit_true') }}</span>
        <span v-if="typePair.nullable === false">{{ translate('nullableLimit_false') }}</span>
        <span v-if="typePair.nullable === undefined">{{ translate('nullableLimit_undefined') }}</span>
    </span>
</template>

<style scoped>
.type-pair-viewer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
