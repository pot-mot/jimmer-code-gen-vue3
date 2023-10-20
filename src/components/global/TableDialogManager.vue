<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {TableDialogEventBus} from "../../eventBus/TableDialogEventBus.ts";
import TableDialog from "../dialog/TableDialog/index.vue";

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