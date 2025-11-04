<template>
    <IconMySql v-if="type === 'MYSQL'"/>
    <IconPostgreSQL v-else-if="type === 'POSTGRESQL'"/>
    <IconOracle v-else-if="type === 'ORACLE'"/>
    <IconSqlServer v-else-if="type === 'SQLSERVER'"/>
    <IconH2 v-else-if="type === 'H2'"/>
    <IconSqlite v-else-if="type === 'SQLITE'"/>
    <IconDatabase v-else/>
</template>

<script setup lang="ts">
import IconDatabase from "@/components/icons/IconDatabase.vue";
import IconMySql from "@/components/icons/database/IconMySQL.vue";
import IconPostgreSQL from "@/components/icons/database/IconPostgreSQL.vue";
import IconOracle from "@/components/icons/database/IconOracle.vue";
import IconSqlServer from "@/components/icons/database/IconSqlServer.vue";
import IconH2 from "@/components/icons/database/IconH2.vue";
import IconSqlite from "@/components/icons/database/IconSqlite.vue";

defineProps<{
    type: DatabaseType
}>()
</script>
