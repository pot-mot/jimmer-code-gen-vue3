import {Cell, Edge, Node} from "@antv/x6";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {validateCopyData} from "@/shape/CopyData.ts";
import {validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {
    AssociationEdgePair,
    ModelLoadInput,
    TableNodePair,
    useModelEditorStore
} from "@/store/modelEditor/ModelEditorStore.ts";
import {
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {validateModelInput} from "@/shape/ModelInput.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {validateTableModelInput} from "@/shape/GenTableModelInput.ts";
import {validateSubGroupModelInput} from "@/shape/GenSubGroupModelInput.ts";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";
import {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {DeepReadonly, nextTick} from "vue";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {validateEnumModelInput} from "@/shape/GenEnumModelInput.ts";
import {useEventTargetStore} from "@/store/modelEditor/eventTarget/EventTargetStore.ts";

export type CopyData = ModelLoadInput

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
        eachTableOptions: getPositionOptionsList(nodes.map((it: any) => it.position)),
    }
}

type CopyInput = DeepReadonly<{
    tableNodePairs?: Array<TableNodePair>,
    associationEdgePairs?: Array<AssociationEdgePair>,
    enumNames?: Array<string>,
    subGroupNames?: Array<string | undefined>,
}>

type CopyResult = CopyData & {
    nodes: UnwrapRefSimple<Node>[]
    edges: UnwrapRefSimple<Edge>[]
}

type PasteResult = {
    nodes: Node[],
    edges: Edge[],
    enums: GenModelInput_TargetOf_enums[],
    subGroups: GenModelInput_TargetOf_subGroups[],
}

type InputProducer = (input: CopyData) => CopyData

type ClipBoardOperation = {
    copy: (input?: CopyInput | undefined) => Promise<DeepReadonly<CopyResult>>,
    cut: (input?: CopyInput | undefined) => Promise<DeepReadonly<CopyResult>>,
    paste: (inputProducer?: (InputProducer | undefined)) => Promise<PasteResult | undefined>
}

let modelClipBoard: ClipBoardOperation | undefined
export const useModelClipBoard = (): ClipBoardOperation => {
    if (modelClipBoard) return modelClipBoard

    const {GRAPH, MODEL, MODEL_EDITOR, REMOVE, SELECT} = useModelEditorStore()
    const eventTargetStore = useEventTargetStore()

    const getDefaultInput = (): CopyInput => {
        if (eventTargetStore.target.type === "Table") {
            if (!GRAPH.selectedNodeMap.has(eventTargetStore.target.tableNodePair.node.id)) {
                return {tableNodePairs: [eventTargetStore.target.tableNodePair]}
            }
        } else if (eventTargetStore.target.type === "Association") {
            if (!GRAPH.selectedEdgeMap.has(eventTargetStore.target.associationEdgePair.edge.id)) {
                return {associationEdgePairs: [eventTargetStore.target.associationEdgePair]}
            }
        } else if (eventTargetStore.target.type === "Enum") {
            if (!MODEL.selectedEnumMap.has(eventTargetStore.target.enum.name)) {
                return {enumNames: [eventTargetStore.target.enum.name]}
            }
        } else if (eventTargetStore.target.type === "SubGroup") {
            if (!MODEL.selectedSubGroupMap.has(eventTargetStore.target.subGroup?.name)) {
                return {subGroupNames: [eventTargetStore.target.subGroup?.name]}
            }
        }

        return {
            tableNodePairs: MODEL.selectedTableNodePairs,
            associationEdgePairs: MODEL.selectedAssociationEdgePairs,
            enumNames: [...MODEL.selectedEnumMap.keys()],
            subGroupNames: [...MODEL.selectedSubGroupMap.keys()],
        }
    }

    const copy = async (
        input?: CopyInput | undefined
    ): Promise<DeepReadonly<CopyResult>> => {
        input = input ?? getDefaultInput()

        const model = MODEL._model()

        const tableNodePairs = getAllWithSuperTableNodePairs(input.tableNodePairs ?? [], MODEL.tableNodePairs)
        const associationEdgePairs = input.associationEdgePairs ?? []

        const tables = tableNodePairs.map(it => it.table)
        const nodes = tableNodePairs.map(it => it.node)
        const associations = associationEdgePairs.map(it => it.association)
        const edges = associationEdgePairs.map(it => it.edge)

        const enumNameSet = new Set<string>([
            ...input.enumNames ?? [],
            ...tables
                .flatMap(it => it.columns.map(it => it.enum?.name))
                .filter(it => it !== undefined)
        ])

        const enums =
            model.enums.filter(it => enumNameSet.has(it.name))

        const subGroupNameSet = new Set<string | undefined>([
            ...input.subGroupNames ?? [],
            ...tables
                .map(it => it.subGroup?.name)
                .filter(it => it !== undefined),
            ...enums
                .map(it => it.subGroup?.name)
                .filter(it => it !== undefined),
        ])

        const subGroups =
            model.subGroups.filter(it => subGroupNameSet.has(it.name))

        const nodePositions = tableNodePairs.map(it => it.node.getPosition())
        const eachTableOptions = getPositionOptionsList(nodePositions)

        const copyData: DeepReadonly<CopyData> = {subGroups, enums, tables, associations, eachTableOptions}

        await navigator.clipboard.writeText(JSON.stringify(copyData))

        return {
            nodes,
            edges,
            ...copyData
        }
    }

    const cut = async (
        input?: CopyInput | undefined
    ): Promise<DeepReadonly<CopyResult>> => {
        input = input ?? getDefaultInput()

        const copyResult = await copy(input)

        const graph = GRAPH._graph()
        const model = MODEL._model()

        graph.startBatch("cut")

        // 1. 移除关联
        const {nodes, edges, tables, subGroups, enums} = copyResult
        REMOVE.removeCells(edges.map(it => it.id))

        await nextTick()

        // 2. 移除不被依赖的表
        const cutTableNames = new Set(tables?.map(it => it.name))
        const usedTableNames = new Set(
            MODEL.tables.filter(it => !cutTableNames.has(it.name)).flatMap(it => it.superTables.map(it => it.name)),
        )
        const usedTableNodeIds = new Set(
            MODEL.tableNodePairs.filter(it => usedTableNames.has(it.table.name)).map(it => it.node.id)
        )
        const inputTableNodeIds = new Set(
            input.tableNodePairs?.map(it => it.node.id)
        )
        const removedTableNodeIds = new Set<string>
        for (const node of nodes) {
            if (inputTableNodeIds.has(node.id) && !usedTableNodeIds.has(node.id)) {
                removedTableNodeIds.add(node.id)
            }
        }
        REMOVE.removeCells([...removedTableNodeIds])

        await nextTick()

        // 3. 移除不被依赖的枚举
        const modelTables = MODEL.tables
        const modelEnums = MODEL.enums

        const usedEnumNames = new Set(
            modelTables.flatMap(it => it.columns.map(it => it.enum?.name))
        )
        const inputEnumNames = new Set(
            input.enumNames
        )
        const removedEnumNames = new Set<string>
        for (const genEnum of enums ?? []) {
            if (inputEnumNames.has(genEnum.name) && !usedEnumNames.has(genEnum.name)) {
                removedEnumNames.add(genEnum.name)
            }
        }
        const newEnums = modelEnums.filter(it => !removedEnumNames.has(it.name))
        model.enums = newEnums

        // 4. 移除不被依赖的子组
        const usedSubGroupNames = new Set([
            ...modelTables.map(it => it.subGroup?.name),
            ...newEnums.map(it => it.subGroup?.name),
        ])
        const inputSubGroupNames = new Set(
            input.subGroupNames
        )
        const removedSubGroupNames = new Set<string>
        for (const subGroup of subGroups ?? []) {
            if (inputSubGroupNames.has(subGroup.name) && !usedSubGroupNames.has(subGroup.name)) {
                removedSubGroupNames.add(subGroup.name)
            }
        }
        model.subGroups = model.subGroups.filter(it => !removedSubGroupNames.has(it.name))

        await nextTick()

        graph.stopBatch("cut")

        return copyResult
    }

    const paste = async (
        inputProducer?: InputProducer | undefined
    ): Promise<PasteResult | undefined> => {
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

            if (validateModelEditorData(value, (e) => validateErrors.push(e))) {
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
                let copyData: CopyData | undefined = undefined

                if (validateCopyData(value, (e) => validateErrors.push(e))) {
                    copyData = {...value, baseTableOptions} as CopyData
                } else if (validateSubGroupModelInput(value, (e) => validateErrors.push(e))) {
                    copyData = {subGroups: [value as GenModelInput_TargetOf_subGroups], baseTableOptions}
                } else if (validateTableModelInput(value, (e) => validateErrors.push(e))) {
                    copyData = {tables: [value as GenTableModelInput], baseTableOptions}
                } else if (validateEnumModelInput(value, (e) => validateErrors.push(e))) {
                    copyData = {enums: [value as GenModelInput_TargetOf_enums], baseTableOptions}
                }

                if (copyData !== undefined) {
                    if (eventTargetStore.target.type === "SubGroup" && eventTargetStore.target.subGroup === undefined) {
                        copyData.tables?.forEach(it => {
                            if (it.type !== "SUPER_TABLE") it.subGroup = undefined
                        })
                        if (copyData.tables && copyData.tables.length > 0) {
                            const enumNameSet = new Set(MODEL.enums.map(it => it.name))
                            copyData.enums?.forEach(it => {
                                if (!enumNameSet.has(it.name)) it.subGroup = undefined
                            })
                        } else {
                            copyData.enums?.forEach(it => {
                                it.subGroup = undefined
                            })
                        }
                    } else {
                        const subGroupName = eventTargetStore.getTargetSubGroupName()
                        if (subGroupName !== undefined) {
                            copyData.tables?.forEach(it => {
                                if (it.type !== "SUPER_TABLE") it.subGroup = {name: subGroupName}
                            })
                            if (copyData.tables && copyData.tables.length > 0) {
                                const enumNameSet = new Set(MODEL.enums.map(it => it.name))
                                copyData.enums?.forEach(it => {
                                    if (!enumNameSet.has(it.name)) it.subGroup = {name: subGroupName}
                                })
                            } else {
                                copyData.enums?.forEach(it => {
                                    it.subGroup = {name: subGroupName}
                                })
                            }
                        }
                    }

                    res = MODEL_EDITOR.loadInput(inputProducer ? inputProducer(copyData) : copyData)
                } else {
                    sendI18nMessage('MESSAGE_clipBoard_cannotDirectLoad', 'error', validateErrors)
                }
            }

            if (res !== undefined) {
                const {nodes, edges, enums, subGroups} = res

                await syncTimeout(100 + (nodes.length + edges.length) * 5)

                SELECT.select([...nodes.map(it => it.id), ...edges.map(it => it.id)])
                SELECT.selectEnum(...enums.map(it => it.name))
                SELECT.selectSubGroup(...subGroups.map(it => it.name))
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

/**
 * 根据所有坐标以左上角为准计算出全部节点与左上角点的相对位置
 */
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

/**
 * 根据当前 TableNodePair 与全部 TableNodePair 获取全部继承树种的 TableNodePair
 */
const getAllWithSuperTableNodePairs = (
    currentTableNodePairs: DeepReadonly<Array<TableNodePair>>,
    allTableNodePairs: DeepReadonly<Array<TableNodePair>>,
): DeepReadonly<Array<TableNodePair>> => {
    const result: Set<DeepReadonly<TableNodePair>> = new Set(currentTableNodePairs)
    const superTableNodePairNameMap: Map<string, DeepReadonly<TableNodePair>> = new Map

    for (const tableNodePair of allTableNodePairs) {
        if (tableNodePair.table.type === "SUPER_TABLE") {
            superTableNodePairNameMap.set(tableNodePair.table.name, tableNodePair)
        }
    }

    for (const tableNodePair of result) {
        const {table} = tableNodePair

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
