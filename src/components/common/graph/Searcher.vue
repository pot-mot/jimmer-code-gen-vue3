<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import {Graph, Node} from "@antv/x6";
import DragDialog from "../dragDialog/DragDialog.vue";
import {focus} from "../../../utils/graphEditor/viewOperation.ts";

interface SearcherProps {
	graph: Graph,
	searchMethod: (node: Node, value: string) => Boolean,
	to?: string,
}

const props = defineProps<SearcherProps>()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const openState = ref(false)

const searchTableNodes = (graph: Graph): Node[] => {
	if (keyword.value.length == 0) {
		return []
	}

	return graph.getNodes().filter(node => {
		return props.searchMethod(node, keyword.value)
	})
}

const input = ref()

const dialog = ref()

const handleSearchKeyDown = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			if (openState.value) return

			e.preventDefault()
			searchResult.value = []
			openState.value = true
			nextTick(() => {
				if (input) {
					input.value.focus()
				}
			})
		}
	}
}

const searchResultContainer = ref()

const handleSearch = () => {
	if (keyword.value.trim().length > 0) {
		searchResult.value = searchTableNodes(props.graph)
	} else {
		searchResult.value = []
	}

	nextTick(() => {
		dialog.value.syncDialogHeight()
	})
}

onMounted(() => {
	document.documentElement.addEventListener('keydown', handleSearchKeyDown)
})

onUnmounted(() => {
	document.documentElement.removeEventListener('keydown', handleSearchKeyDown)
})

const handleClose = () => {
	keyword.value = ''
	searchResult.value = []

	nextTick(() => {
		openState.value = false
	})
}
</script>

<template>
	<div v-if="openState">
		<DragDialog ref="dialog" @close="handleClose" :init-w="400" :init-x="1100" :init-y="50" :to="to" fit-content>
			<el-input ref="input" v-model="keyword" @input="handleSearch" @change="handleSearch" clearable>
				<template #append>
					<el-button @click="handleSearch">搜索</el-button>
				</template>
			</el-input>

			<div style="max-height: 60vh; overflow: auto;" ref="searchResultContainer">
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
		</DragDialog>
	</div>
</template>

<style scoped>

</style>