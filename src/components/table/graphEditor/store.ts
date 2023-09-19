import {Graph} from "@antv/x6";
import {useTableEditorStore} from "../../../store/tableEditor.ts";
import {addTableNodes, removeTableNodes} from "./table.ts";

export const useStoreEvents = (graph: Graph) => {
    const store = useTableEditorStore()

    store.$onAction(({name, after}) => {
        if (name == "addTables") {
            after((result) => {
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
