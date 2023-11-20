<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import {TableDialogManagerEventBus} from "./TableDialogManagerEventBus.ts";
import TableEntityDialog from "./TableDialog.vue";

const tableIds = ref<Set<number>>(new Set)

TableDialogManagerEventBus.on('openTable', (id: number) => {
	if (tableIds.value.has(id)) {
		tableIds.value.delete(id)
		nextTick(() => {
			tableIds.value.add(id)
		})
	} else {
		tableIds.value.add(id)
	}
})

TableDialogManagerEventBus.on('closeTable', (id: number) => {
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