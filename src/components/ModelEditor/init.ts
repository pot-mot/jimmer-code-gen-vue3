import {Graph} from "@antv/x6"
import {initGraph} from "../../utils/graphEditor/init.ts";
import {defaultZoomRange} from "../AssociationEditor/constant.ts";
import {ModelEdgeConnecting} from "./edge/ModelAssociationEdge.ts";

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
            connecting: ModelEdgeConnecting as any,
        }
    )
}