<template>
	<div id="ModelEditor" ref="wrapper" class="wrapper">
		<div ref="container"></div>
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

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useModelEditorGraphStore()

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
</script>