<script lang="ts" setup>
import {useEnumModifyDialogsStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialogsStore.ts";
import EnumModifyDialog from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialog.vue";
import {cloneDeep} from "lodash";

const store = useEnumModifyDialogsStore()
</script>

<template>
	<template v-for="[name, value] in store.items">
		<EnumModifyDialog :gen-enum="cloneDeep(value!)"  @close="store.close(name)"></EnumModifyDialog>
	</template>
</template>
