import {defineStore} from "pinia";
import {
    GenTableColumnsView
} from "../api/__generated/model/static";
import {api} from "../api";
import {Graph} from "@antv/x6";
import {getAssociations} from "../components/table/edge/AssociationEdge.ts";
import {addTableNodes, getTables, removeTableNodes} from "../components/table/node/TableNode.ts";

export const useTableEditorStore =
    defineStore(
        'tableEditor',
        () => {
            let _graph: Graph

            const graph = () => {
                return _graph
            }

            const tables = () => {
                return getTables(graph())
            }

            const associations = () => {
                return getAssociations(graph())
            }

            const addTables = async (ids: readonly number[]) => {
                const add = await api.tableService.list({ids: ids})
                const del = removeTables(ids)

                removeTableNodes(graph(), del)
                addTableNodes(graph(), add)

                return {add, del}
            }

            const removeTables = (ids: readonly number[]) => {
                const res: GenTableColumnsView[] = []
                tables().filter(table => {
                    if (ids.includes(table.id)) {
                        res.push(table)
                        return true
                    }
                    return false
                })
                removeTableNodes(graph(), res)
                return res
            }

            const load = (graph: Graph) => {
                _graph = graph
            }

            return {
                graph,

                tables,
                associations,

                load,

                addTables,
                removeTables,
            }
        }
    )