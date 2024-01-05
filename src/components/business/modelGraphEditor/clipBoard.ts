import {Cell, Node, Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {sendMessage} from "@/utils/message.ts";
import {loadEditorData} from "@/components/business/graphEditor/common/graphData.ts";
import {loadByTableAndAssociationInputs} from "@/components/pages/ModelEditor/graph/loadData.ts";
import {validateCopyData} from "@/shape/CopyData.ts";
import {validateGraphData} from "@/shape/GraphData.ts";

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

export const tableNodePaste = async (graph: Graph) => {
    const text = await navigator.clipboard.readText()

    try {
        const value = JSON.parse(text)

        let res: {nodes: Node[], edges: Edge[]} | undefined

        if (validateCopyData(value)) {
            const {tables, associations} = value

            graph.startBatch("paste")

            res = loadByTableAndAssociationInputs(graph, tables, associations)
        } else if (validateGraphData(value)) {
            const cells = value.json.cells as Cell[]
            graph.parseJSON(cells)

            graph.startBatch("paste")

            res = loadEditorData(graph, value, false)
        }

        if (res) {
            setTimeout(() => {
                graph.resetSelection([...res!.nodes, ...res!.edges])

                graph.stopBatch("paste")
            }, 200)
        }

    } catch (e) {
        sendMessage('剪切板中数据无法直接导入画布', 'info', {error: e, clipboardValue: text})
    }
}
