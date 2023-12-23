import {Cell, Graph} from "@antv/x6";
import {TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {getSelectedNodes} from "@/components/business/graphEditor/selection/selectOperation.ts";
import {sendMessage} from "@/utils/message.ts";
import {loadEditorData} from "@/components/business/graphEditor/storage/graphData.ts";
import {importTables} from "@/components/pages/ModelEditor/graph/tableNode.ts";

export const tableNodeCopy = (graph: Graph) => {
    const tables = getSelectedNodes(graph)
        .filter(it => it.shape == TABLE_NODE)
        .map(it => it.getData()?.table)
        .filter(it => it != undefined)

    navigator.clipboard.writeText(JSON.stringify(tables))
}

export const handleTableNoteClipBoardKeyEvent = (graph: Graph, e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key == 'c') {
        e.preventDefault()
        tableNodeCopy(graph)
    }

    if ((e.ctrlKey || e.metaKey) && e.key == 'v') {
        e.preventDefault()
        tableNodePaste(graph)
    }
}

const graphDataKeys: string[] = ['json', 'zoom', 'transform']

const tableKeys: string[] = ['name', 'type', 'comment', 'columns', 'indexes', ]

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

        if (Array.isArray(value) && (value as any[]).filter(it => isSubSet(Object.keys(it), tableKeys)).length == value.length) {
            importTables(graph, value)
        } else if (isSubSet(Object.keys(value), graphDataKeys)) {
            if (Object.keys(value.json).includes("cells")) {
                try {
                    const cells = value.json.cells as Cell[]
                    graph.parseJSON(cells)

                    loadEditorData(graph, value, false)
                } catch (e) {
                    sendMessage('剪切板中数据无法直接导入画布', 'info', text)
                }
            }
        }

    } catch (e) {
        sendMessage('剪切板中数据无法直接导入画布', 'info', text)
    }
}
