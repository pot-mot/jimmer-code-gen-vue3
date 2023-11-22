<script lang="ts" setup>
import {GenDataSourceView} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import DataSourceForm from "../form/DataSourceForm.vue";
import {DataSourceFormEmits} from "../form/DataSourceFormEmits.ts";
import {DataSourceDialogProps} from "./DataSourceDialogProps.ts";

const props = defineProps<DataSourceDialogProps & {modelValue: boolean}>()

interface DataSourceDialogEmits {
	(event: "update:modelValue", modelValue: boolean): void
}

const emits = defineEmits<DataSourceDialogEmits & DataSourceFormEmits>()

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
				:init-w="500" :init-x="props.initX" :init-y="props.initY"
				:limit-by-parent="limitByParent" :to="to">
		<DataSourceForm
			style="height: calc(100% - 1em)"
			:id="id" :data-source="dataSource"
			@added="handleAdded" @updated="handleUpdated"
		></DataSourceForm>
	</DragDialog>
</template>