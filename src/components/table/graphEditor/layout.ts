import {Graph} from "@antv/x6"
import {nodeIdToTableId} from "../node/TableNode.ts";

interface LayoutNode {
    id: number;
    level: number;
    visited: boolean;
    outDegree: number;
    children: LayoutNode[];
}

interface LayoutEdge {
    target: number,
    source: number,
}

export const layout = (graph: Graph) => {
    const nodes: LayoutNode[] = graph.getNodes().map(node => {
        return {
            id: nodeIdToTableId(node.id),
            level: 0,
            visited: false,
            outDegree: 0,
            children: []
        }
    })

    const edges: LayoutEdge[] = graph.getEdges().map(edge => {
        const target = nodeIdToTableId(edge.getTargetNode()!.id)
        const source = nodeIdToTableId(edge.getSourceNode()!.id)
        return {target, source}
    })

    const nodeMap: Map<number, LayoutNode> = new Map()

    const bfs = (root: LayoutNode) => {
        let curLevel = 1
        let fa: LayoutNode[] = [root]
        let son: LayoutNode[] = []

        while (fa.length > 0) {
            const p = fa.shift()!
            p.level = curLevel

            for (const child of p.children) {
                if (!child.visited) {
                    child.visited = true
                    son.push(child)
                }
            }

            if (fa.length === 0) {
                curLevel++
                fa = son
                son = []
            }
        }
    }

    for (const node of nodes) {
        nodeMap.set(node.id, node)
    }

    for (const {source, target} of edges) {
        const targetNode = nodeMap.get(target)!
        const sourceNode = nodeMap.get(source)!
        targetNode.children.push(sourceNode)
        sourceNode.outDegree ++
    }

    for (const node of nodeMap.values()) {
        if (!node.visited) {
            bfs(node)
        }
    }

    console.log(nodes)
    console.log(edges)
    console.log(nodeMap.values())
}