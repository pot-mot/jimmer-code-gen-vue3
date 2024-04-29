import {GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {DeepReadonly} from "vue";

export const updateTableNodeData = (node: Node, newTable: DeepReadonly<GenTableModelInput>) => {
    const newData = {...node.getData(), table: newTable}

    if (JSON.stringify(newData) === JSON.stringify(node.getData())) return

    ModelEditorEventBus.emit('syncTable', {id: node.id})

    node.setData(newData, {overwrite: true})
}
