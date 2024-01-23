import {defineStore} from "pinia";
import {useCommonGraphOperations} from "@/components/global/graphEditor";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendMessage} from "@/utils/message.ts";
import {ref} from "vue";
import {api} from "@/api";
import {loadByTableViews} from "../graph/data/loadData.ts";
import {GenModelInput, GenModelView, GenTableColumnsView, GenTableModelInput} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {importTables} from "@/components/pages/ModelEditor/graph/tableNode/importTable.ts";
import {useGenConfigContextStore} from "@/components/business/context/GenContextStore.ts";
import {redo, undo} from "@/components/global/graphEditor/history/useHistory.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {useEnumDialogsStore} from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogsStore.ts";
import {cloneDeep} from "lodash";
import {getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {useTableDialogsStore} from "@/components/pages/ModelEditor/dialogs/table/TableDialogsStore.ts";
import {unStyleAll} from "@/components/pages/ModelEditor/graph/highlight/highlight.ts";
import {GraphEditorData} from "@/components/global/graphEditor/common/graphData.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonOperations = useCommonGraphOperations()

            const {_graph} = commonOperations

            // 在获取数据时调整
            const getGraphData = () => {
                const graphData = JSON.parse(commonOperations.getGraphData()) as GraphEditorData
                graphData.json.cells.forEach(cell => {
                    if (cell.shape == TABLE_NODE) {
                        cell.data = {table: cell.data.table}
                    }
                    if (cell.shape == ASSOCIATION_EDGE) {
                        cell.tools = undefined
                        cell.data = {association: cell.data.association}
                    }
                })
                return JSON.stringify(graphData)
            }

            const loadGraphData = (jsonStr: string, reset: boolean = false) => {
                try {
                    if (jsonStr && validateGraphData(JSON.parse(jsonStr))) {
                        unStyleAll(_graph())
                        return commonOperations.loadGraphData(jsonStr, reset)
                    } else {
                        const graph = commonOperations._graph()
                        graph.removeCells(graph.getCells())
                        return {nodes: [], edges: []}
                    }
                } catch (e) {
                    sendMessage(`图加载错误: ${e}`, "error", {
                        error: e,
                        jsonStr
                    })
                    return {nodes: [], edges: []}
                }
            }

            const currentModel = ref<GenModelView>()

            const isModelLoaded = ref(false)

            const _currentModel = (): GenModelView => {
                if (!currentModel.value) {
                    sendMessage('当前模型不存在', 'error')
                    throw currentModel
                }
                return currentModel.value
            }

            const loadCurrentModel = (model: GenModelView) => {
                const contextStore = useGenConfigContextStore()

                contextStore.context = model

                currentModel.value = model

                isModelLoaded.value = true

                if (commonOperations.isLoaded) {
                    loadGraphData(model.graphData)
                } else {
                    commonOperations.onLoaded(() => {
                        loadGraphData(model.graphData)
                    })
                }
            }

            const modelEditDialogOpenState = ref(false)

            const handleEditModel = () => {
                _currentModel().graphData = getGraphData()
                modelEditDialogOpenState.value = true
            }

            const handleCancelModelEdit = () => {
                modelEditDialogOpenState.value = false
            }

            const handleSubmitModelEdit = async (model: GenModelInput) => {
                const loadingStore = useGlobalLoadingStore()

                const flag = loadingStore.add('ModelEditorStore handleSubmitModelEdit')

                try {
                    const id = await api.modelService.save({body: model})

                    isModelLoaded.value = false

                    const savedModel = (await api.modelService.get({id}))!

                    if (!savedModel) {
                        sendMessage(`模型保存失败，保存返回模型不存在`, 'error')
                        return
                    }

                    handleCancelModelEdit()

                    // 同步数据
                    loadCurrentModel(savedModel)

                    sendMessage("模型保存成功", "success")
                } catch (e) {
                    sendMessage(`模型保存失败，原因：${e}`, 'error', e)
                }

                loadingStore.sub(flag)
            }


            const dataSourceLoadMenuOpenState = ref(false)

            const modelLoadMenuOpenState = ref(false)

            /**
             * 向画布导入 model
             * @param id model id
             */
            const importModel = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({
                    body: {
                        modelIds: [id]
                    }
                })
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const importSchema = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({
                    body: {
                        schemaIds: [id]
                    }
                })
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const importTable = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({
                    body: {
                        ids: [id]
                    }
                })
                await importTableIntoGraph(tables)
            }

            const importTableIntoGraph = async (tables: GenTableColumnsView[]) => {
                const graph = _graph()

                const {nodes, edges} = await loadByTableViews(graph, tables)

                setTimeout(() => {
                    if (nodes.length == 1) {
                        commonOperations.focus(nodes[0])
                    } else {
                        graph.resetSelection([...nodes.map(it => it.id), ...edges.map(it => it.id)])
                        commonOperations.layoutAndFit()
                    }
                }, 100 + nodes.length * 30 + edges.length * 20)
            }

            const tableDialogsStore = useTableDialogsStore()

            const newTablePosition = ref<{ x: number, y: number }>()

            ModelEditorEventBus.on('createTable', (props) => {
                tableDialogsStore.open("", getDefaultTable())

                if (props) {
                    newTablePosition.value = props
                }
            })

            ModelEditorEventBus.on('createdTable', (table) => {
                const graph = commonOperations._graph()

                if (!graph) return

                const node = importTables(
                    graph,
                    [table],
                    newTablePosition.value?.x,
                    newTablePosition.value?.y
                ).nodes[0]

                if (node) {
                    tableDialogsStore.close("")

                    setTimeout(() => {
                        commonOperations.select(node)
                    }, 200)
                }
            })

            ModelEditorEventBus.on('modifyTable', ({id, table}) => {
                tableDialogsStore.open(id, cloneDeep(table))
            })

            ModelEditorEventBus.on('modifiedTable', ({id, table}) => {
                const graph = commonOperations._graph()

                if (!graph) return

                const cell = graph.getCellById(id)
                if (cell && cell.isNode()) {
                    updateTableNodeData(cell, table)
                } else {
                    sendMessage(`Node ${id} 找不到，无法被更改`, 'error')
                }
                tableDialogsStore.close(id)
            })

            ModelEditorEventBus.on('removeTable', (id) => {
                commonOperations._graph().removeNode(id)
            })

            ModelEditorEventBus.on('removeAssociation', (id) => {
                commonOperations._graph().removeEdge(id)
            })

            const enumDialogsStore = useEnumDialogsStore()

            ModelEditorEventBus.on('createEnum', () => {
                enumDialogsStore.open("", getDefaultEnum())
            })

            ModelEditorEventBus.on('createdEnum', (genEnum) => {
                _currentModel().enums.push(genEnum)
                enumDialogsStore.close("")
            })

            ModelEditorEventBus.on('modifyEnum', ({name, genEnum}) => {
                enumDialogsStore.open(name, cloneDeep(genEnum))
            })

            const syncEnumNameInTable = (table: GenTableModelInput, oldEnumName: string, newEnumName: string | undefined): GenTableModelInput => {
                const tempTable = cloneDeep(table)

                tempTable.columns.forEach(column => {
                    if (column.enum && column.enum.name == oldEnumName) {
                        if (newEnumName == undefined) {
                            column.enum = undefined
                        } else {
                            column.enum.name = newEnumName
                        }
                    }
                })

                return tempTable
            }

            const judgeEnumInTable = (enumName: string, table: GenTableModelInput): boolean => {
                return table.columns
                    .flatMap(it => it.enum?.name).filter(it => it != undefined)
                    .includes(enumName)
            }

            const syncEnumNameForTables = (oldEnumName: string, newEnumName: string | undefined) => {
                const graph = _graph()

                const nodes = graph.getNodes().filter(it => it.shape == TABLE_NODE)

                tableDialogsStore.items.forEach((value, key) => {
                    if (value && judgeEnumInTable(oldEnumName, value)) {
                        const newTable = syncEnumNameInTable(value, oldEnumName, newEnumName)
                        tableDialogsStore.set(key, newTable)
                    }
                })

                for (let node of nodes) {
                    const table = node.getData()?.table as GenTableModelInput | undefined
                    if (table && judgeEnumInTable(oldEnumName, table)) {
                        const newTable = syncEnumNameInTable(table, oldEnumName, newEnumName)
                        updateTableNodeData(node, newTable)
                    }
                }
            }

            ModelEditorEventBus.on('modifiedEnum', ({name, genEnum}) => {
                const currentModel = _currentModel()

                currentModel.enums = currentModel.enums.filter(it => it.name != name)
                currentModel.enums.push(genEnum)

                syncEnumNameForTables(name, genEnum.name)

                enumDialogsStore.close(name)
            })

            ModelEditorEventBus.on('removeEnum', (name) => {
                const currentModel = _currentModel()

                currentModel.enums = currentModel.enums.filter(it => it.name != name)

                syncEnumNameForTables(name, undefined)
            })

            return {
                ...commonOperations,

                getGraphData,
                loadGraphData,

                _currentModel,
                isModelLoaded,
                loadCurrentModel,

                modelEditDialogOpenState,
                handleEditModel,
                handleCancelModelEdit,
                handleSubmitModelEdit,

                dataSourceLoadMenuOpenState,
                modelLoadMenuOpenState,

                importTableIntoGraph,
                importModel,
                importSchema,
                importTable,

                undo: () => {
                    undo(_graph())
                },
                redo: () => {
                    redo(_graph())
                }
            }
        }
    )
