import {
    COMMON_COLOR
} from "@/components/business/graphEditor/constant.ts";
import {cloneDeep} from "lodash";
import {Shape} from "@antv/x6";
import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";
import {sendMessage} from "@/utils/message.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {getEdgeConnectData} from "@/components/business/model/associationEdge/connectData.ts";
import {ASSOCIATION_LABEL_TEXT_SELECTOR} from "@/components/business/model/constant.ts";
import {setAssociationType} from "@/components/business/model/associationEdge/associationType.ts";

export const baseLabel = {
    markup: [
        {
            tagName: 'text',
            selector: ASSOCIATION_LABEL_TEXT_SELECTOR,
        },
    ],
    attrs: {
        ASSOCIATION_LABEL_TEXT_SELECTOR: {
            text: '',
        },
    },
}
export const baseAssociationEdge = {
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: 1,
        },
    },
    labels: [
        cloneDeep(baseLabel)
    ],
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseAssociationEdge,
            router: erRouter
        })
    },
    validateEdge({edge}) {
        // @ts-ignore d.ts 的类型声明与 ts 不一致
        const connectData = getEdgeConnectData(edge)

        if (!connectData) return false

        const {sourceColumn, targetColumn} = connectData

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

        // @ts-ignore
        setAssociationType(edge, "MANY_TO_ONE")

        return true
    },

    allowMulti: 'withPort',
    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}
