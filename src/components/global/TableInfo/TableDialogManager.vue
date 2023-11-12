<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {TableDialogEventBus} from "./TableDialogEventBus.ts";
import TableEntityDialog from "./TableDialog.vue";

const tableIds = ref<Set<number>>(new Set)

TableDialogEventBus.on('openTable', (id: number) => {
	if (tableIds.value.has(id)) {
		tableIds.value.delete(id)
		nextTick(() => {
			tableIds.value.add(id)
		})
	} else {
		tableIds.value.add(id)
	}
})

TableDialogEventBus.on('closeTable', (id: number) => {
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