<script setup lang="ts">
import type {OtherAnnotation} from "@/api/__generated/model/static/index.js";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";
import {vTapInput} from "@/utils/vTabInput.ts";

const otherAnnotation = defineModel<OtherAnnotation | undefined>({
    required: true
})

const init = () => {
    otherAnnotation.value = {
        importLines: [],
        annotations: [],
    }
}

const clear = () => {
    otherAnnotation.value = undefined
}
</script>

<template>
    <el-button v-if="!otherAnnotation" @click="init" :icon="Plus"/>

    <div v-else style="width: 100%;">
        <el-button @click="clear" :icon="Delete"/>
        <br>

        <el-text>imports</el-text>

        <EditList
            v-model:lines="otherAnnotation.importLines"
            :default-line="''"
            :labelLine="false"
        >
            <template #default="{index}">
                <el-input
                    v-tap-input
                    v-model="otherAnnotation.importLines[index]"
                    class="code-input"
                />
            </template>
        </EditList>

        <el-text>annotations</el-text>

        <EditList
            v-model:lines="otherAnnotation.annotations"
            :default-line="''"
            :labelLine="false"
        >
            <template #default="{index}">
                <el-input
                    v-tap-input
                    v-model="otherAnnotation.annotations[index]"
                    class="code-input"
                />
            </template>
        </EditList>
    </div>
</template>
