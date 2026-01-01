<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {computed} from "vue";

const {jvmTypes} = useTypeMapping()

const id = defineModel<string | undefined>({
    required: true
})

const props = defineProps<{
    jvmSource?: JvmSource
}>()

const selectedJvmType = computed({
    get() {
        return jvmTypes.value.find(it => it.id === id.value)
    },
    set(value) {
        if (value === undefined) {
            id.value = undefined
        } else {
            id.value = value.id
        }
    }
})

const options = computed(() => {
    if (props.jvmSource === undefined || props.jvmSource === 'ANY') return jvmTypes.value
    return jvmTypes.value.filter(it => it.jvmSource === props.jvmSource || it.jvmSource === 'ANY')
})
</script>

<template>
    <FilterableSelect
        v-model="selectedJvmType"
        :options="options"
        :get-id="(it) => it?.id ?? ''"
        can-filter
        :filter="(option, filterText) => option?.typeExpression.includes(filterText) ?? false"
    >
        <template #selected="{option}">
            <div class="jvm-type-selected-option">{{ option?.typeExpression }}</div>
        </template>
        <template #option="{option}">
            <div class="jvm-type-option">{{ option?.typeExpression }}</div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.jvm-type-selected-option {
    height: 1.5rem;
    padding: 0.25rem;
    line-height: 1rem;
    font-size: 0.8rem;
}

.jvm-type-option {
    height: 1.2rem;
    line-height: 0.8rem;
    padding: 0.2rem 0;
    font-size: 0.8rem;
    min-width: 5rem;
}
</style>
