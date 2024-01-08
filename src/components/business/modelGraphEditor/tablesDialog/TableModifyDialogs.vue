<script lang="ts" setup>
import ModelModifyDialog from "./TableModifyDialog.vue"
import {
	useTableModifyDialogsStore
} from "@/components/business/modelGraphEditor/tablesDialog/TableModifyDialogsStore.ts";
import {cloneDeep} from "lodash";

const store = useTableModifyDialogsStore()
</script>

<template>
	<template v-for="[key, value] in store.items">
		<ModelModifyDialog :id="key" :table="cloneDeep(value!)" @close="store.close(key)"></ModelModifyDialog>
	</template>
</template>
