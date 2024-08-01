import {erRouter, orthRouter} from "@/components/global/graphEditor/edgeRouter.ts";
import {sendMessage} from "@/message/message.ts";
import {Options} from "@antv/x6/es/graph/options";
import {
    ASSOCIATION_EDGE,
    COMMON_COLOR,
    DEFAULT_ASSOCIATION_TYPE,
    LINE_WIDTH
} from "@/components/pages/ModelEditor/constant.ts";
import {
    EdgeConnectEntities,
    getEdgeConnectEntities,
} from "@/components/pages/ModelEditor/graph/associationEdge/edgeConnectEntities.ts";
import {getEdgeConnect} from "@/components/global/graphEditor/edge/connectData.ts";
import Connecting = Options.Connecting;
import {
    GenAssociationModelInput,
} from "@/api/__generated/model/static";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";

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
        if (edge.shape !== ASSOCIATION_EDGE) return true

        const edgeConnect = getEdgeConnect(edge as any)
        if (!edgeConnect) return false

        const edgeConnectData = getEdgeConnectEntities(edgeConnect)
        if (!edgeConnectData) return false

        const {
            sourceColumn,
            targetColumn
        } = edgeConnectData

        if (
            (sourceColumn.typeCode !== targetColumn.typeCode) ||
            (
                (sourceColumn.overwriteByRaw || targetColumn.overwriteByRaw) &&
                sourceColumn.rawType !== targetColumn.rawType
            )
        ) {
            sendMessage('关联两端类型不一致', 'warning')
            return false
        }

        // 在连接建立后调整 router
        if (edge.getTargetCellId() === edge.getSourceCellId()) {
            edge.router = orthRouter
        } else {
            edge.router = erRouter
        }

        const association = createAssociation(edgeConnectData)
        updateAssociationEdgeData(edge as any, association)

        return true
    },

    allowMulti: 'withPort',
    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}

const createAssociation = (
    edgeConnectEntities: EdgeConnectEntities
): GenAssociationModelInput => {
    const {
        sourceTable,
        targetTable,
        sourceColumn,
        targetColumn,
    } = edgeConnectEntities

    const newAssociation: GenAssociationModelInput = {
        name: "",
        sourceTableName: sourceTable.name,
        targetTableName: targetTable.name,
        columnReferences: [{
            sourceColumnName: sourceColumn.name,
            targetColumnName: targetColumn.name,
        }],
        type: DEFAULT_ASSOCIATION_TYPE,
        fake: !(useGenConfigContextStore().context.realFk),
        dissociateAction: undefined,
        updateAction: "",
        deleteAction: ""
    }

    newAssociation.name = createAssociationName(newAssociation)

    return newAssociation
}
