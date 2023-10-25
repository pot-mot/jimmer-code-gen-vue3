import {Graph, Node, Edge} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";
import {onBeforeUnmount, onMounted} from "vue";
import {AssociationEditorGraphEventBus} from "../../../eventBus/AssociationEditorGraphEventBus.ts";
import {searchEdgesByNode} from "../edge/AssociationEdge.ts";

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

    graph.on("edge:dblclick", ({edge}) => {
        if (edge.getTargetCellId() != edge.getSourceCellId()) {
            graph.select(edge.getTargetCellId())
            graph.select(edge.getSourceCellId())
        } else {
            graph.select(edge.getTargetCellId())
        }
    })
}

const normalMoveStep = 40
const smallMoveStep = 10

export const useSelectionKeyEvent = (_graph: () => Graph) => {
    const handleKeyEvent = (e: KeyboardEvent) => {
        const graph = _graph()
        if (!graph) return

        if ((e.ctrlKey || e.metaKey) && e.key == 'a') {
            e.preventDefault()
            AssociationEditorGraphEventBus.emit('selectAll', {})
        }

        if (e.key == 'Delete') {
            if (e.shiftKey) {
                AssociationEditorGraphEventBus.emit('removeSelectedAssociations', {})
            } else {
                AssociationEditorGraphEventBus.emit('removeSelectedCells', {})
            }
        }


        if (!graph.isSelectionEmpty()) {
            const nodes= graph.getSelectedCells()
                .filter(cell => cell.isNode())
                .map(cell => <Node>cell)

            const size = e.ctrlKey ? smallMoveStep : normalMoveStep

            if (e.key == 'ArrowUp') {
                nodes.forEach(node => {
                    node.setPosition({x: node.position().x, y: node.position().y - size})
                })
            }
            if (e.key == 'ArrowDown') {
                nodes.forEach(node => {
                    node.setPosition({x: node.position().x, y: node.position().y + size})
                })
            }
            if (e.key == 'ArrowLeft') {
                nodes.forEach(node => {
                    node.setPosition({x: node.position().x - size, y: node.position().y})
                })
            }
            if (e.key == 'ArrowRight') {
                nodes.forEach(node => {
                    node.setPosition({x: node.position().x + size, y: node.position().y})
                })
            }
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
    const selectedNodes = getSelectedNodes(graph)
    const baseSelectedEdges = graph.getSelectedCells().filter(cell => cell.isEdge()).map(cell => cell as Edge)

    selectedNodes.forEach(node => {
        const selectEdges = searchEdgesByNode(graph, {
            targetNodeId: node.id,
            sourceNodeId: node.id,
            selectType: 'OR'
        })

        baseSelectedEdges.push(...selectEdges)
    })

    return baseSelectedEdges
}
