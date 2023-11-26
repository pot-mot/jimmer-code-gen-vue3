<script lang="ts" setup>
import {onMounted, ref} from "vue";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import Graph from "../AssociationEditor/graph/Graph.vue";
import TableDialogManager from "@/components/pages/AssociationEditor/nodeDialog/TableDialogManager.vue";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {useAssociationEditorStore} from "@/components/pages/AssociationEditor/store/AssociationEditorStore.ts";
import {Emitter} from "mitt";
import {DataSourceMenuEvents} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";

const store = useAssociationEditorStore()

const loadingStore = useGlobalLoadingStore()

const menu = ref()

onMounted(() => {
	if (menu.value) {
		const eventBus: Emitter<DataSourceMenuEvents> = menu.value.eventBus

		eventBus.on('clickTable', async ({id}) => {
			loadingStore.add()
			await store.loadTable(id)
			loadingStore.sub()
		})

		eventBus.on('clickSchema', async ({id}) => {
			loadingStore.add()
			await store.loadSchema(id)
			loadingStore.sub()
		})

		eventBus.on('deleteDataSource', ({id}) => {
			loadingStore.add()
			store.removeTables(table => table.schema?.dataSource.id == id)
			loadingStore.sub()
		})

		eventBus.on('deleteSchema', ({id}) => {
			loadingStore.add()
			store.removeTables(table => table.schema?.id == id)
			loadingStore.sub()
		})
	}
})
</script>

<template>
	<LeftRightLayout>
		<template #left>
			<DataSourceMenu ref="menu"></DataSourceMenu>
		</template>
		<template #right>
			<Graph></Graph>
		</template>
	</LeftRightLayout>

	<TableDialogManager></TableDialogManager>
</template>