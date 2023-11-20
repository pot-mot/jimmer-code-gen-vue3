<script lang="ts" setup>
import {GenPackageTreeView} from "@/api/__generated/model/static";
import {GenPackageTreeView_TargetOf_children} from "@/api/__generated/model/static/GenPackageTreeView.ts";
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {PackageMenuEventBus} from "./PackageMenuEventBus.ts";
import EntityItem from "./EntityItem.vue";
import {usePackageMenuStore} from "../store/PackageMenuStore.ts";
import EnumItem from "./EnumItem.vue";
import PackageCreateDialog from "./PackageCreateDialog.vue";
import {Delete, Plus} from "@element-plus/icons-vue";
import {deleteConfirm} from "@/utils/message.ts";
import PackageIcon from "@/components/global/icons/entity/PackageIcon.vue";

const store = usePackageMenuStore()

interface PackageItemProps {
	genPackage: GenPackageTreeView | GenPackageTreeView_TargetOf_children
}

const props = defineProps<PackageItemProps>()

const isDragenter = ref(false)

const handleDelete = () => {
	deleteConfirm(`包【${props.genPackage.name}】`, () => {
		PackageMenuEventBus.emit('deletePackage', {id: props.genPackage.id})
	}, props.genPackage.enums.length > 0 || props.genPackage.entities.length > 0 ? "（删除后包下的实体和枚举不会被删除）" : "")
}
</script>

<template>
	<Details open>
		<template #title>
			<div
				:style="isDragenter ? 'background-color:var(--el-color-info-light-8);' : ''"
				class="hover-show"
				draggable="true"
				style="line-height: 1.7em"
				@dragend="PackageMenuEventBus.emit('dragEnd')"
				@dragenter="isDragenter = true; store.targetPackageId = genPackage.id"
				@dragleave="isDragenter = false"
				@dragstart="PackageMenuEventBus.emit('dragStart', {id: genPackage.id, type: 'Package'})">
				<PackageIcon></PackageIcon>
				<el-text>{{ genPackage.name }}</el-text>
				<span class="hover-show-item" style="padding-left: 0.5em;">
					<PackageCreateDialog :parent-id="genPackage.id">
						<template #button><el-button :icon="Plus" link></el-button></template>
					</PackageCreateDialog>
					<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
				</span>
			</div>
		</template>

		<EntityItem v-for="entity in genPackage.entities" :entity="entity"></EntityItem>

		<EnumItem v-for="genEnum in genPackage.enums" :gen-enum="genEnum"></EnumItem>

		<PackageItem v-for="child in genPackage.children" :gen-package="child"></PackageItem>
	</Details>
</template>