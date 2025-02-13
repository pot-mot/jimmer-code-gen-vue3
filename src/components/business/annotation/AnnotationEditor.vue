<script setup lang="ts">
import type {AnnotationWithImports} from "@/api/__generated/model/static";
import EditList from "@/components/global/list/EditList.vue";
import {vTapInput} from "@/utils/vTabInput.ts";

const annotationWithImports = defineModel<AnnotationWithImports>({
    required: true
})
</script>

<template>
    <div style="width: 100%;">
        <el-text>imports</el-text>

        <EditList
            v-model:lines="annotationWithImports.imports"
            :default-line="''"
            :json-schema-validate="() => true"
            :labelLine="false"
        >
            <template #default="{index}">
                <el-input
                    v-tap-input
                    v-model="annotationWithImports.imports[index]"
                    class="code-input"
                />
            </template>
        </EditList>

        <el-text>annotations</el-text>

        <EditList
            v-model:lines="annotationWithImports.annotations"
            :default-line="''"
            :json-schema-validate="() => true"
            :labelLine="false"
        >
            <template #default="{index}">
                <el-input
                    v-tap-input
                    v-model="annotationWithImports.annotations[index]"
                    class="code-input"
                />
            </template>
        </EditList>
    </div>
</template>
