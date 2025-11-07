<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {JvmTypeInput, JvmTypeInput_TargetOf_sqlToJvmMappingRules} from "@/api/__generated/model/static";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const {
    contextData
} = useModelEditor()

const {
    jvmTypes
} = useTypeMapping()

const defaultTsType = (): JvmTypeInput => {
    return {
        typeExpression: "",
        serialized: false,
        extraImports: [],
        extraAnnotations: [],
        sqlToJvmMappingRules: [],
    }
}

const defaultJvmToSqlMappingRule = (): JvmTypeInput_TargetOf_sqlToJvmMappingRules => {
    return {
        jvmSource: contextData.model.jvmLanguage,
        databaseSource: contextData.model.databaseType,
        matchRegExp: "",
    }
}
</script>

<template>
    <EditList
        v-model:lines="jvmTypes"
        :default-line="defaultTsType"
    >

    </EditList>
</template>

<style scoped>

</style>