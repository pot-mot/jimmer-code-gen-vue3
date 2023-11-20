<script lang="ts" setup>
import {ref} from "vue";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";
import DataSourceMenu from "@/components/global/dataSource/menu/DataSourceMenu.vue";
import Graph from "../AssociationEditor/graph/Graph.vue";
import TableDialogManager from "./TableInfo/TableDialogManager.vue";

const menu = ref()
</script>

<template>
	<LeftRightLayout>
		<template #left>
			<DataSourceMenu ref="menu"></DataSourceMenu>
		</template>
		<template v-if="menu" #right>
			<Graph :event-bus="menu.eventBus"></Graph>
		</template>
	</LeftRightLayout>

	<TableDialogManager></TableDialogManager>
</template>