<script setup lang="ts">
import {GenPackageTreeView} from "../../../api/__generated/model/static";
import {GenPackageTreeView_TargetOf_children} from "../../../api/__generated/model/static/GenPackageTreeView.ts";
import Details from "../../common/Details.vue";
import {ref} from "vue";
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";
import EntityItem from "./EntityItem.vue";
import {usePackageMenuStore} from "../store/PackageMenuStore.ts";
import EnumItem from "./EnumItem.vue";
import PackageCreateDialog from "./PackageCreateDialog.vue";
import {Delete} from "@element-plus/icons-vue";
import {deleteConfirm} from "../../../utils/message.ts";

const store = usePackageMenuStore()

interface PackageItemProps {
	genPackage: GenPackageTreeView | GenPackageTreeView_TargetOf_children
}

const props = defineProps<PackageItemProps>()

const isDragenter = ref(false)

const handleDelete = () => {
	deleteConfirm(`包【${props.genPackage.name}】`, () => {
		PackageMenuEventBus.emit('deletePackage', {id: props.genPackage.id})
	})
}
</script>

<template>
	<Details open>
		<template #title>
			<div
				style="line-height: 1.7em"
				draggable="true"
				@dragstart="PackageMenuEventBus.emit('dragStart', {id: genPackage.id, type: 'Package'})"
				@dragend="PackageMenuEventBus.emit('dragEnd')"
				@dragenter="isDragenter = true; store.targetPackageId = genPackage.id"
				@dragleave="isDragenter = false"
				:style="isDragenter ? 'background-color:var(--el-color-info-light-8);' : ''">
				<el-text style="padding-right: 0.5em;">{{ genPackage.name }}</el-text>
				<PackageCreateDialog :parent-id="genPackage.id"></PackageCreateDialog>
				<el-button type="danger" :icon="Delete" @click="handleDelete" link></el-button>
			</div>
		</template>

		<EntityItem v-for="entity in genPackage.entities" :entity="entity"></EntityItem>

		<EnumItem v-for="genEnum in genPackage.enums" :gen-enum="genEnum"></EnumItem>

		<PackageItem v-for="child in genPackage.children" :gen-package="child"></PackageItem>
	</Details>
</template>