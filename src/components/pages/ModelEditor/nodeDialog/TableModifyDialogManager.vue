<script lang="ts" setup>
import ModelModifyDialog from "./TableModifyDialog.vue";
import {useTableModifyDialogsStore} from "@/components/pages/ModelEditor/nodeDialog/TableModifyDialogManageStore.ts";

const store = useTableModifyDialogsStore()
</script>

<template>
	<template v-for="id in store.keys">
		<ModelModifyDialog :id="id" :table="store.get(id)!" @close="store.close(id)"></ModelModifyDialog>
	</template>
</template>