<script setup lang="ts">
import {GenModelInput} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {ModelFormProps} from "@/components/business/model/form/ModelFormProps.ts";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import ModelForm from "@/components/business/model/form/ModelForm.vue";
import {cloneDeep} from "lodash";
import {defaultModel} from "@/components/business/model/defaultModel.ts";

const props = defineProps<ModelFormProps>()

const emits = defineEmits<FormEmits<GenModelInput>>()
</script>

<template>
	<DragDialog :model-value="!!props.model" :init-w="1000" :init-y="50" :min-h="250" can-resize @close="emits('cancel', props.model ? props.model : cloneDeep(defaultModel))">
		<ModelForm :model="model" :edit-value="editValue"
				   @cancel="data => emits('cancel', data)"
				   @submit="data => emits('submit', data)"
					style="padding: 2em 1em 1em;"></ModelForm>
	</DragDialog>
</template>
