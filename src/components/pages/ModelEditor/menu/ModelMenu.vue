<script lang="ts" setup>
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import NodeItem from "./NodeItem.vue";
import EdgeItem from "./EdgeItem.vue";
import NodeList from "@/components/global/graphEditor/tools/NodeList.vue";
import EdgeList from "@/components/global/graphEditor/tools/EdgeList.vue";
import Details from "@/components/global/common/Details.vue";

const store = useModelEditorStore()
</script>

<template>
	<div>
		<el-button style="margin-bottom: 0.5em;" @click="store.openDataSourceLoadMenu = true">从数据源导入</el-button>

		<Details open>
			<template #title>
				<div style="height: 2em; line-height: 2em;">
					<el-text>Nodes</el-text>
					<el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createTable')">创建表
					</el-button>
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
						<EdgeItem :key="edge.getSourcePortId() + '---' + edge.getTargetPortId()"
								  :edge="edge"></EdgeItem>
					</template>
				</EdgeList>
			</div>
		</Details>
	</div>
</template>