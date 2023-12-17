import {Graph} from "@antv/x6"
import {initGraph} from "@/components/business/graphEditor/common/init.ts";
import {defaultZoomRange} from "@/components/business/graphEditor/constant.ts";

import {AssociationEdgeConnecting} from "@/components/business/model/associationEdge/define.ts";
import {addEdgeDataSyncListener} from "@/components/pages/ModelEditor/graph/modelEdge.ts";
import {useAssociationType} from "@/components/business/model/associationEdge/associationType.ts";

export const initModelEditor = (container: HTMLElement, wrapper: HTMLElement): Graph => {
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

    addEdgeDataSyncListener(graph)
    useAssociationType(graph)

    return graph
}
