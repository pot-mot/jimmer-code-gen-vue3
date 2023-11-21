<script lang="ts" setup>
import {PackageMenuEventBus} from "./PackageMenuEventBus.ts";
import {ref} from "vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import PackageAddIcon from "@/components/global/icons/entity/PackageAddIcon.vue";

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
	<span @click="handleOpen">
		<slot name="button">
			<PackageAddIcon></PackageAddIcon>
		</slot>
	</span>

	<DragDialog v-model="openState" :can-drag="false" :init-w="300" :init-x="x" :init-y="y">
		<el-text>新软件包名称</el-text>
		<el-input
			v-model="newPath"
			@keydown.enter="handleCreate">
		</el-input>
	</DragDialog>
</template>

<style scoped>

</style>