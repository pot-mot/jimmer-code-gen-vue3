import {Graph} from "@antv/x6"
import {initGraph} from "@/components/business/graphEditor/common/init.ts";

import {AssociationEdgeConnecting} from "@/components/business/modelGraphEditor/associationEdge/define.ts";
import {useEdgeAssociationData} from "@/components/pages/ModelEditor/graph/associationEdge.ts";
import {useAssociationFake} from "@/components/business/modelGraphEditor/associationEdge/associationFake.ts";
import {DEFAULT_ZOOM_RANGE} from "@/components/business/modelGraphEditor/constant.ts";
import {
    useAssociationType
} from "@/components/business/modelGraphEditor/associationEdge/associationTypeLabels.ts";

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

    useEdgeAssociationData(graph)
    useAssociationType(graph)
    useAssociationFake(graph)

    return graph
}
