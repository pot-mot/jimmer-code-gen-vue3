<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";

const databaseType = defineModel<DatabaseType>({
    required: true
})

const databaseTypes: DatabaseType[] = [
    "POSTGRESQL",
    "MYSQL",
    "ORACLE",
    "SQLSERVER",
    "H2",
    "SQLITE",
]
</script>

<template>
    <FilterableSelect
        v-model="databaseType"
        :options="databaseTypes"
        :get-id="(it) => it"
        can-filter
        :filter="(option, filterText) => option.toLowerCase().includes(filterText.toLowerCase())"
    >
        <template #selected="{option}">
            <DatabaseTypeView :database-type="option" class="database-type-selected-option"/>
        </template>
        <template #option="{option}">
            <DatabaseTypeView :database-type="option" class="database-type-option"/>
        </template>
    </FilterableSelect>
</template>

<style scoped>
.database-type-selected-option {
    padding: 0.25rem;
    font-size: 0.8rem;
}

.database-type-option {
    min-width: 6rem;
    font-size: 0.8rem;
}

:deep(.filter-input) {
    font-size: 0.8rem;
}
</style>

