<script setup lang="ts">
import type {PropertyBody} from "@/api/__generated/model/static";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";
import {vTapInput} from "@/utils/vTabInput.ts";
import Details from "@/components/global/common/Details.vue";

const propertyBody = defineModel<PropertyBody | undefined>({
    required: true
})

const init = () => {
    propertyBody.value = {
        imports: [],
        codeBlock: "",
    }
}

const clear = () => {
    propertyBody.value = undefined
}
</script>

<template>
    <el-button v-if="!propertyBody" @click="init" :icon="Plus"/>

    <div v-else style="width: 100%;">
        <el-button @click="clear" :icon="Delete"/>
        <br>

        <Details open>
            <template #title>
                <el-text>imports</el-text>
            </template>

            <EditList
                v-model:lines="propertyBody.imports"
                :default-line="''"
                :json-schema-validate="() => true"
                :labelLine="false"
            >
                <template #default="{index}">
                    import
                    <el-input
                        v-tap-input
                        v-model="propertyBody.imports[index]"
                        class="code-input"
                    />
                </template>
            </EditList>
        </Details>

        <div>
            <el-input
                v-tap-input
                v-model="propertyBody.codeBlock"
                type="textarea"
                autosize
                class="code-input"
            />
        </div>
    </div>
</template>
