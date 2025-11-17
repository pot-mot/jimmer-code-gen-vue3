<script setup lang="ts">
import type {CrossTypeInput} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import {translate} from "@/store/i18nStore.ts";
import JvmTypeSelect from "@/modelEditor/typeMapping/select/JvmTypeSelect.vue";
import SqlTypeSelect from "@/modelEditor/typeMapping/select/SqlTypeSelect.vue";
import TsTypeSelect from "@/modelEditor/typeMapping/select/TsTypeSelect.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import FilterableSelect from "@/components/select/FilterableSelect.vue";

const crossTypeInput = defineModel<CrossTypeInput>({
    required: true
})

const {
    jvmTypes,
    sqlTypes,
    tsTypes,
} = useTypeMapping()

// 表单验证错误
const errors = ref<Record<string, string>>({})
// 验证表单
const validateForm = (): boolean => {
    errors.value = {}

    if (!crossTypeInput.value.sqlTypeId || !sqlTypes.value.find(sqlType => sqlType.id === crossTypeInput.value.sqlTypeId)) {
        errors.value.sqlTypeId = translate({key: 'not_blank_warning', args: [translate('sql_type')]})
    }

    if (!crossTypeInput.value.jvmTypeId || !jvmTypes.value.find(jvmType => jvmType.id === crossTypeInput.value.jvmTypeId)) {
        errors.value.jvmTypeId = translate({key: 'not_blank_warning', args: [translate('jvm_type')]})
    }

    if (!crossTypeInput.value.tsTypeId || !tsTypes.value.find(tsType => tsType.id === crossTypeInput.value.tsTypeId)) {
        errors.value.tsTypeId = translate({key: 'not_blank_warning', args: [translate('ts_type')]})
    }

    return Object.keys(errors.value).length === 0
}

watch(() => crossTypeInput.value, () => {
    errors.value = {}
}, {deep: true})

defineExpose({
    validateForm,
    errors
})
</script>

<template>
    <div class="cross-type-editor">
        <div class="input-wrapper">
            <JvmTypeSelect
                v-model="crossTypeInput.jvmTypeId"
                :class="{ 'error': errors.sqlTypeId }"
            />
            <div v-if="errors.jvmTypeId" class="error-message">{{ errors.jvmTypeId }}</div>
        </div>
        <div class="input-wrapper">
            <SqlTypeSelect
                v-model="crossTypeInput.sqlTypeId"
                :class="{ 'error': errors.sqlTypeId }"
            />
            <div v-if="errors.sqlTypeId" class="error-message">{{ errors.sqlTypeId }}</div>
        </div>
        <div class="input-wrapper">
            <TsTypeSelect
                v-model="crossTypeInput.tsTypeId"
                :class="{ 'error': errors.tsTypeId }"
            />
            <div v-if="errors.tsTypeId" class="error-message">{{ errors.tsTypeId }}</div>
        </div>
        <div>
            <FilterableSelect
                v-model="crossTypeInput.nullable"
                :options="[true, false, undefined]"
                :get-id="(it) => `${it}`"
            >
                <template #selected="{option}">
                    <span v-if="option === true">{{ translate('nullableLimit_true') }}</span>
                    <span v-else-if="option === false">{{ translate('nullableLimit_false') }}</span>
                    <span v-else-if="option === undefined">{{ translate('nullableLimit_undefined') }}</span>
                </template>
                <template #option="{option}">
                    <span v-if="option === true">{{ translate('nullableLimit_true') }}</span>
                    <span v-else-if="option === false">{{ translate('nullableLimit_false') }}</span>
                    <span v-else-if="option === undefined">{{ translate('nullableLimit_undefined') }}</span>
                </template>
            </FilterableSelect>
        </div>
    </div>
</template>

<style scoped>
.cross-type-editor {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    grid-gap: 0.5rem;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
}

.input-wrapper {
    position: relative;
}

.input-wrapper > .error {
    border-color: var(--danger-color);
}

.error-message {
    margin-top: 6px;
    color: var(--danger-color);
    font-size: 0.8rem;
    white-space: pre-line;
}
</style>
