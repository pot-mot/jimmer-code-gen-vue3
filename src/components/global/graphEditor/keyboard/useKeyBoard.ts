import { Keyboard } from '@antv/x6-plugin-keyboard'
import {Graph} from "@antv/x6";

export const useKeyBoard = (graph: Graph) => {
    graph.use(
        new Keyboard({
            enabled: true,
        })
    )
}
