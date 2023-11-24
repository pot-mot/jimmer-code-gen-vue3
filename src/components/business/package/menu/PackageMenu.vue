<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue"
import {api} from "@/api";
import {GenEntityPropertiesView, GenEnumView, GenPackageTreeView} from "@/api/__generated/model/static";
import PackageItem from "./PackageItem.vue";
import EntityItem from "./EntityItem.vue";
import PackageCreateDialog from "../dialog/PackageCreateDialog.vue";
import {sendMessage} from "@/utils/message.ts";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "./EnumItem.vue";
import mitt from "mitt";
import {PackageMenuEvents} from "@/components/business/package/menu/PackageMenuEvents.ts";
import {usePackageMenuStore} from "@/components/business/package/menu/PackageMenuStore.ts";
import {useLoading} from "@/hooks/useLoading.ts";

const store = usePackageMenuStore()

const eventBus = mitt<PackageMenuEvents>()

const packages = ref<GenPackageTreeView[]>([])

const nonPackageEntities = ref<GenEntityPropertiesView[]>([])

const nonPackageEnums = ref<GenEnumView[]>([])

const packageLoading = useLoading()

const getData = async () => {
	packageLoading.add()

	packages.value = await api.packageService.list()
	nonPackageEntities.value = await api.entityService.query({
		query: {
			nonPackage: true
		}
	})
	nonPackageEnums.value = await api.enumService.query({
		query: {
			nonPackage: true
		}
	})

	await nextTick()
	packageLoading.sub()
}

onMounted(() => {
	getData()
})

eventBus.on('dragStart', ({id, type}) => {
	store.dragId = id
	store.dragType = type
})

eventBus.on('dragEnd', async () => {
	if (store.dragId && store.dragType && store.targetPackageId) {
		switch (store.dragType) {
			case 'Package':
				await api.packageService.movePackage({packageId: store.targetPackageId, id: store.dragId})
				break
			case 'Entity':
				await api.packageService.moveEntity({packageId: store.targetPackageId, id: store.dragId})
				break
			case 'Enum':
				await api.packageService.moveEnum({packageId: store.targetPackageId, id: store.dragId})
				break
		}

		eventBus.emit('updatePackage', {
			packageId: store.targetPackageId,
			id: store.dragId,
			type: store.dragType
		})

		store.dragType = undefined
		store.dragId = undefined
		store.targetPackageId = undefined
	}
})

eventBus.on('updatePackage', () => {
	getData()
})

eventBus.on('createPackage', async (body) => {
	packageLoading.add()

	const id = await api.packageService.create({body})
	if (!id) {
		sendMessage('软件包创建失败', 'error')
		return
	}

	await getData()
	sendMessage('软件包创建成功', 'success')

	packageLoading.sub()
})

eventBus.on('deletePackage', async ({id}) => {
	packageLoading.add()

	const count = await api.packageService.delete({ids: [id]})
	if (count == 0) {
		sendMessage('软件包删除失败', 'error')
		return
	}

	await getData()
	sendMessage('软件包删除成功', 'success')

	packageLoading.sub()
})
</script>

<template>
	<div v-loading="packageLoading.isLoading()">
		<div style="padding-left: 1em;">
			<Details v-if="nonPackageEntities.length > 0" open>
				<template #title>
					<el-text>无软件包的实体（可拖曳进目标软件包）</el-text>
				</template>

				<EntityItem v-for="entity in nonPackageEntities" :entity="entity" :event-bus="eventBus"></EntityItem>
			</Details>
			<Details v-if="nonPackageEnums.length > 0" open>
				<template #title>
					<el-text>无软件包的枚举（可拖曳进目标软件包）</el-text>
				</template>

				<EnumItem v-for="genEnum in nonPackageEnums" :gen-enum="genEnum" :event-bus="eventBus"></EnumItem>
			</Details>
		</div>

		<PackageItem v-for="genPackage in packages" :gen-package="genPackage" :event-bus="eventBus"></PackageItem>
		<PackageCreateDialog @submit="(data) => eventBus.emit('createPackage', data)"></PackageCreateDialog>
	</div>
</template>

<style scoped>

</style>