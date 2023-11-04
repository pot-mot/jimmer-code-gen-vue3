<script setup lang="ts">
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import NodeList from "../../common/graph/NodeList.vue";
import EdgeList from "../../common/graph/EdgeList.vue";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";
import Details from "../../common/Details.vue";

const store = useModelEditorStore()
</script>

<template>
	<Details open>
		<template #title>
			<el-text>Nodes</el-text>
			<el-button @click="ModelEditorEventBus.emit('createTable')">创建表</el-button>
		</template>

		<div style="padding-bottom: 1em;">
			<NodeList :nodes="store.nodes">
				<template #default="{node}">
					<NodeItem :node="node"></NodeItem>
				</template>
			</NodeList>
		</div>
	</Details>

	<Details open>
		<template #title>
			<el-text>Edges</el-text>
			<el-button @click="ModelEditorEventBus.emit('createAssociation')">创建关联</el-button>
		</template>

		<div style="padding-bottom: 1em;">
			<EdgeList :edges="store.edges">
				<template #default="{edge}">
					<EdgeItem :edge="edge"></EdgeItem>
				</template>
			</EdgeList>
		</div>
	</Details>
</template>

<style scoped>

</style>