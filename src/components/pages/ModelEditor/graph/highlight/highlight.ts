import {Edge, Graph, Node} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_LINE_WIDTH,
    HIGHLIGHT_ASSOCIATION_LINE_WIDTH,
    COMMON_COLOR,
    HIGHLIGHT_COLOR,
    TABLE_NODE
} from "@/components/business/modelEditor/constant.ts";
import {setAssociationTypeButton} from "@/components/pages/ModelEditor/graph/associationEdge/associationTypeButton.ts";

const stopHistoryAction = (graph: Graph, fn: Function) => {
    graph.disableHistory()
    fn()
    graph.enableHistory()
}

const judgeNode = (node: Node) => {
    return node && node.shape == TABLE_NODE && node.getData()?.wrapper && node.getData()?.wrapper.value
}

const judgeEdge = (edge: Edge) => {
    return edge && edge.shape == ASSOCIATION_EDGE
}

const getWrapper = (node: Node): HTMLElement | undefined => {
    return node.getData()?.wrapper?.value as HTMLElement | undefined
}

const nodeHover = (node: Node) => {
    if (judgeNode(node)) {
        getWrapper(node)?.classList.add('hovered')
    }
}

const nodeUnhover = (node: Node) => {
    if (judgeNode(node)) {
        getWrapper(node)?.classList.remove('hovered')
    }
}

const nodeSelected = (node: Node) => {
    if (judgeNode(node)) {
        getWrapper(node)?.classList.add('selected')
    }
}

const nodeUnselected = (node: Node) => {
    if (judgeNode(node)) {
        getWrapper(node)?.classList.remove('selected')
    }
}

const edgeHover = (edge: Edge, graph: Graph) => {
    if (judgeEdge(edge)) {
        stopHistoryAction(graph, () => {
            edge.attr('line/strokeWidth', HIGHLIGHT_ASSOCIATION_LINE_WIDTH)
            setAssociationTypeButton(edge, graph, {hover: true})
        })
    }
}

const edgeUnhover = (edge: Edge, graph: Graph) => {
    if (judgeEdge(edge)) {
        stopHistoryAction(graph, () => {
            edge.attr('line/strokeWidth', ASSOCIATION_LINE_WIDTH)
            setAssociationTypeButton(edge, graph, {hover: false})
        })
    }
}

const edgeSelected = (edge: Edge, graph: Graph) => {
    if (judgeEdge(edge)) {
        stopHistoryAction(graph, () => {
            edge.attr('line/stroke', HIGHLIGHT_COLOR)
            setAssociationTypeButton(edge, graph, {select: true})
        })
    }
}

const edgeUnselected = (edge: Edge, graph: Graph) => {
    if (judgeEdge(edge)) {
        stopHistoryAction(graph, () => {
            edge.attr('line/stroke', COMMON_COLOR)
            setAssociationTypeButton(edge, graph, {select: false})
        })
    }
}

export const unHoverAll = (graph: Graph) => {
    for (let edge of graph.getEdges()) {
        edgeUnhover(edge, graph)
    }

    for (let node of graph.getNodes()) {
        nodeUnhover(node)
    }
}

export const unStyleAll = (graph: Graph) => {
    stopHistoryAction(graph, () => {
        graph.cleanSelection()
    })
    unHoverAll(graph)

}

export const useHoverToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        stopHistoryAction(graph, () => {
            cell.toFront()

            if (cell.isNode()) {
                for (let edge of graph.getConnectedEdges(cell)) {
                    edge.toFront()
                }
            }
        })
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
        unHoverAll(graph)

        nodeHover(node)
        for (let edge of graph.getConnectedEdges(node)) {
            edgeHover(edge, graph)
        }
    })
    graph.on('node:mouseleave', ({node}) => {
        nodeUnhover(node)
        for (let edge of graph.getConnectedEdges(node)) {
            edgeUnhover(edge, graph)
        }
    })

    graph.on('edge:added', ({edge}) => {
        edgeUnhover(edge, graph)
        edgeUnselected(edge, graph)
    })

    graph.on('edge:selected', ({edge}) => {
        edgeSelected(edge, graph)
    })
    graph.on('edge:unselected', ({edge}) => {
        edgeUnselected(edge, graph)
    })

    graph.on('edge:mouseenter', ({edge}) => {
        unHoverAll(graph)

        edgeHover(edge, graph)
        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(node => {
            if (node) {
                nodeHover(node)
            }
        })
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edgeUnhover(edge, graph)
        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(node => {
            if (node) {
                nodeUnhover(node)
            }
        })
    })

    graph.on('node:removed', () => {
        unStyleAll(graph)
    })

    graph.on('edge:removed', () => {
        unStyleAll(graph)
    })
}
