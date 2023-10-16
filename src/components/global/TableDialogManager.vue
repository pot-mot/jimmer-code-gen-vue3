<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {TableDialogEventEmitter} from "../../eventBus/TableDialogEventEmitter.ts";
import TableDialog from "../dialog/TableDialog.vue";

const tableIds = ref<Set<number>>(new Set)

TableDialogEventEmitter.on('addTableDialog', (id: number) => {
	if (tableIds.value.has(id)) {
		tableIds.value.delete(id)
		nextTick(() => {
			tableIds.value.add(id)
		})
	} else {
		tableIds.value.add(id)
	}
})

TableDialogEventEmitter.on('removeTableDialog', (id: number) => {
	tableIds.value.delete(id)
})
</script>

<template>
	<template v-for="id in [...tableIds.values()]">
		<TableDialog
			:id="id"
			@close="tableIds.delete(id)"
			@updated="tableIds.add(id)">
		</TableDialog>
	</template>
</template>