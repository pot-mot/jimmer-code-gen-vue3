import {Graph} from "@antv/x6"
import {initGraph} from "@/components/global/graphEditor/common/init.ts";

import {AssociationEdgeConnecting} from "@/components/pages/ModelEditor/graph/associationEdge/define.ts";
import {DEFAULT_ZOOM_RANGE} from "@/components/pages/ModelEditor/constant.ts";
import {useInteractionToFront, useStyle} from "@/components/pages/ModelEditor/graph/highlight.ts";
import {useAssociationType} from "@/components/pages/ModelEditor/graph/associationEdge/associationType.ts";
import {useAssociationFake} from "@/components/pages/ModelEditor/graph/associationEdge/associationFake.ts";

export const initModelEditor = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = initGraph(
        container,
        wrapper,
        {
            mousewheel: {
                enabled: true,
                ...DEFAULT_ZOOM_RANGE,
            },
            panning: {
                enabled: true,
                eventTypes: ['rightMouseDown'],
            },

            connecting: AssociationEdgeConnecting as any,
            magnetThreshold: 'onleave'
        }
    )

    useStyle(graph)
    useInteractionToFront(graph)
    useAssociationType(graph)
    useAssociationFake(graph)

    return graph
}
