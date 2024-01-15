<script setup lang="ts">
import {GenModelInput} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelFormProps} from "@/components/business/model/form/ModelFormProps.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import ModelForm from "@/components/business/model/form/ModelForm.vue";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenModelInput>>()
</script>

<template>
	<DragDialog
		:model-value="!!props.model"
		:init-w="900" :init-y="50" :min-h="300" :min-w="500"
		:init-h="editValue ? 600 : 300"
		:can-resize="editValue"
		limit-by-parent
		@close="emits('cancel', props.model ? props.model : getDefaultModel())">
		<ModelForm :model="model" :edit-value="editValue"
				   @cancel="data => emits('cancel', data)"
				   @submit="data => emits('submit', data)"></ModelForm>
	</DragDialog>
</template>
