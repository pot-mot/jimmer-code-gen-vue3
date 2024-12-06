<script setup lang="ts">
import type {PropertyBody} from "@/api/__generated/model/static/index.js";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";
import {vTapInput} from "@/utils/vTabInput.ts";

const propertyBody = defineModel<PropertyBody | undefined>({
	required: true
})

const init = () => {
	propertyBody.value = {
		importLines: [],
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
        <el-button @click="clear" :icon="Delete"/><br>

        <el-text>imports</el-text>

		<EditList
			v-model:lines="propertyBody.importLines"
			:default-line="''"
            :labelLine="false"
        >
            <template #default="{index}">
                <el-input
                    v-tap-input
                    v-model="propertyBody.importLines[index]"
                    class="code-input"
                />
            </template>
        </EditList>

        <el-text>body</el-text>

		<el-input
            v-tap-input
            v-model="propertyBody.codeBlock"
            type="textarea"
            autosize
            class="code-input"
        />
	</div>
</template>
