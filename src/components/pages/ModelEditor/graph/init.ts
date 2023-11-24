import {Graph} from "@antv/x6"
import {initGraph} from "@/components/business/graphEditor/common/init.ts";
import {defaultZoomRange} from "@/components/business/graphEditor/constant.ts";
import {AssociationEdgeConnecting} from "@/components/pages/AssociationEditor/graph/edge/AssociationEdge.ts";

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