<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "../../../pages/ModelEditor/store/ModelEditorEventBus.ts";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

interface EnumDialogProps {
	name: string,
	genEnum?: Partial<GenModelInput_TargetOf_enums>
}

const props = defineProps<EnumDialogProps>()

interface EnumEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<EnumEntityDialogEmits>()

const handleSubmit = (genEnum: GenModelInput_TargetOf_enums) => {
	if (props.name.length > 0) {
		ModelEditorEventBus.emit('modifiedEnum', {name: props.name, genEnum})
	} else {
		ModelEditorEventBus.emit('createdEnum', genEnum)
	}
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="600" :init-y="100" @close="emits('close')">
		<EnumForm :enum="genEnum" @cancel="emits('close')" @submit="handleSubmit"></EnumForm>
	</DragDialog>
</template>
