<script setup lang="ts">
import type {PropertyBody} from "@/api/__generated/model/static/index.js";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";

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
	<template v-else>
		<EditList
			v-model:lines="propertyBody.importLines"
			:default-line="''"
		/>

		<el-input type="textarea" v-model="propertyBody.codeBlock"/>

		<el-button @click="clear" :icon="Delete"/>
	</template>
</template>
