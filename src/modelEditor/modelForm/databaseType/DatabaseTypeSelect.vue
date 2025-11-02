<script setup lang="ts">
const databaseType = defineModel<DatabaseType>({
    required: true
})
</script>

<template>
    <select v-model="databaseType">
        <option value="POSTGRESQL">PostgreSQL</option>
        <option value="MYSQL">MySQL</option>
        <option value="ORACLE">Oracle</option>
        <option value="SQLSERVER">Microsoft SQL Server</option>
        <option value="H2">H2</option>
        <option value="SQLITE">Sqlite</option>
    </select>
</template>
