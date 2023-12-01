<script lang="ts" setup>
import {GenPackagePathInput, GenPackageTreeView} from "@/api/__generated/model/static";
import {GenPackageTreeView_TargetOf_children} from "@/api/__generated/model/static/GenPackageTreeView.ts";
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import EntityItem from "./EntityItem.vue";
import {usePackageMenuStore} from "./PackageMenuStore.ts";
import EnumItem from "./EnumItem.vue";
import PackageCreateDialog from "../dialog/PackageCreateDialog.vue";
import {Delete, Download, Plus} from "@element-plus/icons-vue";
import {deleteConfirm} from "@/utils/message.ts";
import PackageIcon from "@/components/global/icons/entity/PackageIcon.vue";
import {PackageMenuEventsProps} from "@/components/business/package/menu/PackageMenuEvents.ts";
import {api} from "@/api";
import {saveAs} from "file-saver";

const store = usePackageMenuStore()

interface PackageItemProps {
	genPackage: GenPackageTreeView | GenPackageTreeView_TargetOf_children
}

const props = defineProps<PackageItemProps & PackageMenuEventsProps>()

const isDragenter = ref(false)

const handleAdd = async (packagePath: GenPackagePathInput) => {
	props.eventBus.emit('createPackage', packagePath)
}

const handleDownload = async () => {
	const res = await api.generateService.generateByPackage({body: [props.genPackage.id]}) as any as Blob
	const file = new File([res], `code.zip`)
	saveAs(file)
}

const handleDelete = () => {
	deleteConfirm(`包【${props.genPackage.name}】`, () => {
		props.eventBus.emit('deletePackage', {id: props.genPackage.id})
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
				@dragend="eventBus.emit('dragEnd')"
				@dragenter="isDragenter = true; store.targetPackageId = genPackage.id"
				@dragleave="isDragenter = false"
				@dragstart="eventBus.emit('dragStart', {id: genPackage.id, type: 'Package'})">
				<PackageIcon></PackageIcon>
				<el-text>{{ genPackage.name }}</el-text>
				<span class="hover-show-item" style="padding-left: 0.5em;">
					<PackageCreateDialog :parent-id="genPackage.id" @submit="handleAdd">
						<template #button><el-button :icon="Plus" link></el-button></template>
					</PackageCreateDialog>
					<span>
						<el-button :icon="Download" link title="下载" @click="handleDownload"></el-button>
					</span>
					<span>
						<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
					</span>
				</span>
			</div>
		</template>

		<EntityItem v-for="entity in genPackage.entities" :entity="entity" :event-bus="eventBus"></EntityItem>

		<EnumItem v-for="genEnum in genPackage.enums" :gen-enum="genEnum" :event-bus="eventBus"></EnumItem>

		<PackageItem v-for="child in genPackage.children" :gen-package="child" :event-bus="eventBus"></PackageItem>
	</Details>
</template>