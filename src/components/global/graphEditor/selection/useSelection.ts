import {Graph, Node} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";
import {removeSelectedCells, removeSelectedEdges, selectAll} from "@/components/global/graphEditor/selection/selectOperation.ts";

export const useSelection = (graph: Graph) => {
    graph.use(
        new Selection({
            enabled: true,
            movable: true,
            rubberband: true,
            rubberEdge: true,
        })
    )

    graph.on('cell:selected', ({cell}) => {
        cell.toFront()
        if (cell.isNode()) {
            graph.getConnectedEdges(cell).forEach(edge => {
                edge.toFront()
            })
        }
    })
}

const normalMoveStep = 40
const smallMoveStep = 10

const getSelectNodes = (graph: Graph) => {
    if (!graph.isSelectionEmpty())
        return graph.getSelectedCells()
            .filter(cell => cell.isNode())
            .map(cell => <Node>cell)
}

export const handleSelectionKeyEvent = (graph: Graph) => {
    graph.bindKey(["ctrl+a", "command+a"], (e) => {
        e.preventDefault()
        selectAll(graph)
    })

    graph.bindKey(["delete", "backspace"], (e) => {
        e.preventDefault()
        removeSelectedCells(graph)
    })
    graph.bindKey(["shift+delete", "shift+backspace"], (e) => {
        e.preventDefault()
        removeSelectedEdges(graph)
    })

    graph.bindKey(["up"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - normalMoveStep})
        })
    })
    graph.bindKey(["ctrl+up"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y - smallMoveStep})
        })
    })

    graph.bindKey(["down"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + normalMoveStep})
        })
    })
    graph.bindKey(["ctrl+down"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x, y: node.position().y + smallMoveStep})
        })
    })

    graph.bindKey(["left"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x - normalMoveStep, y: node.position().y})
        })
    })
    graph.bindKey(["ctrl+left"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x - smallMoveStep, y: node.position().y})
        })
    })

    graph.bindKey(["right"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x + normalMoveStep, y: node.position().y})
        })
    })
    graph.bindKey(["ctrl+right"], () => {
        getSelectNodes(graph)?.forEach(node => {
            node.setPosition({x: node.position().x + smallMoveStep, y: node.position().y})
        })
    })
}
