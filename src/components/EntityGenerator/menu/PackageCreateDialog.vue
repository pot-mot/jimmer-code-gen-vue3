<script setup lang="ts">
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";
import {ref} from "vue";
import DragDialog from "../../common/DragDialog.vue";
import {Plus} from "@element-plus/icons-vue";

interface PackageCreateDialogProps {
	parentId?: number
}

const props = defineProps<PackageCreateDialogProps>()

const newPath = ref("")

const openState = ref(false)

const x = ref(0)

const y = ref(0)

const handleOpen = (e: MouseEvent) => {
	x.value = e.x
	y.value = e.y
	openState.value = true
}

const handleCreate = () => {
	PackageMenuEventBus.emit('createPackage', {path: newPath.value, parentId: props.parentId})
	openState.value = false
	newPath.value = ""
}
</script>

<template>
	<el-button :icon="Plus" @click="handleOpen" link></el-button>

	<DragDialog v-if="openState" @close="openState = false" :can-drag="false" :x="x" :y="y" :init-w="300">
		<el-input
			v-model="newPath"
			@keydown.enter="handleCreate">
		</el-input>
	</DragDialog>
</template>

<style scoped>

</style>