<script lang="ts" setup>
import {
	useAssociationDialogsStore
} from "@/store/modelEditor/AssociationDialogsStore.ts";
import AssociationDialog from "@/components/pages/ModelEditor/dialogs/association/AssociationDialog.vue";

const store = useAssociationDialogsStore()
</script>

<template>
	<template v-for="[key, value] in store.items" :key="key">
		<AssociationDialog :id="key" :association="value" @close="store.close(key)"></AssociationDialog>
	</template>
</template>
