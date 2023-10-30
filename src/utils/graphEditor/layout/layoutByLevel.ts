import {Edge, Graph, Node} from "@antv/x6"
import {getSelectedEdges, getSelectedNodes} from "../selection/selectOperation.ts";
import {max, min} from "lodash";

export type LayoutDirection = "LR" | "TB" | "RL" | "BT"

interface LayoutNode {
    id: string
    level: number
    visited: boolean
    inDegree: number
    outDegree: number
    children: LayoutNode[]
    node: Node
}

interface LayoutEdge {
    target: string
    source: string
}

/**
 * 从节点转换为简化数据的布局节点
 * @param nodes 节点
 * @returns 布局节点
 */
const toLayoutNodes = (nodes: readonly Node[]): LayoutNode[] => {
    return nodes.map(node => {
        return {
            id: node.id,
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

        const target = targetNode.id
        const source = sourceNode.id
        result.push({target, source})
    })

    return result
}

/**
 * 根据从顺序第一个节点开始进行 bfs 生成森林，为节点设置 level
 * @param nodes 布局节点
 * @param edges 布局边
 */
const setLevel = (nodes: LayoutNode[], edges: readonly LayoutEdge[]) => {
    const nodeMap: Map<string, LayoutNode> = new Map()

    for (const node of nodes) {
        nodeMap.set(node.id, node)
    }

    // 设置入度和出度，并设置 children
    for (const {source, target} of edges) {
        const targetNode = nodeMap.get(target)
        const sourceNode = nodeMap.get(source)
        if (targetNode && sourceNode) {
            sourceNode.outDegree++
            targetNode.inDegree++
            targetNode.children.push(sourceNode)
        }
    }

    /**
     * 广度优先搜索，给节点设置层级信息
     * @param root 根节点
     */
    const bfs = (root: LayoutNode) => {
        let currentLevel = 1
        let currentLevelNodes: LayoutNode[] = [root]
        let nextLevelNodes: LayoutNode[] = []

        while (currentLevelNodes.length > 0) {
            const currentNode = currentLevelNodes.shift()!
            currentNode.level = currentLevel
            currentNode.visited = true

            for (const child of currentNode.children) {
                if (!child.visited) {
                    child.visited = true
                    nextLevelNodes.push(child)
                }
            }

            if (currentLevelNodes.length == 0) {
                currentLevel++
                currentLevelNodes = nextLevelNodes
                nextLevelNodes = []
            }
        }
    }

    nodes.sort((node1, node2) => node1.outDegree - node2.outDegree)

    for (const node of nodes) {
        if (!node.visited) {
            bfs(node)
        }
    }

    for (const node of nodes) {
        if (node.inDegree != 0 && node.outDegree == 0) {
            node.level = 0
        }

        for (const child of node.children) {
            if (child.level <= node.level) {
                child.level = node.level + 1
            }
        }
    }
}

/**
 * 均分数组（用来形成接近正方形的图像）
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
const getRanks = (nodes: readonly LayoutNode[]): Node[][] => {
    const rankMap = new Map<number, LayoutNode[]>()

    const setByRank = (node: LayoutNode) => {
        const rank = rankMap.get(node.level)
        if (rank) {
            rank.push(node)
        } else {
            rankMap.set(node.level, [node])
        }
    }

    const unrelatedNodes: Node[] = []

    nodes.forEach(node => {
        // 出入度均为 0 即无关联点，在其他点后作为额外 level 进行布局
        if (node.inDegree == 0 && node.outDegree == 0) {
            unrelatedNodes.push(node.node)
            return
        }
        setByRank(node)
    })

    const result: Node[][] = []

    const keys: number[] = [...rankMap.keys()].sort()

    keys.forEach(key => {
        result.push(
            rankMap.get(key)!
                .map(node => node.node)
        )
    })

    result.push(...splitArrayIntoChunks(unrelatedNodes))

    return result
}

export const getLeft = (nodes: Node[]): number | undefined => {
    return min(nodes.map(node => node.getPosition().x))
}

export const getRight = (nodes: Node[]): number | undefined => {
    return max(nodes.map(node => node.getPosition().x + node.getSize().width))
}

export const getTop = (nodes: Node[]): number | undefined => {
    return min(nodes.map(node => node.getPosition().y))
}

export const getBottom = (nodes: Node[]): number | undefined => {
    return max(nodes.map(node => node.getPosition().y + node.getSize().height))
}

const getMaxWidth = (nodes: Node[]): number | undefined => {
    return max(nodes.map(node => node.getSize().width))
}

const getMaxHeight = (nodes: Node[]): number | undefined => {
    return max(nodes.map(node => node.getSize().height))
}

interface LayoutOptions {
    startX: number
    startY: number
    gapX: number
    gapY: number
}

interface LevelLayoutOptions extends LayoutOptions {
    nodeRanks: Node[][]
}

const defaultLayoutOptions: LayoutOptions = {
    startX: 0,
    startY: 0,
    gapX: 200,
    gapY: 100,
}

const layoutLR = (options: Partial<LevelLayoutOptions>) => {
    const {nodeRanks, startX, startY, gapX, gapY} = Object.assign(defaultLayoutOptions, options)

    if (!nodeRanks) return

    let tempX = startX

    for (const nodes of nodeRanks) {
        if (nodes.length == 0) continue

        const width = getMaxWidth(nodes)!
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
    const {nodeRanks, startX, startY, gapX, gapY} = Object.assign(defaultLayoutOptions, options)

    if (!nodeRanks) return

    let tempY = startY

    for (const nodes of nodeRanks) {
        if (nodes.length == 0) continue

        const height = getMaxHeight(nodes)!
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
    if (options.nodeRanks) options.nodeRanks.reverse()
    layoutLR(options)
}

const layoutBT = (options: Partial<LevelLayoutOptions>) => {
    if (options.nodeRanks) options.nodeRanks.reverse()
    layoutTB(options)
}

/**
 * 根据层级进行布局
 * @param graph 图
 * @param direction 方向，此处是指层级的排布方向，左右/上下/右左/下上
 * @param gapX 水平排布间距
 * @param gapY 垂直排布间距
 */
export const layoutByLevel = (
    graph: Graph,
    direction: "LR" | "TB" | "RL" | "BT" = "LR",
    gapX: number = 200,
    gapY: number = 100
) => {
    let nodes
    let edges

    graph.startBatch('layout')

    if (graph.isSelectionEmpty() || graph.getSelectedCellCount() == 1) {
        nodes = toLayoutNodes(graph.getNodes())
        edges = toLayoutEdges(graph.getEdges())
    } else {
        nodes = toLayoutNodes(getSelectedNodes(graph))
        edges = toLayoutEdges(getSelectedEdges(graph))
    }

    edges = edges.filter(edge => edge.source != edge.target)

    // 根据字典序对表名进行排序，保证多次布局的入参一致
    nodes.sort((node1, node2) => {
        return node1.node.data.table.name.localeCompare(node2.node.data.table.name)
    })

    setLevel(nodes, edges)

    const nodeRanks = getRanks(nodes)

    const options: LevelLayoutOptions = {
        nodeRanks,
        startX: getLeft(nodes.map(it => it.node))!,
        startY: getTop(nodes.map(it => it.node))!,
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