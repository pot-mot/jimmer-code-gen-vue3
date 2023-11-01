import {Graph, Edge, Node} from "@antv/x6";
import {COMMON_COLOR, HIGHLIGHT_COLOR} from "../../components/AssociationEditor/constant.ts";

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

const nodeHover = (node: Node) => {
    (node.getData().wrapper.value as HTMLElement).classList.add('hovered')
}

const nodeUnhover = (node: Node) => {
    (node.getData().wrapper.value as HTMLElement).classList.remove('hovered')
}

const nodeSelected = (node: Node) => {
    (node.getData().wrapper.value as HTMLElement).classList.add('selected')
}

const nodeUnselected = (node: Node) => {
    (node.getData().wrapper.value as HTMLElement).classList.remove('selected')
}

const edgeHover = (edge: Edge) => {
    edge.attr('line/strokeWidth', 3)
}

const edgeUnhover = (edge: Edge) => {
    edge.attr('line/strokeWidth', 1)
}

const edgeSelected = (edge: Edge) => {
    edge.attr('line/stroke', HIGHLIGHT_COLOR)
}

const edgeUnselected = (edge: Edge) => {
    edge.attr('line/stroke', COMMON_COLOR)
}

export const useNodeStyle = (graph: Graph) => {
    graph.on('node:selected', ({node}) => {
        nodeSelected(node)
    })
    graph.on('node:unselected', ({node}) => {
        nodeUnselected(node)
    })

    graph.on('node:mouseenter', ({node}) => {
        nodeHover(node)

        const edges = graph.getConnectedEdges(node)
        edges.forEach(it => edgeHover(it))
    })
    graph.on('node:mouseleave', ({node}) => {
        nodeUnhover(node)

        const edges = graph.getConnectedEdges(node)
        edges.forEach(it => edgeUnhover(it))
    })

    graph.on('node:added', ({node}) => {
        nodeUnhover(node)
        nodeUnselected(node)
    })
}

export const useEdgeStyle = (graph: Graph) => {
    graph.on('edge:selected', ({edge}) => {
        edgeSelected(edge)
    })
    graph.on('edge:unselected', ({edge}) => {
        edgeUnselected(edge)
    })
    graph.on('edge:mouseenter', ({edge}) => {
        edgeHover(edge)

        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(it => {
            if (it) nodeHover(it)
        })
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edgeUnhover(edge)

        const nodes = [edge.getSourceNode(), edge.getTargetNode()]
        nodes.forEach(it => {
            if (it) nodeUnhover(it)
        })
    })

    graph.on('edge:added', ({edge}) => {
        edgeUnhover(edge)
        edgeUnselected(edge)
    })
}