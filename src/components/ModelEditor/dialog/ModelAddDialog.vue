<script setup lang="ts">
import {ref} from 'vue'
import DragDialog from "../../common/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {GenTableColumnsInput} from "../../../api/__generated/model/static";

const openState = ref(false)

ModelEditorEventBus.on('createTable', () => {
	openState.value = true
})

const handleSubmit = (table: GenTableColumnsInput) => {
	ModelEditorEventBus.emit('createdTable', table)
	openState.value = false
}
</script>

<template>
	<DragDialog v-if="openState" @close="openState = false" :can-resize="true" :y="100" :init-w="1000">
		<ModelForm @submit="handleSubmit" @cancel="openState = false"></ModelForm>
	</DragDialog>
</template>