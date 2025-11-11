<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import DatabaseTypeView from "@/modelEditor/modelForm/databaseType/DatabaseTypeView.vue";

const databaseType = defineModel<DatabaseType | "ANY">({
    required: true
})

const databaseTypes: (DatabaseType | "ANY")[] = [
    "POSTGRESQL",
    "MYSQL",
    "ORACLE",
    "SQLSERVER",
    "H2",
    "SQLITE",
    "ANY",
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
            <DatabaseTypeView :database-type="option" style="padding: 0.25rem; font-size: 0.8rem;"/>
        </template>
        <template #option="{option}">
            <DatabaseTypeView :database-type="option" style="min-width: 6rem; font-size: 0.8rem;"/>
        </template>
    </FilterableSelect>
</template>
