<script lang="ts" setup>
import ModelModifyDialog from "./TableDialog.vue"
import {useTableDialogsStore} from "@/components/pages/ModelEditor/dialogs/table/TableDialogsStore.ts"

const store = useTableDialogsStore()
</script>

<template>
	<template v-for="[key, value] in store.items">
		<ModelModifyDialog :id="key" :table="value" @close="store.close(key)"></ModelModifyDialog>
	</template>
</template>
