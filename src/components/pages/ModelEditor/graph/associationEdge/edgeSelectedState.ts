import {Edge} from "@antv/x6";
import {EDGE_SELECT_FLAG} from "@/components/business/modelEditor/constant.ts";

export const getEdgeSelectFlag = (edge: Edge) => {
    const edgeWithFlag = edge as (Edge & { EDGE_SELECT_FLAG?: boolean })

    if (edgeWithFlag.EDGE_SELECT_FLAG == undefined) {
        edgeWithFlag.EDGE_SELECT_FLAG = false
        Object.defineProperty(edgeWithFlag, EDGE_SELECT_FLAG, {
            enumerable: false,
            writable: true,
        })
        return false
    }

    return edgeWithFlag.EDGE_SELECT_FLAG
}

export const setEdgeSelectFlag = (edge: Edge, flag: boolean) => {
    const edgeWithFlag = edge as (Edge & { EDGE_SELECT_FLAG?: boolean })

    if (edgeWithFlag.EDGE_SELECT_FLAG == undefined) {
        edgeWithFlag.EDGE_SELECT_FLAG = flag
        Object.defineProperty(edgeWithFlag, EDGE_SELECT_FLAG, {
            enumerable: false,
            writable: true,
        })
    }

    edgeWithFlag.EDGE_SELECT_FLAG = flag
}
