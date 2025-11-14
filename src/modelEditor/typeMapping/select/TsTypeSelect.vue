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
            <span class="ts-type-selected-option">{{ option?.typeExpression }}</span>
        </template>
        <template #option="{option}">
            <span class="ts-type-option">{{ option?.typeExpression }}</span>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.ts-type-selected-option {
    padding: 0.125rem 0.25rem;
}

.ts-type-option {
    padding: 0.125rem 0.25rem;
    min-width: 5rem;
}
</style>
