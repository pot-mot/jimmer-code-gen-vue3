import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";
import {sendMessage} from "@/utils/message.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {getEdgeConnectData} from "@/components/business/modelGraphEditor/associationEdge/connectData.ts";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_LINE_WIDTH, COMMON_COLOR,
} from "@/components/business/modelGraphEditor/constant.ts";

export const associationEdgeBase = {
    inherit: 'edge',
    router: erRouter,
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: ASSOCIATION_LINE_WIDTH,
        },
    }
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    createEdge({sourceCell}) {
        return this.addEdge({
            shape: ASSOCIATION_EDGE,
            source: sourceCell
        })
    },

    validateEdge({edge}) {
        if (edge.shape != ASSOCIATION_EDGE) return true

        // @ts-ignore d.ts 的类型声明与 ts 不一致
        const connectData = getEdgeConnectData(edge)

        if (!connectData) return false

        const {sourceColumn, targetColumn} = connectData

        if (!sourceColumn || !targetColumn) return false

        if (sourceColumn.typeCode != targetColumn.typeCode || sourceColumn.type != targetColumn.type) {
            sendMessage('关联两端类型不一致', 'warning')
            return false
        }

        // 在连接建立后调整 router
        if (edge.getTargetCellId() == edge.getSourceCellId()) {
            edge.router = orthRouter
        } else {
            edge.router = erRouter
        }

        return true
    },

    allowMulti: 'withPort',
    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}
