<script setup lang="ts">
import type {AnnotationWithImports} from "@/api/__generated/model/static/index.js";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";
import {vTapInput} from "@/utils/vTabInput.ts";

const annotationWithImports = defineModel<AnnotationWithImports | undefined>({
    required: true
})

const init = () => {
    annotationWithImports.value = {
        imports: [],
        annotations: [],
    }
}

const clear = () => {
    annotationWithImports.value = undefined
}
</script>

<template>
    <el-button v-if="!annotationWithImports" @click="init" :icon="Plus"/>

    <div v-else style="width: 100%;">
        <el-button @click="clear" :icon="Delete"/>
        <br>

        <el-text>imports</el-text>

        <EditList
            v-model:lines="annotationWithImports.imports"
            :default-line="''"
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
