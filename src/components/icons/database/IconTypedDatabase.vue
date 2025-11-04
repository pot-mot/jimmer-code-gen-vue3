<template>
    <IconMySql v-if="type === 'MYSQL'"/>
    <IconPostgreSQL v-else-if="type === 'POSTGRESQL'"/>
    <IconOracle v-else-if="type === 'ORACLE'"/>
    <IconSqlServer v-else-if="type === 'SQLSERVER'"/>
    <IconSqlite v-else-if="type === 'SQLITE'"/>
    <IconDatabase v-else/>
</template>

<script setup lang="ts">
import IconDatabase from "@/components/icons/IconDatabase.vue";
import IconMySql from "@/components/icons/database/IconMySQL.vue";
import IconPostgreSQL from "@/components/icons/database/IconPostgreSQL.vue";
import IconOracle from "@/components/icons/database/IconOracle.vue";
import IconSqlServer from "@/components/icons/database/IconSqlServer.vue";
import IconSqlite from "@/components/icons/database/IconSqlite.vue";

defineProps<{
    type: DatabaseType
}>()
</script>
