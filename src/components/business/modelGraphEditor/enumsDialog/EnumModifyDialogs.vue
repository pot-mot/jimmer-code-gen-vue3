<script lang="ts" setup>
import {useEnumModifyDialogsStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialogsStore.ts";
import EnumModifyDialog from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialog.vue";

const store = useEnumModifyDialogsStore()
</script>

<template>
	<template v-for="[name, value] in store.items">
		<EnumModifyDialog :gen-enum="value!"  @close="store.close(name)"></EnumModifyDialog>
	</template>
</template>
