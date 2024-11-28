import type {Graph, Node, Edge} from "@antv/x6"
import {DeepReadonly} from "vue";

interface ForceNode {
    id: string,
    left: number,
    top: number,
    width: number,
    height: number,
    right: number,
    bottom: number,
    node: Node,
}

/**
 * 两节点是否重叠
 */
export const isOverlap = (
    node1: DeepReadonly<ForceNode>,
    node2: DeepReadonly<ForceNode>,
): boolean => {
    return !(node1.right <= node2.left ||
        node1.left >= node2.right ||
        node1.bottom <= node2.top ||
        node1.top >= node2.bottom)
}

/**
 * 根据两个节点间的边数量和距离设置x轴和y轴上的力，
 * 若节点重叠或横向和纵向间距小于gap，返回节点1对节点2的斥力，
 * 不然，返回节点1对节点2的拉力，
 * 力量大小随两个节点间的距离而定。
 */
export const getForce = (
    node1: DeepReadonly<ForceNode>,
    node2: DeepReadonly<ForceNode>,
    edgeCount: number,
    gapX: number,
    gapY: number
): {
    xForce: number,
    yForce: number,
} => {
    // 计算两个节点中心点的距离
    const dx = (node1.left + node1.width / 2) - (node2.left + node2.width / 2)
    const dy = (node1.top + node1.height / 2) - (node2.top + node2.height / 2)
    const distance = Math.sqrt(dx * dx + dy * dy)

    // 检查节点是否重叠或间距小于gap
    const isOverlappingOrTooClose = isOverlap(node1, node2) ||
        Math.abs(dx) < gapX ||
        Math.abs(dy) < gapY

    // 计算斥力或拉力
    let xForce: number
    let yForce: number

    if (isOverlappingOrTooClose) {
        // 斥力
        const repulsion = 11 * (edgeCount + 1) // 斥力常数
        xForce = dx / distance * repulsion
        yForce = dy / distance * repulsion
    } else {
        // 拉力
        const attraction = 10 * edgeCount
        xForce = -dx / distance * attraction
        yForce = -dy / distance * attraction
    }

    return {xForce, yForce}
}

const createForceNodes = (nodes: DeepReadonly<Array<Node>>): DeepReadonly<Array<ForceNode>> => {
    return nodes.map(node => {
        const {width, height} = node.getSize()
        const {x, y} = node.getPosition()

        return {
            id: node.id,
            left: x,
            top: y,
            width,
            height,
            right: x + width,
            bottom: y + height,
            node
        }
    })
}

const getEdgeCountMap = (
    edges: DeepReadonly<Array<Edge>>,
): Map<string, number> => {
    const map = new Map<string, number>()

    edges.forEach(edge => {
        const sourceId = edge.getSourceNode()?.id
        const targetId = edge.getTargetNode()?.id
        const key = `${sourceId} ${targetId}`

        const value = map.get(key)
        if (value === undefined) {
            map.set(key, 1)
        } else {
            map.set(key, value + 1)
        }
    })

    return map;
}

/**
 * 单次迭代
 */
const forceLayoutItem = (
    forceNodes: DeepReadonly<Array<ForceNode>>,
    edgeCountMap: DeepReadonly<Map<string, number>>,
    gapX: number,
    gapY: number,
): Array<ForceNode> => {
    const updatedNodes: Array<ForceNode> = forceNodes.map(node => {
        return {...node} as ForceNode
    })

    // 遍历所有节点对，计算力并更新位置
    for (let i = 0; i < forceNodes.length; i++) {
        for (let j = 0; j < forceNodes.length; j++) {
            if (i === j) continue

            const node1 = forceNodes[i]
            const node2 = forceNodes[j]

            const edgeKey = `${node1.id} ${node2.id}`
            const edgeCount = edgeCountMap.get(edgeKey) ?? 0

            const { xForce, yForce } = getForce(node1, node2, edgeCount, gapX, gapY)

            // 更新节点1的位置
            updatedNodes[i].left += xForce
            updatedNodes[i].top += yForce

            // 更新节点2的位置
            updatedNodes[j].left -= xForce
            updatedNodes[j].top -= yForce

            // 更新节点的right和bottom属性
            updatedNodes[i].right = updatedNodes[i].left + node1.width
            updatedNodes[i].bottom = updatedNodes[i].top + node1.height

            updatedNodes[j].right = updatedNodes[j].left + node2.width
            updatedNodes[j].bottom = updatedNodes[j].top + node2.height
        }
    }

    return updatedNodes
}

export const layoutByForce = (
    graph: Graph,
    iterationCount: number = 1,
    gapX: number = 200,
    gapY: number = 100
) => {
    const nodes = graph.getNodes()
    const edges = graph.getEdges()

    let forceNodes = createForceNodes(nodes)
    const edgeCountMap = getEdgeCountMap(edges)

    for (let i = 0; i < iterationCount; i ++) {
        forceNodes = forceLayoutItem(forceNodes, edgeCountMap, gapX, gapY)
    }

    forceNodes.forEach(node => {
        node.node.setPosition(node.left, node.top)
    })
}
