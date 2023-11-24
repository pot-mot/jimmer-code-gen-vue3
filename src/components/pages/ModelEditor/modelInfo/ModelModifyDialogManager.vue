<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";
import ModelModifyDialog from "./ModelModifyDialog.vue";

const tableMap = ref<Map<string, GenTableColumnsInput>>(new Map)

ModelEditorEventBus.on('modifyTable', ({id, table}) => {
	if (tableMap.value.has(id)) {
		tableMap.value.delete(id)
		nextTick(() => {
			tableMap.value.set(id, table)
		})
	} else {
		tableMap.value.set(id, table)
	}
})

ModelEditorEventBus.on('closeModifiedTable', (id) => {
	tableMap.value.delete(id)
})
</script>

<template>
	<template v-for="id in [...tableMap.keys()]">
		<ModelModifyDialog :id="id" :table="tableMap.get(id)!" @close="tableMap.delete(id)"></ModelModifyDialog>
	</template>
</template>