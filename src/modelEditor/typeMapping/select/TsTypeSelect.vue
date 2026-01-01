<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {computed} from "vue";

const {tsTypes} = useTypeMapping()

const id = defineModel<string | undefined>({
    required: true
})

const selectedJvmType = computed({
    get() {
        return tsTypes.value.find(it => it.id === id.value)
    },
    set(value) {
        if (value === undefined) {
            id.value = undefined
        } else {
            id.value = value.id
        }
    }
})
</script>

<template>
    <FilterableSelect
        v-model="selectedJvmType"
        :options="tsTypes"
        :get-id="(it) => it?.id ?? ''"
        can-filter
        :filter="(option, filterText) => option?.typeExpression.includes(filterText) ?? false"
    >
        <template #selected="{option}">
            <div class="ts-type-selected-option">{{ option?.typeExpression }}</div>
        </template>
        <template #option="{option}">
            <div class="ts-type-option">{{ option?.typeExpression }}</div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.ts-type-selected-option {
    height: 1.5rem;
    padding: 0.25rem;
    line-height: 1rem;
    font-size: 0.8rem;
}

.ts-type-option {
    height: 1.2rem;
    line-height: 0.8rem;
    padding: 0.2rem 0;
    font-size: 0.8rem;
    min-width: 5rem;
}
</style>
