<script lang="ts" setup>
import {
	useAssociationDialogsStore
} from "@/store/modelEditor/AssociationDialogsStore.ts";
import AssociationDialog from "@/components/pages/ModelEditor/dialogs/association/AssociationDialog.vue";

const store = useAssociationDialogsStore()
</script>

<template>
	<template v-for="[key, {value, options}] in store.items" :key="key">
		<AssociationDialog
            :id="key"
            :association="value"
            :modal="options?.modal"
            @close="store.close(key)"
        />
	</template>
</template>
