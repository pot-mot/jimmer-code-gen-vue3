<script lang="ts" setup>
import {GenDataSourceView} from "@/api/__generated/model/static";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import DataSourceForm from "../form/DataSourceForm.vue";
import {DataSourceFormEmits} from "../form/DataSourceFormEmits.ts";
import {DataSourceDialogProps} from "./DataSourceDialogProps.ts";

const props = defineProps<DataSourceDialogProps>()

interface DataSourceDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<DataSourceDialogEmits & DataSourceFormEmits>()

const handleClose = () => {
	emits("close")
}

const handleUpdated = () => {
	emits('updated')
}

const handleAdded = (dataSource: GenDataSourceView) => {
	emits('added', dataSource)
}
</script>

<template>
	<DragDialog :model-value="true" :disable-teleport="disableTeleport" :init-w="500" :init-x="props.initX" :init-y="props.initY"
				:limit-by-parent="limitByParent" :to="to" @close="handleClose">
		<DataSourceForm
			:id="id" :data-source="dataSource"
			@added="handleAdded" @updated="handleUpdated"
		></DataSourceForm>
	</DragDialog>
</template>