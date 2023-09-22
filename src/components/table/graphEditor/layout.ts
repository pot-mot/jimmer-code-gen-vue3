import {Graph, Node, Edge} from "@antv/x6"
import {nodeIdToTableId} from "../node/TableNode.ts";

interface LayoutNode {
    id: number
    level: number
    visited: boolean
    outDegree: number
    children: LayoutNode[]
    node: Node
}

interface LayoutEdge {
    target: number
    source: number
}

const getLayoutNodes = (nodes: Node[]): LayoutNode[] => {
    return nodes.map(node => {
        return {
            id: nodeIdToTableId(node.id),
            level: 0,
            visited: false,
            outDegree: 0,
            children: [],
            node,
        }
    })
}

const getLayoutEdges = (edges: Edge[]): LayoutEdge[] => {
    return edges.map(edge => {
        const target = nodeIdToTableId(edge.getTargetNode()!.id)
        const source = nodeIdToTableId(edge.getSourceNode()!.id)
        return {target, source}
    })
}

const setLevel = (nodes: LayoutNode[], edges: LayoutEdge[]) => {
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
}

const groupByLevel = (nodes: LayoutNode[]): Node[][] => {
    const levelMap = new Map<number, Node[]>()

    nodes.forEach(node => {
        const levelList = levelMap.get(node.level)
        if (levelList) {
            levelList.push(node.node)
        } else {
            levelMap.set(node.level, [node.node])
        }
    })

    const result: Node[][] = []

    const keys: number[] = [...levelMap.keys()].sort()

    keys.forEach(key => {
        result.push(levelMap.get(key)!)
    })

    return result
}

const getMaxWidth = (nodes: Node[]): number => {
    let max = 0
    nodes.forEach(node => {
        const width = node.getSize().width
        if (width > max) max = width
    })
    return max
}

const getMaxHeight = (nodes: Node[]): number => {
    let max = 0
    nodes.forEach(node => {
        const height = node.getSize().height
        if (height > max) max = height
    })
    return max
}

const layoutLR = (nodeLevels: Node[][], gapX: number = 200, gapY: number = 100) => {
    let tempX = gapX
    nodeLevels.forEach(nodes => {
        const width = getMaxWidth(nodes)
        let tempY = gapY
        nodes.forEach(node => {
            node.setPosition({
                x: tempX,
                y: tempY,
            })
            tempY += node.getSize().height + gapY
        })
        tempX += width + gapX
    })
}

const layoutTB = (nodeLevels: Node[][], gapX: number = 200, gapY: number = 100) => {
    let tempY = gapY
    nodeLevels.forEach(nodes => {
        const height = getMaxHeight(nodes)
        let tempX = gapX
        nodes.forEach(node => {
            node.setPosition({
                x: tempX,
                y: tempY,
            })
            tempX += node.getSize().width + gapX
        })
        tempY += height + gapY
    })
}

const layoutRL = (nodeLevels: Node[][], gapX: number = 200, gapY: number = 100) => {
    layoutLR(nodeLevels.reverse(), gapX, gapY)
}

const layoutBT = (nodeLevels: Node[][], gapX: number = 200, gapY: number = 100) => {
    layoutTB(nodeLevels.reverse(), gapX, gapY)
}


export const byTreeLayout = (graph: Graph, direction: "LR" | "TB" | "RL" | "BT" = "BT") => {
    const nodes = graph.isSelectionEmpty() ? getLayoutNodes(graph.getNodes()) : getLayoutNodes(graph.getSelectedCells().filter(cell => cell.isNode()) as Node[])
    const edges = graph.isSelectionEmpty() ? getLayoutEdges(graph.getEdges()) : getLayoutEdges(graph.getSelectedCells().filter(cell => cell.isEdge()) as Edge[])

    setLevel(nodes, edges)

    const nodeLevels = groupByLevel(nodes)

    if (direction == 'LR') layoutLR(nodeLevels)
    else if (direction == 'TB') layoutTB(nodeLevels)
    else if (direction == 'RL') layoutRL(nodeLevels)
    else if (direction == 'BT') layoutBT(nodeLevels)
}