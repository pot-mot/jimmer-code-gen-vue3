import { Graph } from "@antv/x6";
import { MiniMap } from "@antv/x6-plugin-minimap";

export const useMiniMap = (graph: Graph, container: HTMLElement) => {
    return graph.use(
        new MiniMap({
            container,
            width: container.clientWidth,
            height: container.clientHeight,
            scalable: false,

            graphOptions: {
                async: true,
                createCellView(cell) {
                    // 在小地图中不渲染边
                    if (cell.isEdge()) {
                        return null
                    }
                },
            }
        })
    );
};