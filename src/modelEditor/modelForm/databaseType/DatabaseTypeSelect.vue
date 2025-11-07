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
            <DatabaseTypeView :database-type="option" style="padding: 0.5rem;"/>
        </template>
        <template #option="{option}">
            <DatabaseTypeView :database-type="option" style="min-width: 6rem"/>
        </template>
    </FilterableSelect>
</template>
