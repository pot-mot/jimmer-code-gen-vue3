<script lang="ts" setup>
import {useEnumDialogsStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumDialogsStore.ts";
import EnumDialog from "@/components/business/modelGraphEditor/enumsDialog/EnumDialog.vue";

const store = useEnumDialogsStore()
</script>

<template>
	<template v-for="[name, value] in store.items">
		<EnumDialog :name="name" :gen-enum="value"  @close="store.close(name)"></EnumDialog>
	</template>
</template>
