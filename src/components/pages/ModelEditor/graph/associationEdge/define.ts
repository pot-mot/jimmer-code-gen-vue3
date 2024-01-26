import {erRouter, orthRouter} from "@/components/global/graphEditor/edgeRouter.ts";
import {sendMessage} from "@/utils/message.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {
    ASSOCIATION_EDGE,
    LINE_WIDTH, COMMON_COLOR
} from "@/components/business/modelEditor/constant.ts";
import {
    getTableColumnByEdgeConnect,
    setEdgeAssociationData
} from "@/components/pages/ModelEditor/graph/associationEdge/associationData.ts";
import {getEdgeConnect} from "@/components/global/graphEditor/edge/connectData.ts";

export const associationEdgeBase = {
    inherit: 'edge',
    router: erRouter,
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: LINE_WIDTH,
        },
    }
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    createEdge({sourceCell}) {
        return this.addEdge({
            shape: ASSOCIATION_EDGE,
            source: sourceCell,
        })
    },

    validateEdge({edge}) {
        if (edge.shape != ASSOCIATION_EDGE) return true

        const edgeConnect = getEdgeConnect(edge as any)
        if (!edgeConnect) return false

        const edgeConnectData = getTableColumnByEdgeConnect(edgeConnect)
        if (!edgeConnectData) return false

        const {sourceColumn, targetColumn} = edgeConnectData

        if (!sourceColumn || !targetColumn) return false

        if (sourceColumn.typeCode != targetColumn.typeCode || sourceColumn.rawType != targetColumn.rawType) {
            sendMessage('关联两端类型不一致', 'warning')
            return false
        }

        setEdgeAssociationData(edge as any)

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
