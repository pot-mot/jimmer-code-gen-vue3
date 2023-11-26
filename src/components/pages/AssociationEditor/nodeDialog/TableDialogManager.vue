<script lang="ts" setup>
import TableEntityDialog from "./TableDialog.vue";
import {useTableDialogsStore} from "@/components/pages/AssociationEditor/nodeDialog/TableDialogManageStore.ts";

const store = useTableDialogsStore()
</script>

<template>
	<template v-for="id in store.keys">
		<TableEntityDialog
			:id="id"
			@close="store.close(id)">
		</TableEntityDialog>
	</template>
</template>