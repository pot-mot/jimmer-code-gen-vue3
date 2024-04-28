import {GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

export const updateTableNodeData = (node: Node, newTable: GenTableModelInput) => {
    const newData = {...node.getData(), table: newTable}

    if (JSON.stringify(newData) === JSON.stringify(node.getData())) return

    ModelEditorEventBus.emit('syncTable', {id: node.id})

    node.setData(newData, {overwrite: true})
}
