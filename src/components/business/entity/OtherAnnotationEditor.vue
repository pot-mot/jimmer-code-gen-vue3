<script setup lang="ts">
import type {OtherAnnotation} from "@/api/__generated/model/static/index.js";
import {Delete, Plus} from "@element-plus/icons-vue";
import EditList from "@/components/global/list/EditList.vue";

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
	<template v-else>
		<EditList
			v-model:lines="otherAnnotation.importLines"
			:default-line="''"
		/>

		<EditList
			v-model:lines="otherAnnotation.annotations"
			:default-line="''"
		/>

		<el-button @click="clear" :icon="Delete"/>
	</template>
</template>
