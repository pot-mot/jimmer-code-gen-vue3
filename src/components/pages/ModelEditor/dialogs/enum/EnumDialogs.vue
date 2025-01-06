<script lang="ts" setup>
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import EnumDialog from "@/components/pages/ModelEditor/dialogs/enum/EnumDialog.vue";

const store = useEnumDialogsStore()
</script>

<template>
	<template v-for="[id, {value, options}] in store.items" :key="id">
		<EnumDialog
            :id="id"
            :gen-enum="value"
            :modal="options?.modal"
            @close="store.close(id)"
        />
	</template>
</template>
