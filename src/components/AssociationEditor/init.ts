import {Graph} from "@antv/x6"
import {initGraph} from "../../utils/graphEditor/init.ts";
import {defaultZoomRange} from "./constant.ts";
import {AssociationEdgeConnecting} from "./edge/AssociationEdge.ts";

export const initAssociationEditor = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    return initGraph(
        container,
        wrapper,
        {
            mousewheel: {
                enabled: true,
                ...defaultZoomRange,
            },
            panning: {
                enabled: true,
                eventTypes: ['rightMouseDown']
            },
            connecting: AssociationEdgeConnecting as any,
        }
    )
}