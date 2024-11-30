<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {validateEnum} from "@/components/business/enum/validateEnum.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {DeepReadonly} from "vue";
import {ENUM_CREATE_PREFIX} from "@/store/modelEditor/EnumDialogsStore.ts";

const {MODEL, MODEL_EDITOR} = useModelEditorStore()

const props = defineProps<{
    id: string,
    genEnum?: Partial<GenModelInput_TargetOf_enums>
}>()

const emits = defineEmits<{
    (event: "close"): void
}>()

const handleSubmit = (genEnum: GenModelInput_TargetOf_enums) => {
	if (props.id.startsWith(ENUM_CREATE_PREFIX)) {
        MODEL_EDITOR.createdEnum(props.id, genEnum)
    } else {
        MODEL_EDITOR.editedEnum(props.id, genEnum)
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
			@submit="handleSubmit"/>
	</DragDialog>
</template>
