<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"></div>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
			<MiniMap :graph="store._graph()" ref="minimap"></MiniMap>

			<ScaleBar :graph="store._graph()"></ScaleBar>
		</div>

		<template v-if="store.isLoaded">
			<Searcher :graph="store._graph()" :search-method="tableNodeMatchMethod">
				<template v-slot="{node}">
					<el-button
						@click="store.focus(node.id)"
						size="default"
						link>
						{{ node.data.table.name }}
						<Comment :comment="node.data.table.comment"></Comment>
					</el-button>
				</template>
			</Searcher>
		</template>
	</div>
</template>

<style scoped>
@import "../../assets/graph-common.css";
</style>

<script setup lang="ts">
import {useModelEditorGraphStore} from "./store/ModelEditorGraphStore.ts";
import {ref, onMounted, onUnmounted} from "vue";
import {Graph} from "@antv/x6";
import {useSave} from "../AssociationEditor/useSave.ts";
import {initAssociationEditor} from "../AssociationEditor/init.ts";
import {useSwitchAssociationType} from "../AssociationEditor/edge/AssociationEdge.ts";
import MiniMap from "../common/graph/MiniMap.vue";
import ScaleBar from "../common/graph/ScaleBar.vue";
import Searcher from "../common/graph/Searcher.vue";
import {tableNodeMatchMethod} from "../AssociationEditor/node/TableNode.ts";
import Comment from "../common/Comment.vue";
import {ModelEditorEventBus} from "./eventBus/ModelEditorEventBus.ts";
import {addModelNode} from "./node/modelNode.ts";
import {register} from "@antv/x6-vue-shape";
import ModelNode from "./node/ModelNode.vue";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useModelEditorGraphStore()

register({
	shape: "model",
	component: ModelNode
});

const {
	loadGraph,
} = useSave(() => graph, "ModelEditorGraph")

onMounted(() => {
	graph = initAssociationEditor(container.value!, wrapper.value!)

	useSwitchAssociationType(graph)
	loadGraph()
	store.load(graph)
})

onUnmounted(() => {
	store.unload()
})

ModelEditorEventBus.on('createdTable', (table) => {
	addModelNode(graph, table)
})
</script>