import {Cell, Edge, Node} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {CopyData, validateCopyData} from "@/shape/CopyData.ts";
import {validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {
    GenModelInput,
    GenTableModelInput, Pair
} from "@/api/__generated/model/static";
import {validateModelInput} from "@/shape/ModelInput.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {validateTableModelInput} from "@/shape/GenTableModelInput.ts";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";
import {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {DeepReadonly} from "vue";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";

export const getModelAllCopyData = (model: DeepReadonly<GenModelInput>): DeepReadonly<CopyData> => {
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

type CopyResult = CopyData & {
    nodes: UnwrapRefSimple<Node>[]
    edges: UnwrapRefSimple<Edge>[]
}

type CutResult = CopyResult

type PasteResult = {
    nodes: Node[]
    edges: Edge[]
}

type ClipBoardOperation = {
    copy: () => Promise<CopyResult>,
    cut: () => Promise<CutResult>,
    paste: () => Promise<PasteResult | undefined>
}

/**
 * 根据当前 TableNodePair 与全部 TableNodePair 获取全部继承树种的 TableNodePair
 * @param currentTableNodePairs
 * @param allTableNodePairs
 */
const getAllWithSuperTableNodePairs = (
    currentTableNodePairs: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
    allTableNodePairs: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
): Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>> => {
    const result: Set<Pair<GenTableModelInput, UnwrapRefSimple<Node>>> = new Set(currentTableNodePairs)
    const superTableNodePairNameMap = new Map<string, Pair<GenTableModelInput, UnwrapRefSimple<Node>>>

    for (const tableNodePair of allTableNodePairs) {
        if (tableNodePair.first.type === "SUPER_TABLE") {
            superTableNodePairNameMap.set(tableNodePair.first.name, tableNodePair)
        }
    }

    for (const tableNodePair of result) {
        const table = tableNodePair.first

        const superTables = table.superTables
        if (superTables === undefined || superTables.length === 0) {
            result.add(tableNodePair)
            continue
        }

        for (const superTable of superTables) {
            const superTableNodePair = superTableNodePairNameMap.get(superTable.name)
            if (superTableNodePair !== undefined) {
                result.add(superTableNodePair)
            }
        }
    }

    return [...result]
}

let modelClipBoard: ClipBoardOperation | undefined
export const useModelClipBoard = (): ClipBoardOperation => {
    if (modelClipBoard) return modelClipBoard

    const {GRAPH, MODEL, MODEL_EDITOR, REMOVE, SELECT} = useModelEditorStore()

    const copy = async (): Promise<CopyResult> => {
        const model = MODEL._model()

        const tableNodePairs = getAllWithSuperTableNodePairs(MODEL.selectedTableNodePairs, MODEL.tableNodePairs)
        const associationEdgePairs = MODEL.selectedAssociationEdgePairs

        const tables = tableNodePairs.map(it => it.first)
        const nodes = tableNodePairs.map(it => it.second)
        const associations = associationEdgePairs.map(it => it.first)
        const edges = associationEdgePairs.map(it => it.second)

        const enumNameSet = new Set<string>([
            ...MODEL.selectedEnumMap.keys(),
            ...tables
                .flatMap(it => it.columns.map(it => it.enum?.name))
                .filter(it => it !== undefined)
        ])

        const enums =
            model.enums.filter(it => enumNameSet.has(it.name))

        const subGroupNameSet = new Set<string | undefined>([
            ...MODEL.selectedSubGroupMap.keys(),
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

    const cut = async (): Promise<CutResult> => {
        const copyResult = await copy()

        const {nodes, edges, subGroups, enums} = copyResult
        REMOVE.removeCells([...nodes.map(it => it.id), ...edges.map(it => it.id)])

        const model = MODEL._model()
        const modelTables = MODEL.tables
        const modelEnums = MODEL.enums

        const usedEnumNames = new Set(modelTables.flatMap(it => it.columns.map(it => it.enum?.name)))
        const removedEnumNames = new Set<string>
        for (const genEnum of enums) {
            if (MODEL.selectedEnumMap.has(genEnum.name) && !usedEnumNames.has(genEnum.name)) {
                removedEnumNames.add(genEnum.name)
            }
        }
        const newEnums = modelEnums.filter(it => !removedEnumNames.has(it.name))
        model.enums = newEnums

        const usedSubGroupNames = new Set([
            ...modelTables.map(it => it.subGroup?.name),
            ...newEnums.map(it => it.subGroup?.name),
        ])
        const removedSubGroupNames = new Set<string>
        for (const subGroup of subGroups) {
            if (MODEL.selectedSubGroupMap.has(subGroup.name) && !usedSubGroupNames.has(subGroup.name)) {
                removedSubGroupNames.add(subGroup.name)
            }
        }
        model.subGroups = model.subGroups.filter(it => !removedSubGroupNames.has(it.name))

        return copyResult
    }

    const paste = async (): Promise<PasteResult | undefined> => {
        const graph = GRAPH._graph()

        graph.startBatch("paste")

        let res: PasteResult | undefined

        try {
            const text = await navigator.clipboard.readText()

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

                res = MODEL_EDITOR.loadInput({
                    subGroups,
                    enums,
                    tables,
                    associations,
                    baseTableOptions,
                    eachTableOptions: optionsList
                })
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

                await syncTimeout(100 + (nodes.length + edges.length) * 5)

                SELECT.select([...nodes.map(it => it.id), ...edges.map(it => it.id)])
            }
        } catch (e) {
            sendI18nMessage('MESSAGE_clipBoard_cannotDirectLoad', 'error', e)
        }

        graph.stopBatch("paste")

        return res
    }

    modelClipBoard = {
        copy,
        cut,
        paste,
    }

    return modelClipBoard
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
