<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "../../../pages/ModelEditor/store/ModelEditorEventBus.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static/GenModelInput.ts";
import {useEnumCreateDialogStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumCreateDialogStore.ts";
import EnumForm from "@/components/business/enum/EnumForm.vue";

const store = useEnumCreateDialogStore()

const handleSubmit = (genEnum: GenModelInput_TargetOf_enums) => {
	ModelEditorEventBus.emit('createdEnum', genEnum)
}
</script>

<template>
	<DragDialog v-model="store.dialogOpenState"
				:can-resize="true" :init-w="800" :init-h="600" :init-y="100">
		<EnumForm @cancel="store.dialogOpenState = false" @submit="handleSubmit"></EnumForm>
	</DragDialog>
</template>
