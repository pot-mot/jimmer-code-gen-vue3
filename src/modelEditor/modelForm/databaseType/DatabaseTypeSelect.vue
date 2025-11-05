<script setup lang="ts">
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import IconTypedDatabase from "@/components/icons/database/IconTypedDatabase.vue";

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
        :filter="(option, query) => option.toLowerCase().includes(query.toLowerCase())"
        :get-id="(it) => it"
    >
        <template #selected="{option}">
            <div style="padding: 0.5rem;">
                <IconTypedDatabase :type="option"/>
                {{ option }}
            </div>
        </template>
        <template #option="{option}">
            <IconTypedDatabase :type="option"/>
            {{ option }}
        </template>
    </FilterableSelect>
</template>
