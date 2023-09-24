import {Graph} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";

export const useSelection = (graph: Graph) => {
    graph.use(
        new Selection({
            enabled: true,
            movable: true,
            rubberband: true,
            rubberEdge: true,
        })
    )

    graph.on("cell:selected", ({cell}) => {
        cell.toFront()
    })
};