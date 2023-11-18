<script setup lang="ts">
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import NodeList from "../../common/GraphEditorTool/NodeList.vue";
import EdgeList from "../../common/GraphEditorTool/EdgeList.vue";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";
import Details from "../../common/Details.vue";

const store = useModelEditorStore()
</script>

<template>
	<el-button style="margin-bottom: 0.5em;" @click="store.openDataSourceLoadMenu = true">从数据源导入</el-button>

	<div>
		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Nodes</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createTable')">创建表</el-button>
				</div>
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
				<div style="height: 2em; line-height: 2em;">
					<el-text>Edges</el-text>
				</div>
			</template>

			<div style="padding-bottom: 1em;">
				<EdgeList :edges="store.edges">
					<template #default="{edge}">
						<EdgeItem :edge="edge" :key="edge.getSourcePortId() + '---' + edge.getTargetPortId()"></EdgeItem>
					</template>
				</EdgeList>
			</div>
		</Details>
	</div>
</template>