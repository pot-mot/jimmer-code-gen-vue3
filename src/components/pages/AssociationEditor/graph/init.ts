import {Graph} from "@antv/x6"
import {initGraph} from "@/components/global/graphEditor/init.ts";
import {defaultZoomRange} from "@/components/global/graphEditor/constant.ts";
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
            magnetThreshold: 'onleave'
        }
    )
}