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
    >
        <template #selected="{option}">
            <DatabaseTypeView style="padding: 0.5rem;" :database-type="option"/>
        </template>
        <template #option="{option}">
            <DatabaseTypeView style="min-width: 6rem" :database-type="option"/>
        </template>
    </FilterableSelect>
</template>
