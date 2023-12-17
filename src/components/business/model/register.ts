import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import TableNode from "@/components/pages/AssociationEditor/graph/TableNode.vue";
import ModelNode from "@/components/pages/ModelEditor/graph/ModelNode.vue";
import {columnPortPosition} from "@/components/business/model/columnPort.ts";
import {COLUMN_PORT} from "@/components/business/model/constant.ts";

/**
 * 注册模型设计器需要的基本形状
 */
export const registerModelShape = () => {
    Graph.registerPortLayout(
        COLUMN_PORT,
        columnPortPosition,
        true
    )

    register({
        shape: "table",
        component: TableNode
    });

    register({
        shape: "model",
        component: ModelNode
    })
}
