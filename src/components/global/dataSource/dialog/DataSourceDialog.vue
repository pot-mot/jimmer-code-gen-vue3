<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {api} from "../../../../api";
import {GenDataSourceView} from "../../../../api/__generated/model/static";
import {DataSourceType} from "../../../../api/__generated/model/enums";
import DragDialog from "../../../common/DragDialog/DragDialog.vue";
import DataSourceForm from "../form/DataSourceForm.vue";
import {DataSourceFormEmits} from "../form/DataSourceFormEmits.ts";
import {DataSourceDialogProps} from "./DataSourceDialogProps.ts";

const dataSourceTypes = ref<DataSourceType[]>([])

onMounted(async () => {
	dataSourceTypes.value = await api.dataSourceService.listType()
})

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
	<DragDialog :init-x="props.initX" :init-y="props.initY" :init-w="500" @close="handleClose" :disable-teleport="disableTeleport" :limit-by-parent="limitByParent" :to="to">
		<DataSourceForm
			:data-source="dataSource" :id="id"
			@updated="handleUpdated" @added="handleAdded"
		></DataSourceForm>
	</DragDialog>
</template>