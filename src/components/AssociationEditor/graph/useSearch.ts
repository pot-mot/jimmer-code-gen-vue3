import {onBeforeUnmount, onMounted, ref} from "vue";
import {Graph, Node} from "@antv/x6";
import {searchTableNodes} from "../node/TableNode.ts";

export const useTableEditorSearch = (_graph: () => Graph) => {
    const keyword = ref("")

    const searchResult = ref<Node[]>([])

    const showSearch = ref(false)

    const search = () => {
        const graph = _graph()
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

    return {
        showSearch,
        keyword,
        searchResult,
        search
    }
}