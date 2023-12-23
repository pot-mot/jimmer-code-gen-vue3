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

export const useHoverToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        cell.toFront()
        if (cell.isNode()) {
            graph.getConnectedEdges(cell).forEach(edge => {
                edge.toFront()
            })
        }
    })
}

const judgeNode = (node: Node) => {
    return node && node.shape == TABLE_NODE && node.getData().wrapper && node.getData().wrapper.value
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

export const useStyle = (graph: Graph) => {
    graph.on('node:selected', ({node}) => {
        nodeSelected(node)
    })
    graph.on('node:unselected', ({node}) => {
        nodeUnselected(node)
    })

    graph.on('node:mouseenter', ({node}) => {
        nodeHover(node)

        const edges = graph.getConnectedEdges(node)
        edges.forEach(edge => edgeHover(edge))
    })
    graph.on('node:mouseleave', ({node}) => {
        nodeUnhover(node)

        const edges = graph.getConnectedEdges(node)
        edges.forEach(edge => edgeUnhover(edge))
    })

    graph.on('node:added', ({node}) => {
        nodeUnhover(node)
        nodeUnselected(node)
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
        nodes.forEach(node => {if (node) {nodeHover(node)}})
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edgeUnhover(edge)

        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(node => {if (node) {nodeUnhover(node)}})
    })

    graph.on('edge:added', ({edge}) => {
        edgeUnhover(edge)
        edgeUnselected(edge)
    })

    graph.on('node:removed', () => {
        unStyleAll(graph)
    })

    graph.on('edge:removed', () => {
        unStyleAll(graph)
    })
}

export const unStyleAll = (graph: Graph) => {
    graph.cleanSelection()

    graph.getEdges().forEach(edge => {
        edgeUnhover(edge)
    })

    graph.getNodes().forEach(node => {
        nodeUnhover(node)
    })
}
