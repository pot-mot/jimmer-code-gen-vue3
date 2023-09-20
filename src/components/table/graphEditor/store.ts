import {Graph} from "@antv/x6";
import {useTableEditorStore} from "../../../store/tableEditor.ts";
import {addTableNodes, removeTableNodes} from "./table.ts";

export const useStoreEvents = (graph: Graph) => {
    const store = useTableEditorStore()

    store.$onAction(({name, after}) => {
        if (name == "addTables") {
            after((result) => {
                if (result.del.length > 0) {
                    if (!confirm(`已有表 ${JSON.stringify(result.del.map(item => item.name))} 在编辑器中，是否重新刷入`)) return
                }
                removeTableNodes(graph, result.del)
                addTableNodes(graph, result.add)
            })
        }

        if (name == "removeTables") {
            after((result) => {
                removeTableNodes(graph, result)
            })
        }
    })
}
