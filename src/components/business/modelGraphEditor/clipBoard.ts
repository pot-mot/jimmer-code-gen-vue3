import {Cell, Node, Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {sendMessage} from "@/utils/message.ts";
import {loadEditorData} from "@/components/business/graphEditor/common/graphData.ts";
import {loadByInputs} from "@/components/pages/ModelEditor/graph/loadData.ts";
import {CopyData, validateCopyData} from "@/shape/CopyData.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {
    GenAssociationModelInput,
    GenTableModelInput
} from "@/api/__generated/model/static";

export const handleTableNodeClipBoardKeyEvent = (graph: Graph) => {
    graph.bindKey(["ctrl+c", "command+c"], async () => {
        await tableNodeCopy(graph)
    })

    graph.bindKey(["ctrl+x", "command+x"], async () => {
        await tableNodeCut(graph)
    })

    graph.bindKey(["ctrl+v", "command+v"], async () => {
        await tableNodePaste(graph)
    })
}

export const tableNodeCopy = async (graph: Graph) => {
    const store = useModelEditorStore()

    const nodes = graph.getSelectedCells()
        .filter(it => it.shape == TABLE_NODE && it.getData()?.table != undefined)

    const edges = graph.getSelectedCells()
        .filter(it => it.shape == ASSOCIATION_EDGE && it.getData()?.association != undefined)

    const tables = nodes.map(it => it.getData().table as GenTableModelInput)
    const associations = edges.map(it => it.getData().association as GenAssociationModelInput)

    const tableEnumNames = tables
        .flatMap(it => it.columns.map(it => it.enum?.name))
        .filter(it => it != undefined)

    const enums =
        store.isModelLoaded ?
            store._currentModel().enums.filter(it => tableEnumNames.includes(it.name)) : []

    await navigator.clipboard.writeText(JSON.stringify({tables, associations, enums}))

    return {
        nodes,
        edges,
        enums,
    }
}

export const tableNodeCut = async (graph: Graph) => {
    const {nodes, edges, enums} = await tableNodeCopy(graph)
    graph.removeCells([...nodes, ...edges])
    return {nodes, edges, enums}
}

export const tableNodePaste = async (graph: Graph) => {
    const text = await navigator.clipboard.readText()

    try {
        const value = JSON.parse(text)

        let res: { nodes: Node[], edges: Edge[] } | undefined

        if (validateCopyData(value)) {
            const {
                tables,
                associations,
                enums
            } = value as CopyData

            graph.startBatch("paste")

            res = loadByInputs(graph, tables, associations)

            const store = useModelEditorStore()

            if (store.isModelLoaded) {
                enums.forEach(genEnum => {
                    const sameNameEnums = store._currentModel().enums.filter(it => it.name == genEnum.name)
                    if (sameNameEnums.length == 0) {
                        store._currentModel().enums.push(...enums)
                    } else {
                        if (sameNameEnums.length == 1 && JSON.stringify(sameNameEnums[0]) == JSON.stringify(genEnum)) {
                        } else {
                            sendMessage(`枚举【${genEnum.name}】已存在`, 'warning',
                                {
                                    existedEnum: sameNameEnums, newEnum: genEnum
                                })
                        }
                    }
                })
            }
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
