<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {computed} from "vue";

const {sqlTypes} = useTypeMapping()

const id = defineModel<string | undefined>({
    required: true
})

const props = defineProps<{
    databaseSource?: DatabaseSource
}>()

const selectedJvmType = computed({
    get() {
        return sqlTypes.value.find(it => it.id === id.value)
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
    if (props.databaseSource === undefined || props.databaseSource === 'ANY') return sqlTypes.value
    return sqlTypes.value.filter(it => it.databaseSource === props.databaseSource || it.databaseSource === 'ANY')
})
</script>

<template>
    <FilterableSelect
        v-model="selectedJvmType"
        :options="options"
        :get-id="(it) => it?.id ?? ''"
        can-filter
        :filter="(option, filterText) => option?.type.includes(filterText) ?? false"
    >
        <template #selected="{option}">
            <div class="sql-type-selected-option">{{ option?.type }}</div>
        </template>
        <template #option="{option}">
            <div class="sql-type-option">{{ option?.type }}</div>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.sql-type-selected-option {
    height: 1.5rem;
    padding: 0.25rem;
    line-height: 1rem;
    font-size: 0.8rem;
}

.sql-type-option {
    height: 1.2rem;
    line-height: 0.8rem;
    padding: 0.2rem 0;
    font-size: 0.8rem;
    min-width: 5rem;
}
</style>
