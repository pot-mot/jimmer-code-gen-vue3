import {Cell, Node, Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {sendMessage} from "@/message/message.ts";
import {loadByInputs} from "@/components/pages/ModelEditor/graph/loadData.ts";
import {CopyData, validateCopyData} from "@/shape/CopyData.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {
    GenAssociationModelInput, GenModelInput,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {validateModelInput} from "@/shape/ModelInput.ts";
import {importEnums} from "@/components/pages/ModelEditor/graph/enums/genEnum.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";

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
    const loadingStore = useGlobalLoadingStore()
    const flag = loadingStore.start('clipBoard paste')

    graph.startBatch("paste")

    try {
        const text = await navigator.clipboard.readText()

        let res: { nodes: Node[], edges: Edge[] } | undefined

        const value = JSON.parse(text)

        const store = useModelEditorStore()

        const validateErrors: any = []

        if (validateCopyData(value, (e) => validateErrors.push(e))) {
            const {
                tables,
                associations,
                enums
            } = value as CopyData

            res = loadByInputs(graph, tables, associations)

            importEnums(enums)
        } else if (validateGraphData(value, (e) => validateErrors.push(e))) {
            const cells = value.json.cells as Cell[]
            graph.parseJSON(cells)
            res = store.loadGraphData(text, false)
        } else if (validateModelInput(value, (e) => validateErrors.push(e))) {
            const model = value as GenModelInput

            if (model.graphData) {
                res = store.loadGraphData(model.graphData, false)
            }
            importEnums(model.enums)
        } else {
            sendMessage('剪切板中数据无法直接导入画布', 'error', validateErrors)
        }

        if (res != undefined) {
            const {nodes, edges} = res

            await syncTimeout(100 + nodes.length * 30 + edges.length * 20)

            graph.resetSelection([...nodes.map(it => it.id), ...edges.map(it => it.id)])
        }
    } catch (e) {
        sendMessage('剪切板中数据无法直接导入画布', 'error', e)
    }

    graph.stopBatch("paste")

    loadingStore.stop(flag)
}
