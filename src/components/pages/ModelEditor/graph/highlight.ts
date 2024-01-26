import {Edge, Graph, Node, Cell} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    TABLE_NODE
} from "@/components/business/modelEditor/constant.ts";


const SELECT_CLASS = "selected"

const HOVER_CLASS = "hovered"

const STATE_CLASSES = [SELECT_CLASS, HOVER_CLASS]

const judgeNode = (node: Node) => {
    return node && node.shape == TABLE_NODE && node.getData()?.wrapper && node.getData()?.wrapper.value
}

const judgeEdge = (edge: Edge) => {
    return edge && edge.shape == ASSOCIATION_EDGE
}

const getElements = (cellId: string): NodeListOf<HTMLElement> => {
    return document.documentElement.querySelectorAll(`[data-cell-id='${cellId}']`)
}

const nodeHover = (node: Node) => {
    if (judgeNode(node)) {
        getElements(node.id).forEach(it => it.classList.add(HOVER_CLASS))
    }
}

const nodeUnhover = (node: Node) => {
    if (judgeNode(node)) {
        getElements(node.id).forEach(it => it.classList.remove(HOVER_CLASS))
    }
}

const nodeSelected = (node: Node) => {
    if (judgeNode(node)) {
        getElements(node.id).forEach(it => it.classList.add(SELECT_CLASS))
    }
}

const nodeUnselected = (node: Node) => {
    if (judgeNode(node)) {
        getElements(node.id).forEach(it => it.classList.remove(SELECT_CLASS))
    }
}

const edgeHover = (edge: Edge) => {
    if (judgeEdge(edge)) {
        getElements(edge.id).forEach(it => it.classList.add(HOVER_CLASS))
    }
}

const edgeUnhover = (edge: Edge) => {
    if (judgeEdge(edge)) {
        getElements(edge.id).forEach(it => it.classList.remove(HOVER_CLASS))
    }
}

const edgeSelected = (edge: Edge) => {
    if (judgeEdge(edge)) {
        getElements(edge.id).forEach(it => it.classList.add(SELECT_CLASS))
    }
}

const edgeUnselected = (edge: Edge) => {
    if (judgeEdge(edge)) {
        getElements(edge.id).forEach(it => it.classList.remove(SELECT_CLASS))
    }
}

export const unHoverAll = (graph: Graph) => {
    for (let edge of graph.getEdges()) {
        edgeUnhover(edge)
    }

    for (let node of graph.getNodes()) {
        nodeUnhover(node)
    }
}

export const unStyleAll = (graph: Graph) => {
    graph.disableHistory()
    graph.cleanSelection()
    unHoverAll(graph)
    graph.enableHistory()
}

const toFront = (cell: Cell, graph: Graph) => {
    graph.disableHistory()
    cell.toFront()
    if (cell.isNode()) {
        for (let edge of graph.getConnectedEdges(cell)) {
            edge.toFront()
        }
    }
    graph.enableHistory()
}

export const useInteractionToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        toFront(cell, graph)
    })

    graph.on('cell:selected', ({cell}) => {
        toFront(cell, graph)
    })
}

export const useStyle = (graph: Graph) => {
    graph.on('node:added', ({node}) => {
        nodeUnhover(node)
        nodeUnselected(node)
    })

    graph.on('node:selected', ({node}) => {
        nodeSelected(node)
    })
    graph.on('node:unselected', ({node}) => {
        nodeUnselected(node)
    })

    graph.on('node:mouseenter', ({node}) => {
        nodeHover(node)
        for (let edge of graph.getConnectedEdges(node)) {
            edgeHover(edge)
        }
    })
    graph.on('node:mouseleave', ({node}) => {
        nodeUnhover(node)
        for (let edge of graph.getConnectedEdges(node)) {
            edgeUnhover(edge)
        }
    })

    graph.on('edge:added', ({edge}) => {
        edgeUnhover(edge)
        edgeUnselected(edge)
    })

    graph.on('edge:selected', ({edge}) => {
        edgeSelected(edge)
    })
    graph.on('edge:unselected', ({edge}) => {
        edgeUnselected(edge)
    })

    graph.on('edge:mouseenter', ({edge}) => {
        edgeHover(edge)
        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(node => {
            if (node) {
                nodeHover(node)
            }
        })
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edgeUnhover(edge)
        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(node => {
            if (node) {
                nodeUnhover(node)
            }
        })
    })

    // 将 edge 的样式状态同步到 tools
    graph.on('edge:change:tools', ({edge}) => {
        const edgeElement = document.documentElement.querySelector(`[data-cell-id='${edge.id}'].x6-edge`)

        if (edgeElement) {
            setTimeout(() => {
                STATE_CLASSES.forEach(stateClass => {
                    if (edgeElement.classList.contains(stateClass)) {
                        getElements(edge.id).forEach(it => it.classList.add(stateClass))
                    }
                })
            }, (edge.getTools()?.items.length ?? 0) * 40)
        }
    })
}
