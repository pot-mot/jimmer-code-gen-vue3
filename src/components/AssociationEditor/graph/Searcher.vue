<script setup lang="ts">
import {focusNode, searchTableNodes} from "../node/TableNode.ts";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Node} from "@antv/x6";
import DragDialog from "../../common/DragDialog.vue";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";

const store = useAssociationEditorGraphStore()

const keyword = ref("")

const searchResult = ref<Node[]>([])

const showSearch = ref(false)

const search = () => {
	const graph = store._graph()
	if (!graph) return
	searchResult.value = searchTableNodes(graph, keyword.value.split(" "))
}

const handleSearchKeyDown = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 'f') {
			e.preventDefault()
			searchResult.value = []
			showSearch.value = true
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
	<DragDialog v-if="showSearch" @close="showSearch = false" :y="100" to="#AssociationEditor">
		<div>
			<el-input v-model="keyword" autofocus @keydown.enter="search">
				<template #append>
					<el-button @click="search">搜索</el-button>
				</template>
			</el-input>
			<div v-if="searchResult.length == 0">
				暂无数据
			</div>
			<div style="max-height: 60vh; overflow: auto; min-width: 20em;">
				<table>
					<tr v-for="node in searchResult"
						@click="focusNode(store._graph(), node as any)">
						<td>{{ node.data.table.name }}</td>
						<td>{{ node.data.table.comment }}</td>
					</tr>
				</table>
			</div>
		</div>
	</DragDialog>
</template>

<style scoped>

</style>