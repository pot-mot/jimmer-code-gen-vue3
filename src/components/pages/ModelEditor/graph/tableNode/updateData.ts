import {GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

export const updateTableNodeData = (node: Node, newTable: GenTableModelInput) => {
    ModelEditorEventBus.emit('syncTable', {id: node.id})
    node.getData().table = newTable
    node.notify('change:data', {})
}
