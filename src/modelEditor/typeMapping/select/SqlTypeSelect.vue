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
            <span class="sql-type-selected-option">{{ option?.type }}</span>
        </template>
        <template #option="{option}">
            <span class="sql-type-option">{{ option?.type }}</span>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.sql-type-selected-option {
    padding: 0.125rem 0.25rem;
}

.sql-type-option {
    padding: 0.125rem 0.25rem;
    min-width: 5rem;
}
</style>
