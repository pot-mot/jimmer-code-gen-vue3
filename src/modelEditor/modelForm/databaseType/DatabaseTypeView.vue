<script setup lang="ts">
defineProps<{
   databaseType: DatabaseSource | undefined
}>()
</script>

<template>
    <div v-if="databaseType === 'MYSQL'">MySQL</div>
    <div v-else-if="databaseType === 'POSTGRESQL'">PostgreSQL</div>
    <div v-else-if="databaseType === 'ORACLE'">Oracle</div>
    <div v-else-if="databaseType === 'SQLSERVER'">Microsoft SQL Server</div>
    <div v-else-if="databaseType === 'H2'">H2</div>
    <div v-else-if="databaseType === 'SQLITE'">Sqlite</div>
    <div v-else-if="databaseType === 'ANY'">[ANY]</div>
    <div v-else>[Unknown]</div>
</template>
