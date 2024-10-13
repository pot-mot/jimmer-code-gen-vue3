import { Export } from '@antv/x6-plugin-export'
import {Graph} from "@antv/x6";

export const useExport = (graph: Graph) => {
    graph.use(new Export())
}