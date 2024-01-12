import {Graph} from "@antv/x6"
import {initGraph} from "@/components/global/graphEditor/common/init.ts";

import {AssociationEdgeConnecting} from "@/components/pages/ModelEditor/graph/associationEdge/define.ts";
import {useAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/associationEdge.ts";
import {useAssociationFake} from "@/components/pages/ModelEditor/graph/associationEdge/associationFake.ts";
import {DEFAULT_ZOOM_RANGE} from "@/components/business/modelEditor/constant.ts";
import {
    useAssociationType
} from "@/components/pages/ModelEditor/graph/associationEdge/associationTypeButton.ts";
import {useHoverToFront, useStyle} from "@/components/pages/ModelEditor/graph/highlight/highlight.ts";

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
                eventTypes: ['rightMouseDown']
            },

            connecting: AssociationEdgeConnecting as any,
            magnetThreshold: 'onleave'
        }
    )

    useStyle(graph)
    useHoverToFront(graph)
    useAssociationEdgeData(graph)
    useAssociationType(graph)
    useAssociationFake(graph)

    return graph
}
