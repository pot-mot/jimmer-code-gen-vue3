import {Edge, Graph, Node} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_LINE_WIDTH,
    HIGHLIGHT_ASSOCIATION_LINE_WIDTH,
    COMMON_COLOR,
    HIGHLIGHT_COLOR,
    TABLE_NODE
} from "@/components/business/modelGraphEditor/constant.ts";
import {
    createBaseLabel,
    getAssociationTypeLabel
} from "@/components/business/modelGraphEditor/associationEdge/associationTypeLabels.ts";

const judgeNode = (node: Node) => {
    return node && node.shape == TABLE_NODE && node.getData()?.wrapper && node.getData()?.wrapper.value
}

const judgeEdge = (edge: Edge) => {
    return edge && edge.shape == ASSOCIATION_EDGE
}

const getWrapper = (node: Node): HTMLElement => {
    return node?.getData()?.wrapper?.value as HTMLElement
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

const edgeHover = (edge: Edge) => {
    if (judgeEdge(edge)) {
        edge.attr('line/strokeWidth', HIGHLIGHT_ASSOCIATION_LINE_WIDTH)

        const associationTypeLabel = getAssociationTypeLabel(edge)
        if (associationTypeLabel) {
            edge.setLabelAt(associationTypeLabel.index, createBaseLabel({
                fontWeight: 'bold'
            }, associationTypeLabel.label))
        }
    }
}

const edgeUnhover = (edge: Edge) => {
    if (judgeEdge(edge)) {
        edge.attr('line/strokeWidth', ASSOCIATION_LINE_WIDTH)

        const associationTypeLabel = getAssociationTypeLabel(edge)
        if (associationTypeLabel) {
            edge.setLabelAt(associationTypeLabel.index, createBaseLabel({
                fontWeight: 'normal'
            }, associationTypeLabel.label))
        }
    }
}

const edgeSelected = (edge: Edge) => {
    if (judgeEdge(edge)) {
        edge.attr('line/stroke', HIGHLIGHT_COLOR)

        const associationTypeLabel = getAssociationTypeLabel(edge)
        if (associationTypeLabel) {
            edge.setLabelAt(associationTypeLabel.index, createBaseLabel({
                fill: HIGHLIGHT_COLOR
            }, associationTypeLabel.label))
        }
    }
}

const edgeUnselected = (edge: Edge) => {
    if (judgeEdge(edge)) {
        edge.attr('line/stroke', COMMON_COLOR)

        const associationTypeLabel = getAssociationTypeLabel(edge)
        if (associationTypeLabel) {
            edge.setLabelAt(associationTypeLabel.index, createBaseLabel({
                fill: COMMON_COLOR
            }, associationTypeLabel.label))
        }
    }
}

const stopHistoryAction = (graph: Graph, fn: Function) => {
    graph.disableHistory()
    fn()
    graph.enableHistory()
}

export const useHoverToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        stopHistoryAction(graph, () => {
            cell.toFront()

            if (cell.isNode()) {
                graph.getConnectedEdges(cell).forEach(edge => {
                    edge.toFront()
                })
            }
        })
    })
}

export const useStyle = (graph: Graph) => {
    graph.on('node:selected', ({node}) => {
        stopHistoryAction(graph, () => nodeSelected(node))
    })
    graph.on('node:unselected', ({node}) => {
        stopHistoryAction(graph, () => nodeUnselected(node))
    })

    graph.on('node:mouseenter', ({node}) => {
        stopHistoryAction(graph, () => {
            nodeHover(node)

            const edges = graph.getConnectedEdges(node)
            edges.forEach(edge => edgeHover(edge))
        })
    })
    graph.on('node:mouseleave', ({node}) => {
        stopHistoryAction(graph, () => {
            nodeUnhover(node)

            const edges = graph.getConnectedEdges(node)
            edges.forEach(edge => edgeUnhover(edge))
        })
    })

    graph.on('node:added', ({node}) => {
        stopHistoryAction(graph, () => {
            nodeUnhover(node)
            nodeUnselected(node)
        })
    })

    graph.on('edge:selected', ({edge}) => {
        stopHistoryAction(graph, () => edgeSelected(edge))
    })
    graph.on('edge:unselected', ({edge}) => {
        stopHistoryAction(graph, () => edgeUnselected(edge))
    })

    graph.on('edge:mouseenter', ({edge}) => {
        stopHistoryAction(graph, () => {
            edgeHover(edge)

            const nodes = [edge.getSourceNode(), edge.getTargetNode()]
            nodes.forEach(node => {
                if (node) {
                    nodeHover(node)
                }
            })
        })
    })
    graph.on('edge:mouseleave', ({edge}) => {
        stopHistoryAction(graph, () => {
            edgeUnhover(edge)

            const nodes = [edge.getSourceNode(), edge.getTargetNode()]
            nodes.forEach(node => {
                if (node) {
                    nodeUnhover(node)
                }
            })
        })
    })

    graph.on('edge:added', ({edge}) => {
        stopHistoryAction(graph, () => {
            edgeUnhover(edge)
            edgeUnselected(edge)
        })
    })

    graph.on('node:removed', () => {
        stopHistoryAction(graph, () => unStyleAll(graph))
    })

    graph.on('edge:removed', () => {
        stopHistoryAction(graph, () => unStyleAll(graph))
    })
}

export const unStyleAll = (graph: Graph) => {
    stopHistoryAction(graph, () => {
        graph.cleanSelection()

        graph.getEdges().forEach(edge => {
            edgeUnhover(edge)
        })

        graph.getNodes().forEach(node => {
            nodeUnhover(node)
        })
    })
}
