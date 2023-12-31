<script lang="ts" setup>
import {useEnumModifyDialogsStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialogsStore.ts";
import EnumModifyDialog from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialog.vue";

const store = useEnumModifyDialogsStore()
</script>

<template>
	<template v-for="name in store.keys">
		<EnumModifyDialog :gen-enum="store.get(name)!"  @close="store.close(name)"></EnumModifyDialog>
	</template>
</template>
