<script setup lang="ts">
import IconMySQL from "@/components/icons/database/IconMySQL.vue";
import IconPostgreSQL from "@/components/icons/database/IconPostgreSQL.vue";
import IconOracle from "@/components/icons/database/IconOracle.vue";
import IconSqlServer from "@/components/icons/database/IconSqlServer.vue";
import IconDatabase from "@/components/icons/IconDatabase.vue";
import IconSqlite from "@/components/icons/database/IconSqlite.vue";
import IconH2 from "@/components/icons/database/IconH2.vue";

defineProps<{
   databaseType: DatabaseSource | undefined
}>()
</script>

<template>
    <div v-if="databaseType === 'MYSQL'">
        <IconMySQL/>
        MySQL
    </div>
    <div v-else-if="databaseType === 'POSTGRESQL'">
        <IconPostgreSQL/>
        PostgreSQL
    </div>
    <div v-else-if="databaseType === 'ORACLE'">
        <IconOracle/>
        Oracle
    </div>
    <div v-else-if="databaseType === 'SQLSERVER'">
        <IconSqlServer/>
        Microsoft SQL Server
    </div>
    <div v-else-if="databaseType === 'H2'">
        <IconH2/>
        H2
    </div>
    <div v-else-if="databaseType === 'SQLITE'">
        <IconSqlite/>
        Sqlite
    </div>
    <div v-else-if="databaseType === 'ANY'">
        <IconDatabase/>
        [ANY]
    </div>
    <div v-else>
        [Unknown]
    </div>
</template>
