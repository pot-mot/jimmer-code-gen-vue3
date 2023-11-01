<script setup lang="ts">
import {onMounted, ref} from "vue"
import {api} from "../../../api";
import {GenEntityPropertiesView, GenEnumView, GenPackageTreeView} from "../../../api/__generated/model/static";
import PackageItem from "./PackageItem.vue";
import EntityItem from "./EntityItem.vue";
import {PackageMenuEventBus} from "../eventBus/PackageMenuEventBus.ts";
import PackageCreateDialog from "./PackageCreateDialog.vue";
import {sendMessage} from "../../../utils/message.ts";
import Details from "../../common/Details.vue";
import EnumItem from "./EnumItem.vue";

const packages = ref<GenPackageTreeView[]>([])

const nonPackageEntities = ref<GenEntityPropertiesView[]>([])

const nonPackageEnums = ref<GenEnumView[]>([])

const getData = async () => {
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
}

onMounted(() => {
	getData()
})

PackageMenuEventBus.on('updatePackage', () => {
	getData()
})

PackageMenuEventBus.on('createPackage', async ({path, parentId}) => {
	await api.packageService.create({path, parentId})
	await getData()
	sendMessage('软件包创建成功', 'success')
})

PackageMenuEventBus.on('deletePackage', async ({id}) => {
	await api.packageService.delete({ids: [id]})
	await getData()
	sendMessage('软件包删除成功', 'success')
})
</script>

<template>
	<div>
		<div style="padding-left: 1em;">
			<Details v-if="nonPackageEntities.length > 0" open>
				<template #title>
					<el-text>无软件包的实体（可拖曳进目标软件包）</el-text>
				</template>

				<EntityItem v-for="entity in nonPackageEntities" :entity="entity"></EntityItem>
			</Details>
			<Details v-if="nonPackageEnums.length > 0" open>
				<template #title>
					<el-text>无软件包的枚举（可拖曳进目标软件包）</el-text>
				</template>

				<EnumItem v-for="genEnum in nonPackageEnums" :gen-enum="genEnum"></EnumItem>
			</Details>
		</div>

		<PackageItem v-for="genPackage in packages" :gen-package="genPackage"></PackageItem>
		<PackageCreateDialog></PackageCreateDialog>
	</div>
</template>

<style scoped>

</style>