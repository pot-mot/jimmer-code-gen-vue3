<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {Graph, Node} from "@antv/x6";
import DragDialog from "../../common/DragDialog.vue";
import {useAssociationEditorGraphStore} from "../store/AssociationEditorGraphStore.ts";
import {GenTableColumnView} from "../../../api/__generated/model/static";
import {processClickFunction} from "../../../utils/clickTimer.ts";

const store = useAssociationEditorGraphStore()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const showSearch = ref(false)

/**
 * 根据关键词进行节点查找
 * @param graph 图
 * @param keywords 关键词
 * @returns 节点列表
 */
const searchTableNodes = (graph: Graph, keywords: string[]): Node[] => {
	if (keywords.length == 0) {
		return []
	}

	return graph.getNodes().filter(node => {
		if (node.data && node.data.table) {
			const table: GenTableColumnView = node.data.table
			for (const keyword of keywords) {
				if (table.name.includes(keyword) || table.comment.includes(keyword)) {
					return true
				}
			}
		}
	})
}

const search = () => {
	const graph = store._graph()

	if (keyword.value.trim().length > 0) {
		const keywords = keyword.value.split(" ")
		searchResult.value = searchTableNodes(graph, keywords)
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

const {
	click: handleSelectCell,
	dblClick: handleFocusCell
} = processClickFunction(
	(id: string) => {
		store.toggleSelect(id)
	},
	(id: string) => {
		store.focus(id)
	}
)
</script>

<template>
	<DragDialog v-if="showSearch" @close="showSearch = false; keyword = '';" :init-w="400" :y="50" to="#AssociationEditor" :can-drag="false">
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
					<el-button
						@click="handleSelectCell(node.id)"
						@dblclick="handleFocusCell(node.id)"
						size="default"
						link>
						{{ node.data.table.name }} {{ node.data.table.comment }}
					</el-button>
				</div>
			</div>
		</el-popover>
	</DragDialog>
</template>

<style scoped>

</style>