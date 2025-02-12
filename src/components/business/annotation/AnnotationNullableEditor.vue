<script setup lang="ts">
import type {AnnotationWithImports} from "@/api/__generated/model/static";
import {Delete, Plus} from "@element-plus/icons-vue";
import AnnotationEditor from "@/components/business/annotation/AnnotationEditor.vue";

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

        <annotation-editor v-model="annotationWithImports"/>
    </div>
</template>
