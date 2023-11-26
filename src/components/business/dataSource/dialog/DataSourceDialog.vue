<script lang="ts" setup>
import {GenDataSourceView} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import DataSourceForm from "../form/DataSourceForm.vue";
import {DataSourceFormEmits} from "../form/DataSourceFormEmits.ts";
import {DialogInitPositionProps, ModelValueProps} from "@/components/global/dialog/DragDialogProps.ts";
import {DataSourceFormProps} from "@/components/business/dataSource/form/DataSourceFormProps.ts";
import {ModelValueEmits} from "@/components/global/dialog/DragDialogEmits.ts";

const props = defineProps<ModelValueProps<boolean> & DataSourceFormProps & DialogInitPositionProps>()

const emits = defineEmits<ModelValueEmits<boolean> & DataSourceFormEmits>()

const handleUpdated = () => {
	emits('updated')
}

const handleAdded = (dataSource: GenDataSourceView) => {
	emits('added', dataSource)
}

const handleModelValueUpdate = (modelValue: boolean) => {
	emits('update:modelValue', modelValue)
}
</script>

<template>
	<DragDialog :model-value="modelValue" @update:model-value="handleModelValueUpdate"
				:init-w="500" :init-x="props.initX" :init-y="props.initY">
		<DataSourceForm
			style="height: calc(100% - 1em)"
			:id="id" :data-source="dataSource"
			@added="handleAdded" @updated="handleUpdated"
		></DataSourceForm>
	</DragDialog>
</template>