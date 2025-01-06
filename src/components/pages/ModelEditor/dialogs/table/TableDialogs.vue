<script lang="ts" setup>
import TableDialog from "./TableDialog.vue"
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts"

const store = useTableDialogsStore()
</script>

<template>
	<template v-for="[key, {value, options}] in store.items" :key="key">
		<TableDialog
            :id="key"
            :table="value"
            :modal="options?.modal"
            @close="store.close(key)"
        />
	</template>
</template>
