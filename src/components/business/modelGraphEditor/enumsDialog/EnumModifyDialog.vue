<script lang="ts" setup>
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelEditorEventBus} from "../../../pages/ModelEditor/store/ModelEditorEventBus.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static/GenModelInput.ts";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {cloneDeep} from "lodash";

interface EnumModifyDialogProps {
	genEnum?: Partial<GenModelInput_TargetOf_enums>
}

const props = defineProps<EnumModifyDialogProps>()

interface EnumEntityDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<EnumEntityDialogEmits>()

const handleSubmit = (genEnum: GenModelInput_TargetOf_enums) => {
	ModelEditorEventBus.emit('modifiedEnum', {name: props.genEnum?.name ? props.genEnum.name : genEnum.name, genEnum})
}
</script>

<template>
	<DragDialog :model-value="true" :can-resize="true" :init-w="800" :init-h="600" :init-y="100" @close="emits('close')">
		<EnumForm :enum="cloneDeep(genEnum)" @cancel="emits('close')" @submit="handleSubmit"></EnumForm>
	</DragDialog>
</template>
