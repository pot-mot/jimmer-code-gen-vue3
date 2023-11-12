<script lang="ts" setup>
import LeftTopBottomLayout from "../components/layout/LeftRightLayout.vue";
import DataSourceMenu from "../components/global/DataSourceMenu/DataSourceMenu.vue";
import TableGraph from "../components/AssociationEditor/index.vue";
import {ref} from "vue";

const menu = ref()
</script>

<template>
	<LeftTopBottomLayout>
		<template #left>
			<DataSourceMenu ref="menu"></DataSourceMenu>
		</template>
		<template #right v-if="menu">
			<TableGraph :event-bus="menu.eventBus"></TableGraph>
		</template>
	</LeftTopBottomLayout>
</template>