<script lang="ts" setup>
import {ref} from "vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import PackageAddIcon from "@/components/global/icons/entity/PackageAddIcon.vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {GenPackagePathInput} from "@/api/__generated/model/static";

interface PackageCreateDialogProps {
	parentId?: number
}

const props = defineProps<PackageCreateDialogProps>()

const emits = defineEmits<FormEmits<GenPackagePathInput>>()

const newPath = ref("")

const openState = ref(false)

const x = ref(0)

const y = ref(0)

const handleOpen = (e: MouseEvent) => {
	x.value = e.x
	y.value = e.y
	openState.value = true
}

const handleSubmit = () => {
	emits('submit', {path: newPath.value, parentId: props.parentId})
	openState.value = false
	newPath.value = ""
}

const handleCancel = () => {
	emits('cancel', {path: newPath.value, parentId: props.parentId})
}
</script>

<template>
	<span @click="handleOpen">
		<slot name="button">
			<PackageAddIcon></PackageAddIcon>
		</slot>
	</span>

	<DragDialog v-model="openState" :init-w="300" :init-h="85" :init-x="x" :init-y="y" @close="handleCancel">
		<el-text>新软件包</el-text>
		<el-input
			v-model="newPath"
			@keydown.enter="handleSubmit">
		</el-input>
	</DragDialog>
</template>