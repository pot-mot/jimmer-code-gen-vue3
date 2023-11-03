<script setup lang="ts">
import {ref} from 'vue'
import DragDialog from "../../common/DragDialog.vue";
import ModelForm from "./ModelForm.vue";
import {ModelDialogEventBus} from "../eventBus/ModelDialogEventBus.ts";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";

const openState = ref(false)

ModelDialogEventBus.on('createTable', () => {
	openState.value = true
})
</script>

<template>
	<DragDialog v-if="openState" @close="openState = false" :can-resize="true" :y="100" :init-w="1000">
		<ModelForm @submit="(table) => ModelEditorEventBus.emit('createdTable', table)"></ModelForm>
	</DragDialog>
</template>

<style scoped>

</style>