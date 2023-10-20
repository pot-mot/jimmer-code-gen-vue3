import {Graph, Node, Edge} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";
import {onBeforeUnmount, onMounted} from "vue";

export const useSelection = (graph: Graph) => {
    graph.use(
        new Selection({
            enabled: true,
            movable: true,
            rubberband: true,
            rubberEdge: true,
        })
    )

    graph.on("cell:selected", ({cell}) => {
        cell.toFront()
        if (cell.isNode()) {
            graph.getConnectedEdges(cell).forEach(edge => {
                edge.toFront()
            })
        }
    })
}

export const useSelectionKeyEvent = (_graph: () => Graph) => {
    const handleKeyEvent = (e: KeyboardEvent) => {
        const graph = _graph()
        if (!graph) return

        if (e.ctrlKey || e.metaKey) {
            if (e.key == 'a') {
                e.preventDefault()
                graph.resetSelection(graph.getCells())
            }
        }

        if (e.key === 'Delete') {
            const selectedCells = graph.getSelectedCells()
            graph.cleanSelection()
            graph.removeCells(selectedCells)
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })
}

export const getSelectedNodes = (graph: Graph): Node[] => {
    return graph.getSelectedCells().filter(cell => cell.isNode()).map(cell => cell as Node)
}

export const getSelectedEdges = (graph: Graph): Edge[] => {
    return graph.getSelectedCells().filter(cell => cell.isEdge()).map(cell => cell as Edge)
}
