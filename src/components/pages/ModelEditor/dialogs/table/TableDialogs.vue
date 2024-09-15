<script lang="ts" setup>
import TableDialog from "./TableDialog.vue"
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts"

const store = useTableDialogsStore()
</script>

<template>
	<template v-for="[key, value] in store.items" :key="key">
		<TableDialog :id="key" :table="value" @close="store.close(key)"></TableDialog>
	</template>
</template>
