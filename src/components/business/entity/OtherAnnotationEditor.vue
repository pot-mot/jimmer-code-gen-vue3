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

	<div v-else style="width: 100%; text-align: center;">
		<EditList
			v-model:lines="otherAnnotation.importLines"
			:default-line="''"
		    :labelLine="false"
        />

		<EditList
			v-model:lines="otherAnnotation.annotations"
			:default-line="''"
            :labelLine="false"
		/>

		<el-button @click="clear" :icon="Delete"/>
	</div>
</template>
