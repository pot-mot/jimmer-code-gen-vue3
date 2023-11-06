import {Edge, Shape} from "@antv/x6";
import {AssociationType} from "../../../api/__generated/model/enums";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {erRouter, orthRouter} from "../../../utils/graphEditor/router.ts";
import {COMMON_COLOR, MANY_TO_ONE} from "../../../utils/graphEditor/constant.ts";

const baseModelEdge = {
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: 1,
        },
    },
    labels: [{
        markup: [
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            label: {
                text: MANY_TO_ONE
            },
        }
    }],
    data: {
        selectFlag: false
    }
}

export const ModelEdgeConnecting: Partial<Connecting> = {
    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseModelEdge,
            router: erRouter
        })
    },
    validateEdge(edge) {
        // 在连接建立后调整 router
        if (edge.edge.getTargetCellId() == edge.edge.getSourceCellId()) {
            edge.edge.router = orthRouter
        }
        return true
    },

    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, label)
}

export const getLabel = (edge: Edge): AssociationType => {
    return edge.labels[0].attrs!.label.text as AssociationType;
}

// export const useSwitchAssociationType = (graph: Graph) => {
//     graph.on('edge:unselected', (cell) => {
//         if (!cell) return
//         cell.edge.getData().selectFlag = false
//     })
//
//     graph.on('edge:click', ({edge, e}) => {
//         if (!edge || e.ctrlKey) return
//
//         if (!edge.getData().selectFlag) {
//             edge.getData().selectFlag = true
//             return
//         }
//
//         if (getLabel(edge) == MANY_TO_ONE) {
//             setLabel(edge, ONE_TO_ONE)
//         } else {
//             setLabel(edge, MANY_TO_ONE)
//         }
//     })
// }