import {Cell, Edge, Graph, Node} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {sendMessage} from "@/message/message.ts";
import {loadModelInputs, TableLoadOptions} from "@/components/pages/ModelEditor/graph/loadData.ts";
import {CopyData, validateCopyData} from "@/shape/CopyData.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {useModelEditorStore} from "@/components/pages/ModelEditor/store/ModelEditorStore.ts";
import {GenAssociationModelInput, GenModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {validateModelInput} from "@/shape/ModelInput.ts";
import {importEnums} from "@/components/pages/ModelEditor/graph/clipBoard/importEnums.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {validateTable} from "@/shape/GenTableModelInput.ts";

export const useClipBoard = (graph: Graph) => {
    graph.bindKey(["ctrl+c", "command+c"], async () => {
        await copy()
    })

    graph.bindKey(["ctrl+x", "command+x"], async () => {
        await cut()
    })

    graph.bindKey(["ctrl+v", "command+v"], async () => {
        await paste()
    })
}

const copy = async () => {
    const {GRAPH, MODEL} = useModelEditorStore()

    const graph = GRAPH._graph()

    const nodes = graph.getSelectedCells()
        .filter(it => it.shape === TABLE_NODE && it.getData()?.table !== undefined)

    const edges = graph.getSelectedCells()
        .filter(it => it.shape === ASSOCIATION_EDGE && it.getData()?.association !== undefined)

    const tables = nodes.map(it => it.getData().table as GenTableModelInput)
    const associations = edges.map(it => it.getData().association as GenAssociationModelInput)

    const tableEnumNames = tables
        .flatMap(it => it.columns.map(it => it.enum?.name))
        .filter(it => it !== undefined)

    const enums =
        MODEL.isLoaded ?
            MODEL._model().enums.filter(it => tableEnumNames.includes(it.name)) : []

    const nodePositions = nodes.map(it => (it as Node).getPosition())

    let minX = Number.MAX_VALUE
    let minY = Number.MAX_VALUE
    nodePositions.forEach(it => {
        if (it.x < minX) minX = it.x
        if (it.y < minY) minY = it.y
    })

    const optionsList: TableLoadOptions[] = []
    nodePositions.forEach(it => {
        optionsList.push({
            x: it.x - minX,
            y: it.y - minY
        })
    })


    const copyData: CopyData = {tables, associations, enums, optionsList}

    await navigator.clipboard.writeText(JSON.stringify(copyData))

    return {
        nodes,
        edges,
        ...copyData
    }
}

const cut = async () => {
    const {REMOVE} = useModelEditorStore()
    const {nodes, edges, enums} = await copy()
    REMOVE.removeCells([...nodes, ...edges])
    return {nodes, edges, enums}
}

const paste = async () => {
    const {GRAPH, GRAPH_DATA} = useModelEditorStore()
    const loadingStore = useGlobalLoadingStore()
    const flag = loadingStore.start('clipBoard paste')

    const graph = GRAPH._graph()

    graph.startBatch("paste")

    try {
        const text = await navigator.clipboard.readText()

        let res: { nodes: Node[], edges: Edge[] } | undefined

        const value = JSON.parse(text)

        const validateErrors: any = []

        const options: TableLoadOptions = {
            x: GRAPH.mousePosition.x,
            y: GRAPH.mousePosition.y
        }

        if (validateTable(value, (e) => validateErrors.push(e))) {
            const table = value as GenTableModelInput
            res = loadModelInputs(graph, [table], [], options)
        } else if (validateCopyData(value, (e) => validateErrors.push(e))) {
            const {
                tables,
                associations,
                enums,
                optionsList
            } = value as CopyData

            res = loadModelInputs(graph, tables, associations, options, optionsList)

            importEnums(enums)
        } else if (validateGraphData(value, (e) => validateErrors.push(e))) {
            const cells = value.json.cells as Cell[]
            graph.parseJSON(cells)
            res = GRAPH_DATA.loadGraphData(text, false)
        } else if (validateModelInput(value, (e) => validateErrors.push(e))) {
            const model = value as GenModelInput

            if (model.graphData) {
                res = GRAPH_DATA.loadGraphData(model.graphData, false)
            }
            importEnums(model.enums)
        } else {
            sendMessage('剪切板中数据无法直接导入画布', 'error', validateErrors)
        }

        if (res !== undefined) {
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