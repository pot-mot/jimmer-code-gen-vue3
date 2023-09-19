import {Graph} from "@antv/x6";
import {MiniMap} from "@antv/x6-plugin-minimap";

export const useMiniMap = (graph: Graph, container: HTMLElement) => {
    return graph.use(
        new MiniMap({
            container
        })
    );
};