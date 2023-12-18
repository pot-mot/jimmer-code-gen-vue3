import {Graph} from "@antv/x6"
import {initGraph} from "@/components/business/graphEditor/common/init.ts";
import {defaultZoomRange} from "@/components/business/graphEditor/constant.ts";

import {AssociationEdgeConnecting} from "@/components/business/model/associationEdge/define.ts";
import {useAssociationType} from "@/components/business/model/associationEdge/associationType.ts";
import {useAssociationFake} from "@/components/business/model/associationEdge/associationFake.ts";

export const initAssociationEditor = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = initGraph(
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

    useAssociationType(graph)
    useAssociationFake(graph)

    return graph
}
