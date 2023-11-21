<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import {Graph, Node} from "@antv/x6";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import {focus} from "../operations/viewOperation.ts";

interface SearcherProps {
	graph: Graph,
	searchMethod: (node: Node, value: string) => Boolean,
	to?: string,
}

const props = defineProps<SearcherProps>()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const openState = ref(false)

const mouseenterState = ref(false)

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

const handleSearchKeyEvent = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			if (!mouseenterState.value) return

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

const handleMouseenter = () => {
	mouseenterState.value = true
}

const handleMouseleave = () => {
	mouseenterState.value = false
}

onMounted(() => {
	props.graph.container.addEventListener('mouseenter', handleMouseenter)

	props.graph.container.addEventListener('mouseleave', handleMouseleave)

	document.documentElement.addEventListener('keydown', handleSearchKeyEvent)
})

onUnmounted(() => {
	props.graph.container.removeEventListener('mouseenter', handleMouseenter)

	props.graph.container.removeEventListener('mouseleave', handleMouseleave)

	document.documentElement.removeEventListener('keydown', handleSearchKeyEvent)
})

const handleClose = () => {
	keyword.value = ''
	searchResult.value = []
}
</script>

<template>
	<DragDialog v-model="openState" ref="dialog" :init-w="400" :init-x="1100" :init-y="50" :to="to" fit-content @close="handleClose">
		<el-input ref="input" v-model="keyword" clearable @change="handleSearch" @input="handleSearch">
			<template #append>
				<el-button @click="handleSearch">搜索</el-button>
			</template>
		</el-input>

		<div ref="searchResultContainer" style="max-height: 60vh; overflow: auto;">
			<div v-if="keyword.length > 0 && searchResult.length == 0">
				无搜索结果
			</div>

			<div v-for="node in searchResult">
				<slot :node="node" name="default">
					<el-button
						link
						size="default"
						@click="focus(graph, node.id)">
						{{ node.id }}
					</el-button>
				</slot>
			</div>
		</div>
	</DragDialog>
</template>

<style scoped>

</style>