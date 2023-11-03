<script setup lang="ts">
import TopBottomLayout from "../../layout/TopBottomLayout.vue";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {useModelEditorGraphStore} from "../store/ModelEditorGraphStore.ts";
import NodeList from "../../common/graph/NodeList.vue";
import EdgeList from "../../common/graph/EdgeList.vue";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";

const store = useModelEditorGraphStore()
</script>

<template>
	<div style="height: 100%; display: grid; grid-template-rows: auto 1fr;">
		<div>
			<el-button @click="ModelEditorEventBus.emit('createTable')">创建表</el-button>
		</div>
		<div>
			<TopBottomLayout>
				<template #top>
					<NodeList :nodes="store.nodes">
						<template #default="{node}">
							<NodeItem :node="node"></NodeItem>
						</template>
					</NodeList>
				</template>
				<template #bottom>
					<EdgeList :edges="store.edges">
						<template #default="{edge}">
							<EdgeItem :edge="edge"></EdgeItem>
						</template>
					</EdgeList>
				</template>
			</TopBottomLayout>
		</div>
	</div>
</template>

<style scoped>

</style>