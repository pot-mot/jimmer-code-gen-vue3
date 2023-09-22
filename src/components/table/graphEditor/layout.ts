import {Graph, Node, Edge} from "@antv/x6"
import {nodeIdToTableId} from "../node/TableNode.ts"
import {Point} from "@antv/x6-geometry"

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
    const result: LayoutEdge[] = []

    edges.forEach(edge => {
        const targetNode = edge.getTargetNode()
        const sourceNode = edge.getSourceNode()

        if (!targetNode || !sourceNode) return;

        const target = nodeIdToTableId(targetNode.id)
        const source = nodeIdToTableId(sourceNode.id)
        result.push({target, source})
    })

    return result
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
        const targetNode = nodeMap.get(target)
        const sourceNode = nodeMap.get(source)
        if (targetNode && sourceNode) {
            targetNode.children.push(sourceNode)
            sourceNode.outDegree ++
        }
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

const getPoint = (nodes: Node[], direction: "LT" | "RT" | "LB" | "RB" = "LT"): Point.PointLike => {
    return nodes.reduce((targetPoint, node) => {
        const current = node.getPosition()

        if (!targetPoint) {
            return current // 第一个点作为初始值
        }

        switch (direction) {
            case "LT":
                if (current.x < targetPoint.x || (current.x === targetPoint.x && current.y < targetPoint.y)) {
                    return current // 当前点比累积的点更左上，更新累积的点
                }
                break
            case "RT":
                if (current.x > targetPoint.x || (current.x === targetPoint.x && current.y < targetPoint.y)) {
                    return current // 当前点比累积的点更右上，更新累积的点
                }
                break
            case "LB":
                if (current.x < targetPoint.x || (current.x === targetPoint.x && current.y > targetPoint.y)) {
                    return current // 当前点比累积的点更左下，更新累积的点
                }
                break
            case "RB":
                if (current.x > targetPoint.x || (current.x === targetPoint.x && current.y > targetPoint.y)) {
                    return current // 当前点比累积的点更右下，更新累积的点
                }
                break
        }

        return targetPoint // 当前点不是目标位置的点，保持累积的点不变
    }, { x: 0, y: 0 })
}

const getMaxWidth = (nodes: Node[]): number => {
    return nodes.reduce((maxWidth, node) => {
        const width = node.getSize().width
        return Math.max(maxWidth, width)
    }, 0)
}

const getMaxHeight = (nodes: Node[]): number => {
    return nodes.reduce((maxHeight, node) => {
        const height = node.getSize().height
        return Math.max(maxHeight, height)
    }, 0)
}

const layoutLR = (nodeLevels: Node[][], startX: number = 0, startY: number = 0, gapX: number = 200, gapY: number = 100) => {
    let tempX = startX

    for (const nodes of nodeLevels) {
        const width = getMaxWidth(nodes)
        let tempY = startY

        for (const node of nodes) {
            node.setPosition({
                x: tempX,
                y: tempY,
            })

            tempY += node.getSize().height + gapY
        }

        tempX += width + gapX
    }
}

const layoutTB = (nodeLevels: Node[][], startX: number = 0, startY: number = 0, gapX: number = 200, gapY: number = 100) => {
    let tempY = startY

    for (const nodes of nodeLevels) {
        const height = getMaxHeight(nodes)
        let tempX = startX

        for (const node of nodes) {
            node.setPosition({
                x: tempX,
                y: tempY,
            })

            tempX += node.getSize().width + gapX
        }

        tempY += height + gapY
    }
}

const layoutRL = (nodeLevels: Node[][], startX: number = 0, startY: number = 0, gapX: number = 200, gapY: number = 100) => {
    layoutLR(nodeLevels.reverse(), startX, startY, gapX, gapY)
}

const layoutBT = (nodeLevels: Node[][], startX: number = 0, startY: number = 0, gapX: number = 200, gapY: number = 100) => {
    layoutTB(nodeLevels.reverse(), startX, startY, gapX, gapY)
}

export const byTreeLayout = (graph: Graph, direction: "LR" | "TB" | "RL" | "BT" = "LR") => {
    const nodes = graph.isSelectionEmpty() ? getLayoutNodes(graph.getNodes()) : getLayoutNodes(graph.getSelectedCells().filter(cell => cell.isNode()) as Node[])
    const edges = graph.isSelectionEmpty() ? getLayoutEdges(graph.getEdges()) : getLayoutEdges(graph.getSelectedCells().filter(cell => cell.isEdge()) as Edge[])

    setLevel(nodes, edges)

    const nodeLevels = groupByLevel(nodes)

    graph.startBatch('layout')

    const start: Point.PointLike = getPoint(nodes.map(node => node.node), "LT")

    switch (direction) {
        case "LR":
            layoutLR(nodeLevels, start.x, start.y)
            break
        case "RL":
            layoutRL(nodeLevels, start.x, start.y)
            break
        case "TB":
            layoutTB(nodeLevels, start.x, start.y)
            break
        case "BT":
            layoutBT(nodeLevels, start.x, start.y)
            break
    }

    graph.stopBatch('layout')
}