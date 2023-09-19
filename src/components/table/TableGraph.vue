<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"/>
		<ul class="tool-list">
			<li @click="handleUndo">undo</li>
			<li @click="handleRedo">redo</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	height: 100%;
	width: 100%;
}

.tool-list {
	position: absolute;
	top: 0;
	right: 0;
}
</style>

<script setup lang="ts">
import {nextTick, onMounted, Ref, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPortLayout} from "./port/ColumnPortLayout.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./shape/TableNode.vue";
import {initGraph} from "./graphEditor/init.ts";
import {useStoreEvents} from "./graphEditor/store.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory} from "./graphEditor/history.ts";
import {useScroller} from "./graphEditor/scroller.ts";
import {useSelection} from "./graphEditor/selection.ts";
import {useMouseEnterToFront} from "./graphEditor/eventListen.ts";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);

const graph: Ref<Graph> = ref();

Graph.registerPortLayout(
	COLUMN_PORT,
	ColumnPortLayout,
	true
)

register({
	shape: "table",
	component: TableNode
});

const handleUndo = () => {
	if (graph.value && graph.value.canUndo()) {
		graph.value.undo()
	}
}

const handleRedo = () => {
	if (graph.value && graph.value.canRedo()) {
		graph.value.redo()
	}
}

onMounted(() => {
	nextTick(() => {
		graph.value = initGraph(container.value!, wrapper.value!)
		useStoreEvents(graph.value)
		useHistory(graph.value)
		useScroller(graph.value)
		useSelection(graph.value)

		useMouseEnterToFront(graph.value)

		console.log(graph.value)
	})
});
</script>