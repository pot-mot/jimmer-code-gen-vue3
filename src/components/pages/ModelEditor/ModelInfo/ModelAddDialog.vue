<script lang="ts" setup>
import {ref} from 'vue'
import DragDialog from "@/components/global/DragDialog/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "@/api/__generated/model/static";

const openState = ref(false)

const x = ref<number>()
const y = ref<number>()

ModelEditorEventBus.on('createTable', (props) => {
	openState.value = true

	if (props) {
		x.value = props.x
		y.value = props.y
	}
})

const handleSubmit = (table: GenTableColumnsInput) => {
	ModelEditorEventBus.emit('createdTable', {table, x: x.value, y: y.value})
	openState.value = false
}
</script>

<template>
	<DragDialog v-if="openState" :can-resize="true" :init-w="1200" :init-y="100" @close="openState = false">
		<ModelForm @cancel="openState = false" @submit="handleSubmit"></ModelForm>
	</DragDialog>
</template>