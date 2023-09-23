import {Graph, Node} from "@antv/x6";
import {MiniMap} from "@antv/x6-plugin-minimap";

export const useMiniMap = (graph: Graph, container: HTMLElement) => {
    return graph.use(
        new MiniMap({
            container,
            width: container.clientWidth,
            height: container.clientHeight,
            scalable: false,

            graphOptions: {
                async: true,
                getCellView(cell) {
                    // TODO 用指定的 View 替换节点默认的 View
                    if (cell.isNode()) {
                        const node = cell as Node
                        console.log(node)
                    }
                },
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