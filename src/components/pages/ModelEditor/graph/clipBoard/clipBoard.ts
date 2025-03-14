import {Cell, Edge, Graph, Node} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {CopyData, validateCopyData} from "@/shape/CopyData.ts";
import {validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {GenModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {validateModelInput} from "@/shape/ModelInput.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {validateTableModelInput} from "@/shape/GenTableModelInput.ts";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";
import {TableLoadOptions} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";

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

export const getModelAllCopyData = (model: GenModelInput): CopyData => {
    const cells = jsonParseThenConvertNullToUndefined(model.graphData)?.json?.cells
    const nodes = cells.filter((it: any) => it.shape === TABLE_NODE)
    const edges = cells.filter((it: any) => it.shape === ASSOCIATION_EDGE)

    return {
        tables: nodes
            .map((it: any) => it.data.table)
            .filter((it: any) => it != undefined) ?? [],
        associations: edges
            .map((it: any) => it.data.association)
            .filter((it: any) => it != undefined) ?? [],
        enums: model.enums,
        subGroups: model.subGroups,
        optionsList: getPositionOptionsList(nodes.map((it: any) => it.position)),
    }
}

const getPositionOptionsList = (positions: { x: number, y: number }[]): TableLoadOptions[] => {
    let minX = Number.MAX_VALUE
    let minY = Number.MAX_VALUE
    positions.forEach(it => {
        if (it.x < minX) minX = it.x
        if (it.y < minY) minY = it.y
    })

    const optionsList: TableLoadOptions[] = []
    positions.forEach(it => {
        optionsList.push({
            x: it.x - minX,
            y: it.y - minY
        })
    })

    return optionsList
}

const copy = async () => {
    const {MODEL} = useModelEditorStore()

    const model = MODEL._model()

    const tableNodePairs = MODEL.selectedTableNodePairs
    const associationEdgePairs = MODEL.selectedAssociationEdgePairs

    const tables = tableNodePairs.map(it => it.first)
    const nodes = tableNodePairs.map(it => it.second)
    const associations = associationEdgePairs.map(it => it.first)
    const edges = tableNodePairs.map(it => it.second)

    const enumNameSet = new Set(
        tables
            .flatMap(it => it.columns.map(it => it.enum?.name))
            .filter(it => it !== undefined)
    )

    const enums =
        model.enums.filter(it => enumNameSet.has(it.name))

    const subGroupNameSet = new Set([
        ...tables
            .map(it => it.subGroup?.name)
            .filter(it => it !== undefined),
        ...enums
            .map(it => it.subGroup?.name)
            .filter(it => it !== undefined),
    ])

    const subGroups =
        model.subGroups.filter(it => subGroupNameSet.has(it.name))

    const nodePositions = tableNodePairs.map(it => it.second.getPosition())
    const optionsList = getPositionOptionsList(nodePositions)

    const copyData: CopyData = {subGroups, enums, tables, associations, optionsList}

    await navigator.clipboard.writeText(JSON.stringify(copyData))

    return {
        nodes,
        edges,
        ...copyData
    }
}

const cut = async () => {
    const {REMOVE} = useModelEditorStore()
    const copyResult = await copy()
    REMOVE.removeCells([...copyResult.nodes.map(it => it.id), ...copyResult.edges.map(it => it.id)])
    return copyResult
}

const paste = async () => {
    const {GRAPH, MODEL_EDITOR} = useModelEditorStore()

    const graph = GRAPH._graph()

    graph.startBatch("paste")

    try {
        const text = await navigator.clipboard.readText()

        let res: { nodes: Node[], edges: Edge[] } | undefined

        const value = jsonParseThenConvertNullToUndefined(text)

        const validateErrors: any = []

        const baseTableOptions: TableLoadOptions = {
            x: GRAPH.mousePosition.x,
            y: GRAPH.mousePosition.y
        }

        if (validateTableModelInput(value, (e) => validateErrors.push(e))) {
            const table = value as GenTableModelInput
            res = MODEL_EDITOR.loadInput({tables: [table], baseTableOptions})
        } else if (validateCopyData(value, (e) => validateErrors.push(e))) {
            const {
                tables,
                associations,
                enums,
                subGroups,
                optionsList
            } = value as CopyData

            res = MODEL_EDITOR.loadInput({subGroups, enums, tables, associations, baseTableOptions, eachTableOptions: optionsList})
        } else if (validateModelEditorData(value, (e) => validateErrors.push(e))) {
            const cells = value.json.cells as Cell[]
            graph.parseJSON(cells)
            res = MODEL_EDITOR.loadModelEditorData(jsonParseThenConvertNullToUndefined(text), false)
        } else if (validateModelInput(value, (e) => validateErrors.push(e))) {
            const inputModel = value as GenModelInput

            MODEL_EDITOR.loadInput({subGroups: inputModel.subGroups, enums: inputModel.enums})
            if (inputModel.graphData) {
                res = MODEL_EDITOR.loadModelEditorData(jsonParseThenConvertNullToUndefined(inputModel.graphData), false)
            }
        } else {
            sendI18nMessage('MESSAGE_clipBoard_cannotDirectLoad', 'error', validateErrors)
        }

        if (res !== undefined) {
            const {nodes, edges} = res

            await syncTimeout(100 + nodes.length * 30 + edges.length * 20)

            graph.resetSelection([...nodes.map(it => it.id), ...edges.map(it => it.id)])
        }
    } catch (e) {
        sendI18nMessage('MESSAGE_clipBoard_cannotDirectLoad', 'error', e)
    }

    graph.stopBatch("paste")
}

