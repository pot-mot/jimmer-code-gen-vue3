import {Graph} from "@antv/x6"
import {initGraph} from "../../utils/graphEditor/init.ts";
import {defaultZoomRange} from "../../utils/graphEditor/constant.ts";
import {AssociationEdgeConnecting} from "../AssociationEditor/edge/AssociationEdge.ts";

export const initModelEditor = (container: HTMLElement, wrapper: HTMLElement): Graph => {
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
            magnetThreshold: 'onleave'
        }
    )
}