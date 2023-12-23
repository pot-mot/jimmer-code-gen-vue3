import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import TableNode from "@/components/pages/ModelEditor/graph/TableNode.vue";
import {columnPortPosition} from "@/components/business/modelGraphEditor/columnPort.ts";
import {ASSOCIATION_EDGE, COLUMN_PORT, TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";
import {associationEdgeBase} from "@/components/business/modelGraphEditor/associationEdge/define.ts";

/**
 * 注册模型设计器需要的基本形状
 */
export const registerModelShape = () => {
    register({
        shape: TABLE_NODE,
        component: TableNode,
    })

    Graph.registerPortLayout(
        COLUMN_PORT,
        columnPortPosition,
        true
    )

    Graph.registerEdge(
        ASSOCIATION_EDGE,
        associationEdgeBase,
        true
    )
}
