<script setup lang="ts">
import EditList from "@/components/list/selectableList/EditList.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import type {TsTypeInput, TsTypeInput_TargetOf_jvmToTsMappingRules} from "@/api/__generated/model/static";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const {
    contextData
} = useModelEditor()

const {
    tsTypes
} = useTypeMapping()

const defaultTsType = (): TsTypeInput => {
    return {
        typeExpression: "",
        extraImports: [],
        jvmToTsMappingRules: [],
    }
}

const defaultJvmToTsMappingRule = (): TsTypeInput_TargetOf_jvmToTsMappingRules => {
    return {
        jvmSource: contextData.model.jvmLanguage,
        matchRegExp: "",
    }
}
</script>

<template>
    <EditList
        v-model:lines="tsTypes"
        :default-line="defaultTsType"
    >

    </EditList>
</template>

<style scoped>

</style>