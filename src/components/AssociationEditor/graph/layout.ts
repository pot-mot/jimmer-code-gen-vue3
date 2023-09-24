import { Graph, Node, Edge } from "@antv/x6"
import { nodeIdToTableId } from "../node/TableNode.ts"
import { Point } from "@antv/x6-geometry"

interface LayoutNode {
    id: number
    level: number
    visited: boolean
    inDegree: number
    outDegree: number
    children: LayoutNode[]
    node: Node
}

interface LayoutEdge {
    target: number
    source: number
}

/**
 * 从节点转换为简化数据的布局节点
 * @param nodes 节点
 * @returns 布局节点
 */
const toLayoutNodes = (nodes: readonly Node[]): LayoutNode[] => {
    return nodes.map(node => {
        return {
            id: nodeIdToTableId(node.id),
            level: 0,
            visited: false,
            inDegree: 0,
            outDegree: 0,
            children: [],
            node,
        }
    })
}

/**
 * 从边中提取布局边
 * @param edges 边
 * @returns 布局边
 */
const toLayoutEdges = (edges: readonly Edge[]): LayoutEdge[] => {
    const result: LayoutEdge[] = []

    edges.forEach(edge => {
        const targetNode = edge.getTargetNode()
        const sourceNode = edge.getSourceNode()

        if (!targetNode || !sourceNode) return;

        const target = nodeIdToTableId(targetNode.id)
        const source = nodeIdToTableId(sourceNode.id)
        result.push({ target, source })
    })

    return result
}

/**
 * 根据从顺序第一个节点开始进行 bfs 生成森林，为节点设置 level 
 * @param nodes 布局节点
 * @param edges 布局边
 */
const setLevel = (nodes: LayoutNode[], edges: readonly LayoutEdge[]) => {
    const nodeMap: Map<number, LayoutNode> = new Map()

    /**
     * 对树进行广度优先搜索，并给节点设置层级信息
     * @param root 根节点
     */
    const bfs = (root: LayoutNode) => {
        let currentLevel = 1
        let currentLevelNodes: LayoutNode[] = [root]
        let nextLevelNodes: LayoutNode[] = []

        while (currentLevelNodes.length > 0) {
            const currentNode = currentLevelNodes.shift()!
            currentNode.level = currentLevel

            for (const child of currentNode.children) {
                if (!child.visited) {
                    child.visited = true
                    nextLevelNodes.push(child)
                }
            }

            if (currentLevelNodes.length === 0) {
                currentLevel++
                currentLevelNodes = nextLevelNodes
                nextLevelNodes = []
            }
        }
    }

    for (const node of nodes) {
        nodeMap.set(node.id, node)
    }

    for (const { source, target } of edges) {
        const targetNode = nodeMap.get(target)
        const sourceNode = nodeMap.get(source)
        if (targetNode && sourceNode) {
            targetNode.children.push(sourceNode)
            sourceNode.outDegree++
            targetNode.inDegree++
        }
    }

    for (const node of nodeMap.values()) {
        if (!node.visited) {
            bfs(node)
        }
    }
}

/**
 * 均分数组
 * @param array 待分割的数组
 * @param chunkSize 每个部分的大小
 * @returns 均分成多个部分的二维数组
 */
const splitArrayIntoChunks = <T>(
    array: T[], 
    chunkSize: number = Math.ceil(Math.sqrt(array.length))
): T[][] => {
    const chunks: T[][] = [];
    const length = array.length;
    let index = 0;

    while (index < length) {
        chunks.push(array.slice(index, index + chunkSize));
        index += chunkSize;
    }

    return chunks;
}

/**
 * 将布局节点根据 level 大小进行分组，同时根据子节点数量进行排序（将子节点更多的靠前放置），最终返回节点的二维数组
 * 没有入度出度的节点将位于最后
 * @param nodes 布局节点
 * @returns 节点的二维数组，其中每一个一维数组表示节点层
 */
const groupByLevel = (nodes: readonly LayoutNode[]): Node[][] => {
    const levelMap = new Map<number, LayoutNode[]>()

    const unrelatedNodes: Node[] = []

    nodes.forEach(node => {
        if (node.inDegree == 0 && node.outDegree == 0) {
            unrelatedNodes.push(node.node)
            return
        }

        const levelList = levelMap.get(node.level)
        if (levelList) {
            levelList.push(node)
        } else {
            levelMap.set(node.level, [node])
        }
    })

    const result: Node[][] = []

    const keys: number[] = [...levelMap.keys()].sort()

    keys.forEach(key => {
        result.push(
            levelMap.get(key)!
                .sort((a, b) => b.children.length - a.children.length)
                .map(node => node.node)
        )
    })

    result.push(...splitArrayIntoChunks(unrelatedNodes))

    return result
}

/**
 * 获取节点中的端点位置
 * @param nodes 节点
 * @param direction 位置，左上/右上/左下/右下
 * @returns 端点
 */
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

interface LayoutOptions {
    startX: number
    startY: number
    gapX: number
    gapY: number
}

interface LevelLayoutOptions extends LayoutOptions {
    nodeLevels: Node[][]
}

const defaultLayoutOptions: LayoutOptions = {
    startX: 0,
    startY: 0,
    gapX: 200,
    gapY: 100,
}

const layoutLR = (options: Partial<LevelLayoutOptions>) => {
    const { nodeLevels, startX, startY, gapX, gapY } = Object.assign(defaultLayoutOptions, options)

    if (!nodeLevels) return

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

const layoutTB = (options: Partial<LevelLayoutOptions>) => {
    const { nodeLevels, startX, startY, gapX, gapY } = Object.assign(defaultLayoutOptions, options)

    if (!nodeLevels) return

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

const layoutRL = (options: Partial<LevelLayoutOptions>) => {
    if (options.nodeLevels) options.nodeLevels.reverse()
    layoutLR(options)
}

const layoutBT = (options: Partial<LevelLayoutOptions>) => {
    if (options.nodeLevels) options.nodeLevels.reverse()
    layoutTB(options)
}

/**
 * 根据层级进行布局
 * @param graph 图
 * @param direction 方向，此处是指层级的排布方向，左右/上下/右左/下上
 * @param gapX 水平排布间距
 * @param gapY 垂直排布间距
 */
export const layoutByLevels = (
    graph: Graph, 
    direction: "LR" | "TB" | "RL" | "BT" = "LR", 
    gapX: number = 200, 
    gapY: number = 100
) => {
    let nodes
    let edges

    if (graph.isSelectionEmpty() || graph.getSelectedCellCount() == 1) {
        nodes = toLayoutNodes(graph.getNodes())
        edges = toLayoutEdges(graph.getEdges())
    } else {
        nodes = toLayoutNodes(graph.getSelectedCells().filter(cell => cell.isNode()) as Node[])
        edges = toLayoutEdges(graph.getSelectedCells().filter(cell => cell.isEdge()) as Edge[])
    }

    setLevel(nodes, edges)

    const nodeLevels = groupByLevel(nodes)

    graph.startBatch('layout')

    const { x: startX, y: startY } = getPoint(nodes.map(node => node.node), "LT")

    const options: LevelLayoutOptions = {
        nodeLevels,
        startX,
        startY,
        gapX,
        gapY
    }

    switch (direction) {
        case "LR":
            layoutLR(options)
            break
        case "RL":
            layoutRL(options)
            break
        case "TB":
            layoutTB(options)
            break
        case "BT":
            layoutBT(options)
            break
    }

    graph.stopBatch('layout')
}