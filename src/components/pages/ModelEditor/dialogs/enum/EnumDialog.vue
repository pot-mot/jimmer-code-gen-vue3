<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {validateEnum} from "@/components/business/enum/validateEnum.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";

const {MODEL} = useModelEditorStore()

interface EnumDialogProps {
	id: string,
	genEnum?: Partial<GenModelInput_TargetOf_enums>
}

const props = defineProps<EnumDialogProps>()

interface EnumEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<EnumEntityDialogEmits>()

const handleSubmit = (genEnum: GenModelInput_TargetOf_enums) => {
	if (props.id.length > 0) {
		ModelEditorEventBus.emit('editedEnum', {id: props.id, genEnum})
	} else {
		ModelEditorEventBus.emit('createdEnum', {id: props.id, genEnum})
	}
}

const validate = (genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
	return validateEnum(
		genEnum,
		MODEL.enums.filter(it => it.name !== props.id)
	)
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="600" :init-y="100"
				@close="emits('close')">
		<EnumForm
			:enum="genEnum"
			:validate="validate"
			@cancel="emits('close')"
			@submit="handleSubmit"></EnumForm>
	</DragDialog>
</template>
