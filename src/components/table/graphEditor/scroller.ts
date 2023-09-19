import {Graph} from "@antv/x6";
import {Scroller} from "@antv/x6-plugin-scroller";

export const useScroller = (graph: Graph) => {
    graph.use(
        new Scroller({
            enabled: true,
            padding: 0,

            pageVisible: true,
            pageBreak: true,
        })
    )
    graph.setScrollbarPosition(0,0)
};