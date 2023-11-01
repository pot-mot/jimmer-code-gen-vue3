<script setup lang="ts">
import TopBottomLayout from "../../layout/TopBottomLayout.vue";
import AssociationList from "./AssociationList.vue";
import TableList from "./TableList.vue";
import {ModelDialogEventBus} from "../eventBus/ModelDialogEventBus.ts";
</script>

<template>
	<div style="height: 100%; display: grid; grid-template-rows: auto 1fr;">
		<div>
			<el-button @click="ModelDialogEventBus.emit('createTable')">创建表</el-button>
		</div>
		<div>
			<TopBottomLayout>
				<template #top>
					<TableList></TableList>
				</template>
				<template #bottom>
					<AssociationList></AssociationList>
				</template>
			</TopBottomLayout>
		</div>
	</div>
</template>

<style scoped>

</style>