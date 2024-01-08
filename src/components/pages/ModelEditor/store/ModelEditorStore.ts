import {defineStore} from "pinia";
import {useCommonGraphOperations} from "@/components/business/graphEditor";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendMessage} from "@/utils/message.ts";
import {ref} from "vue";
import {api} from "@/api";
import {loadByTableViews} from "../graph/loadData.ts";
import {GenModelInput, GenModelView, GenTableColumnsView, GenTableModelInput} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {
    useTableCreateDialogStore
} from "@/components/business/modelGraphEditor/tablesDialog/TableCreateDialogStore.ts";
import {
    useTableModifyDialogsStore
} from "@/components/business/modelGraphEditor/tablesDialog/TableModifyDialogsStore.ts";
import {importTables} from "@/components/pages/ModelEditor/graph/tableNode.ts";
import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";
import {redo, undo} from "@/components/business/graphEditor/history/useHistory.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {updateTableNodeData} from "@/components/business/modelGraphEditor/tableNode/tableNodeData.ts";
import {useEnumCreateDialogStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumCreateDialogStore.ts";
import {useEnumModifyDialogsStore} from "@/components/business/modelGraphEditor/enumsDialog/EnumModifyDialogsStore.ts";
import {cloneDeep} from "lodash";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonOperations = useCommonGraphOperations()

            const {_graph} = commonOperations

            const loadGraphByJSONStr = (jsonStr: string) => {
                try {
                    if (jsonStr && validateGraphData(JSON.parse(jsonStr))) {
                        commonOperations.loadGraphByJSONStr(jsonStr)
                    } else {
                        commonOperations._graph().removeCells(commonOperations._graph().getCells())
                    }
                } catch (e) {
                    sendMessage(`图加载错误: ${e}`, "error", {
                        error: e,
                        jsonStr
                    })
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
                const contextStore = useGenContextStore()

                contextStore.dataSourceType = model.dataSourceType
                contextStore.language = model.language
                contextStore.packagePath = model.packagePath

                currentModel.value = model

                isModelLoaded.value = true

                if (commonOperations.isLoaded) {
                    loadGraphByJSONStr(model.graphData)
                } else {
                    commonOperations.onLoaded(() => {
                        loadGraphByJSONStr(model.graphData)
                    })
                }
            }

            const modelEditDialogOpenState = ref(false)

            const handleEditModel = () => {
                _currentModel().graphData = commonOperations.toDataJSONStr()
                modelEditDialogOpenState.value = true
            }

            const handleCancelModelEdit = () => {
                modelEditDialogOpenState.value = false
            }

            const handleSubmitModelEdit = async (model: GenModelInput) => {
                const loadingStore = useGlobalLoadingStore()

                loadingStore.add()

                try {
                    if (!model) {
                        sendMessage(`模型保存失败，临时编辑模型不存在`, 'error')
                        return
                    }

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

                loadingStore.sub()
            }


            const dataSourceLoadMenuOpenState = ref(false)

            const modelLoadMenuOpenState = ref(false)

            /**
             * 向画布导入 model
             * @param id model id
             */
            const importModel = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({query: {modelIds: [id]}})
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const importSchema = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({query: {schemaIds: [id]}})
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const importTable = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({query: {ids: [id]}})
                await importTableIntoGraph(tables)
            }

            const importTableIntoGraph = async (tables: GenTableColumnsView[]) => {
                const graph = _graph()

                const {nodes, edges} = await loadByTableViews(graph, tables)

                setTimeout(() => {
                    if (nodes.length == 1) {
                        commonOperations.focus(nodes[0])
                    } else {
                        graph.resetSelection([...nodes, ...edges])
                        commonOperations.layoutAndFit()
                    }
                }, 100 + nodes.length * 40)
            }


            const tableCreateStore = useTableCreateDialogStore()

            ModelEditorEventBus.on('createTable', (props) => {
                tableCreateStore.dialogOpenState = true

                if (props) {
                    tableCreateStore.nodeX = props.x
                    tableCreateStore.nodeY = props.y
                }
            })

            ModelEditorEventBus.on('createdTable', ({table, x, y}) => {
                const graph = commonOperations._graph()

                if (!graph) return

                const node = importTables(graph, [table], x, y).nodes[0]

                if (node) {
                    tableCreateStore.dialogOpenState = false

                    setTimeout(() => {
                        commonOperations.select(node)
                    }, 200)
                }
            })


            const tableModifyStore = useTableModifyDialogsStore()

            ModelEditorEventBus.on('modifyTable', ({id, table}) => {
                tableModifyStore.open(id, cloneDeep(table))
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
                tableModifyStore.close(id)
            })

            ModelEditorEventBus.on('removeTable', (id) => {
                commonOperations._graph().removeNode(id)
            })

            ModelEditorEventBus.on('removeAssociation', (id) => {
                commonOperations._graph().removeEdge(id)
            })


            const enumCreateStore = useEnumCreateDialogStore()

            ModelEditorEventBus.on('createEnum', () => {
                enumCreateStore.dialogOpenState = true
            })

            ModelEditorEventBus.on('createdEnum', (genEnum) => {
                _currentModel().enums.push(genEnum)
                enumCreateStore.dialogOpenState = false
            })

            const enumModifyStore = useEnumModifyDialogsStore()

            ModelEditorEventBus.on('modifyEnum', ({name, genEnum}) => {
                enumModifyStore.open(name, cloneDeep(genEnum))
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

                tableModifyStore.items.forEach((value, key) => {
                    if (value && judgeEnumInTable(oldEnumName, value)) {
                        const newTable = syncEnumNameInTable(value, oldEnumName, newEnumName)
                        tableModifyStore.set(key, newTable)
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

                enumModifyStore.close(name)
            })

            ModelEditorEventBus.on('removeEnum', (name) => {
                const currentModel = _currentModel()

                currentModel.enums = currentModel.enums.filter(it => it.name != name)

                syncEnumNameForTables(name, undefined)
            })

            return {
                ...commonOperations,
                loadGraphByJSONStr,

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
