<script setup lang="ts">
import {nextTick, ref} from 'vue'
import TableEntityDialog from "../TableEntityDialog/index.vue";
import {TableEntityDialogEventBus} from "./TableEntityDialogEventBus.ts";

const tableIds = ref<Set<number>>(new Set)

TableEntityDialogEventBus.on('addTableEntityDialog', (id: number) => {
	if (tableIds.value.has(id)) {
		tableIds.value.delete(id)
		nextTick(() => {
			tableIds.value.add(id)
		})
	} else {
		tableIds.value.add(id)
	}
})

TableEntityDialogEventBus.on('removeTableEntityDialog', (id: number) => {
	tableIds.value.delete(id)
})
</script>

<template>
	<template v-for="id in [...tableIds.values()]">
		<TableEntityDialog
			:id="id"
			@close="tableIds.delete(id)">
		</TableEntityDialog>
	</template>
</template>