import {erRouter, orthRouter} from "@/components/global/graphEditor/edge/edgeRouter.ts";
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
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
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
        try {
            if (edge.shape !== ASSOCIATION_EDGE) return true

            const edgeConnect = getEdgeConnect(edge as any)
            if (!edgeConnect) return false

            const edgeConnectData = getEdgeConnectEntities(edgeConnect)
            if (!edgeConnectData) return false

            const {
                sourceTable,
                sourceColumn,
                targetTable,
                targetColumn
            } = edgeConnectData

            // 当两侧不都是主键（即映射为多对多的情况），进行类型判断
            if (
                !(sourceColumn.partOfPk && targetColumn.partOfPk) &&
                (sourceColumn.typeCode !== targetColumn.typeCode) ||
                (
                    (sourceColumn.overwriteByRaw || targetColumn.overwriteByRaw) &&
                    sourceColumn.rawType !== targetColumn.rawType
                )
            ) {
                sendMessage('关联两端类型不一致', 'warning')
                return false
            }

            if (targetTable.type === 'SUPER_TABLE') {
                sendMessage('关联目标表不能是上级表', 'warning')
                return false
            }

            if (sourceTable.type === 'SUPER_TABLE' && sourceColumn.partOfPk) {
                sendMessage('上级表主键不可关联至其他表', 'warning')
                return false
            }

            if (!(sourceColumn.partOfPk || targetColumn.partOfPk)) {
                sendMessage('关联源与目标中至少一方需要是主键', 'warning')
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
        } catch (e) {
            return false
        }
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

    let associationType = DEFAULT_ASSOCIATION_TYPE

    if (sourceColumn.partOfPk) {
        if (targetColumn.partOfPk) {
            associationType = "MANY_TO_MANY"
        } else {
            associationType = "ONE_TO_MANY"
        }
    }

    const newAssociation: GenAssociationModelInput = {
        name: "",
        sourceTableName: sourceTable.name,
        targetTableName: targetTable.name,
        columnReferences: [{
            sourceColumnName: sourceColumn.name,
            targetColumnName: targetColumn.name,
        }],
        type: associationType,
        fake: !(useGenConfigContextStore().context.realFk),
        dissociateAction: undefined,
        updateAction: "",
        deleteAction: ""
    }

    newAssociation.name = createAssociationName(
        newAssociation,
        sourceTable.type === 'SUPER_TABLE',
        targetTable.type === 'SUPER_TABLE'
    )

    return newAssociation
}
