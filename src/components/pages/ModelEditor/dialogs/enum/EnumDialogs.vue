<script lang="ts" setup>
import {useEnumDialogsStore} from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogsStore.ts";
import EnumDialog from "@/components/pages/ModelEditor/dialogs/enum/EnumDialog.vue";

const store = useEnumDialogsStore()
</script>

<template>
	<template v-for="[name, value] in store.items" :key="name">
		<EnumDialog :name="name" :gen-enum="value"  @close="store.close(name)"></EnumDialog>
	</template>
</template>
