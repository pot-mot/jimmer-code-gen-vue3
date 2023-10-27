<script setup lang="ts">
import {nextTick, ref} from 'vue'
import TableDialog from "../TableDialog/index.vue";
import {TableDialogEventBus} from "./TableDialogEventBus.ts";

const tableIds = ref<Set<number>>(new Set)

TableDialogEventBus.on('addTableDialog', (id: number) => {
	if (tableIds.value.has(id)) {
		tableIds.value.delete(id)
		nextTick(() => {
			tableIds.value.add(id)
		})
	} else {
		tableIds.value.add(id)
	}
})

TableDialogEventBus.on('removeTableDialog', (id: number) => {
	tableIds.value.delete(id)
})
</script>

<template>
	<template v-for="id in [...tableIds.values()]">
		<TableDialog
			:id="id"
			@close="tableIds.delete(id)">
		</TableDialog>
	</template>
</template>