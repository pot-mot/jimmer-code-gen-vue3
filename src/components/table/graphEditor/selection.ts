import {Graph} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";

export const useSelection = (graph: Graph) => {
    graph.use(
        new Selection({
            enabled: true,
            rubberband: true,
            showNodeSelectionBox: true
        })
    )
    useSelectDelete(graph)
};

export const useSelectDelete = (graph: Graph) => {
    console.log(graph)
}