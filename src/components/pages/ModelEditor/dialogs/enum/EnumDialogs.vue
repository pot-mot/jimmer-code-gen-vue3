<script lang="ts" setup>
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import EnumDialog from "@/components/pages/ModelEditor/dialogs/enum/EnumDialog.vue";

const store = useEnumDialogsStore()
</script>

<template>
	<template v-for="[id, value] in store.items" :key="id">
		<EnumDialog :id="id" :gen-enum="value" @close="store.close(id)"></EnumDialog>
	</template>
</template>
