<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {Graph, Node} from "@antv/x6";
import DragDialog from "../common/DragDialog.vue";
import {focus} from "../../utils/graphEditor/viewOperation.ts";

interface SearcherProps {
	graph: Graph,
	searchMethod: (node: Node, value: string) => Boolean
}

const props = defineProps<SearcherProps>()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const showSearch = ref(false)

const searchTableNodes = (graph: Graph): Node[] => {
	if (keyword.value.length == 0) {
		return []
	}

	return graph.getNodes().filter(node => {
		return props.searchMethod(node, keyword.value)
	})
}

const search = () => {
	if (keyword.value.trim().length > 0) {
		searchResult.value = searchTableNodes(props.graph)
	} else {
		searchResult.value = []
	}
}

const input = ref()

const handleSearchKeyDown = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			e.preventDefault()
			searchResult.value = []
			showSearch.value = true
			nextTick(() => {
				if (input) {
					input.value.focus()
				}
			})
		}
	}
}

onMounted(() => {
	document.documentElement.addEventListener('keydown', handleSearchKeyDown)
})

onBeforeUnmount(() => {
	document.documentElement.removeEventListener('keydown', handleSearchKeyDown)
})
</script>

<template>
	<DragDialog v-if="showSearch" @close="showSearch = false; keyword = '';" :init-w="400" :y="50"
				to="#AssociationEditor" :can-drag="false">
		<el-popover :visible="keyword.length > 0" width="390">
			<template #reference>
				<el-input ref="input" v-model="keyword" @input="search" @change="search" clearable>
					<template #append>
						<el-button @click="search">搜索</el-button>
					</template>
				</el-input>
			</template>

			<div style="max-height: 60vh; overflow: auto">
				<div v-if="keyword.length > 0 && searchResult.length == 0">
					无搜索结果
				</div>

				<div v-for="node in searchResult">
					<slot name="default" :node="node">
						<el-button
							@click="focus(graph, node.id)"
							size="default"
							link>
							{{ node.id }}
						</el-button>
					</slot>
				</div>
			</div>
		</el-popover>
	</DragDialog>
</template>

<style scoped>

</style>