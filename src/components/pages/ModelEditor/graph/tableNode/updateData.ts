import {GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'
import {DeepReadonly} from "vue";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

export const updateTableNodeData = (node: DeepReadonly<Node>, newTable: DeepReadonly<GenTableModelInput>) => {
    const newData = {...node.getData(), table: newTable}

    if (JSON.stringify(newData) === JSON.stringify(node.getData())) return

    useModelEditorStore().MODEL_EDITOR.syncTable(node.id)

    node.setData(newData, {overwrite: true})
}
