import {GenTableModelInput} from "@/api/__generated/model/static";
import {Node} from '@antv/x6'

export const updateTableNodeData = (node: Node, newTable: GenTableModelInput) => {
    node.setData({wrapper: node.getData().wrapper, table: newTable}, {overwrite: true})
    Object.defineProperty(node.getData(), 'wrapper', { enumerable: false, writable: true })
}
