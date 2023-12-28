import {Cell, Node, Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {sendMessage} from "@/utils/message.ts";
import {loadEditorData} from "@/components/business/graphEditor/storage/graphData.ts";
import {loadByTableAndAssociationInputs} from "@/components/pages/ModelEditor/graph/loadData.ts";

export const handleTableNodeClipBoardKeyEvent = async (graph: Graph, e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key == 'c') {
            e.preventDefault()
            await tableNodeCopy(graph)
        } else if (e.key == 'x') {
            e.preventDefault()
            await tableNodeCut(graph)
        } else if (e.key == 'v') {
            e.preventDefault()
            await tableNodePaste(graph)
        }
    }
}

export const tableNodeCopy = async (graph: Graph) => {
    const nodes = graph.getSelectedCells()
        .filter(it => it.shape == TABLE_NODE && it.getData()?.table != undefined)

    const edges = graph.getSelectedCells()
        .filter(it => it.shape == ASSOCIATION_EDGE && it.getData()?.association != undefined)

    const tables = nodes.map(it => it.getData().table)
    const associations = edges.map(it => it.getData().association)

    await navigator.clipboard.writeText(JSON.stringify({tables, associations}))

    return {
        nodes,
        edges
    }
}

export const tableNodeCut = async (graph: Graph) => {
    const {nodes, edges} = await tableNodeCopy(graph)
    graph.removeCells([...nodes, ...edges])
    return {nodes, edges}
}

const graphDataKeys: string[] = ['json', 'zoom', 'transform']

const copyDataKeys: string[] = ['tables', 'associations']

const tableKeys: string[] = ['name', 'type', 'comment', 'columns', 'indexes',]

const associationKeys: string[] = ['associationType', 'columnReferences', 'fake', 'name', 'sourceTable', 'targetTable']

const isSubSet = (from: string[], values: string[]) => {
    for (const value of values) {
        if (!from.includes(value)) return false
    }
    return true
}

export const tableNodePaste = async (graph: Graph) => {
    const text = await navigator.clipboard.readText()

    try {
        const value = JSON.parse(text)

        let res: {nodes: Node[], edges: Edge[]} | undefined

        if (isSubSet(Object.keys(value), copyDataKeys)) {
            const {tables, associations} = value

            if (Array.isArray(tables) && (tables as any[]).filter(it => isSubSet(Object.keys(it), tableKeys)).length == tables.length) {
            } else {
                return
            }

            if (Array.isArray(associations) && (associations as any[]).filter(it => isSubSet(Object.keys(it), associationKeys)).length == associations.length) {
            } else {
                return
            }

            res = loadByTableAndAssociationInputs(graph, tables, associations)
        } else if (isSubSet(Object.keys(value), graphDataKeys)) {
            if (!Object.keys(value.json).includes("cells")) {
                return
            }

            const cells = value.json.cells as Cell[]
            graph.parseJSON(cells)

            res = loadEditorData(graph, value, false)
        }

        if (res) {
            setTimeout(() => {
                graph.resetSelection([...res!.nodes, ...res!.edges])
            }, 200)
        }

    } catch (e) {
        sendMessage('剪切板中数据无法直接导入画布', 'info', {error: e, clipboardValue: text})
    }
}
