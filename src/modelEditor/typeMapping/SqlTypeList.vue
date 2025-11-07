<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {SqlTypeInput, SqlTypeInput_TargetOf_jvmToSqlMappingRule} from "@/api/__generated/model/static";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const {
    contextData
} = useModelEditor()

const {
    sqlTypes
} = useTypeMapping()

const defaultTsType = (): SqlTypeInput => {
    return {
        type: "",
        dataSize: undefined,
        numericPrecision: undefined,
        defaultValue: undefined,
        jvmToSqlMappingRule: [],
    }
}

const defaultJvmToSqlMappingRule = (): SqlTypeInput_TargetOf_jvmToSqlMappingRule => {
    return {
        jvmSource: contextData.model.jvmLanguage,
        databaseSource: contextData.model.databaseType,
        matchRegExp: "",
    }
}
</script>

<template>
    <EditList
        v-model:lines="sqlTypes"
        :default-line="defaultTsType"
    >

    </EditList>
</template>

<style scoped>

</style>