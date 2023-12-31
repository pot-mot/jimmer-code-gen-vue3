import {Edge, Graph} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_LABEL_TEXT_SELECTOR, COMMON_COLOR,
    DEFAULT_ASSOCIATION_TYPE,
    SWITCH_ASSOCIATION_TYPE_FLAG
} from "@/components/business/modelGraphEditor/constant.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {judgeClickBox} from "@/utils/clickBox.ts";
import {
    reverseSinglePartAssociationType,
} from "@/components/business/modelGraphEditor/associationEdge/associationType.ts";
import Label = Edge.Label;
import {syncAssociationName} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";
import {setAssociationFake} from "@/components/business/modelGraphEditor/associationEdge/associationFake.ts";

export const createBaseLabel = (attrs?: any, oldLabel?: Label, bodyAttrs?: any) => {
    return {
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'text',
                selector: ASSOCIATION_LABEL_TEXT_SELECTOR,
            },
        ],
        attrs: {
            ASSOCIATION_LABEL_TEXT_SELECTOR: {
                ...oldLabel?.attrs?.ASSOCIATION_LABEL_TEXT_SELECTOR,
                ...attrs
            },
            body: {
                ref: ASSOCIATION_LABEL_TEXT_SELECTOR,
                fill: '#f5f5f5',
                ...bodyAttrs,
            }
        },
    }
}

export const getAssociationTypeLabel = (edge: Edge): { label: Edge.Label, index: number } | undefined => {
    const AssociationTypeLabels = edge.labels
        .map((label, index) => ({label, index}))
        .filter(({label}) => label.attrs && ASSOCIATION_LABEL_TEXT_SELECTOR in label.attrs)

    if (AssociationTypeLabels.length == 0) {
        return
    }

    return AssociationTypeLabels[0]
}
const setAssociationTypeData = (edge: Edge, associationType: AssociationType) => {
    edge.setData({association: {associationType}}, {deep: true})
    if (associationType == 'MANY_TO_MANY') {
        setAssociationFake(edge, false)
    }
}
const setAssociationTypeDataLabel = (edge: Edge, associationType: AssociationType) => {
    const oldLabel = getAssociationTypeLabel(edge)

    if (oldLabel) {
        edge.setLabelAt(oldLabel.index, createBaseLabel({
            text: associationType
        }, oldLabel.label))
    } else {
        edge.appendLabel(createBaseLabel({
            text: associationType,
            fill: COMMON_COLOR,
            fontWeight: 'normal'
        }))
    }
}
export const setAssociationType = (edge: Edge, associationType: AssociationType) => {
    setAssociationTypeDataLabel(edge, associationType)
    setAssociationTypeData(edge, associationType)
}
export const getAssociationType = (edge: Edge): AssociationType | undefined => {
    const dataAssociationType = edge.getData()?.association.associationType

    const labelAssociationType = getAssociationTypeLabel(edge)?.label.attrs?.ASSOCIATION_LABEL_TEXT_SELECTOR?.text

    if (!!dataAssociationType) {
        if (dataAssociationType == labelAssociationType) {
            return dataAssociationType
        } else {
            setAssociationTypeDataLabel(edge, dataAssociationType)
            return dataAssociationType
        }
    }
}
const syncAssociationType = (edge: Edge, defaultAssociationType: AssociationType = DEFAULT_ASSOCIATION_TYPE) => {
    const currentAssociationType = getAssociationType(edge)
    if (!currentAssociationType) {
        setAssociationType(edge, defaultAssociationType)
    }
}
/**
 * 应用 AssociationType
 */
export const useAssociationType = (graph: Graph) => {
    /**
     * 同步 label 为 data
     */
    graph.on('edge:added', ({edge}) => {
        syncAssociationType(edge)
    })
    graph.on('edge:change:data', ({edge}) => {
        syncAssociationType(edge)
    })

    /**
     * 当 Edge 的 AssociationLabel 被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 SWITCH_ASSOCIATION_TYPE_FLAG 阻止初次点击效果
     */
    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey || e.metaKey) return

        if (edge.shape != ASSOCIATION_EDGE) return

        const edgeWithFlag = edge as Edge & { SWITCH_ASSOCIATION_TYPE_FLAG?: boolean }

        if (!(SWITCH_ASSOCIATION_TYPE_FLAG in edgeWithFlag)) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = true
            // 使 SWITCH_ASSOCIATION_TYPE_FLAG 不被序列化
            Object.defineProperty(edgeWithFlag, SWITCH_ASSOCIATION_TYPE_FLAG, {enumerable: false, writable: true})
            return
        } else if (!edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = true
            return
        }

        const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${edge.id}"]`)! as SVGGElement

        const label = edgeSvg.querySelector('.x6-edge-label') as SVGGElement

        const labelBox = label.getBoundingClientRect()

        if (!judgeClickBox(labelBox, e.clientX, e.clientY)) return

        e.preventDefault()
        e.stopPropagation()

        graph.startBatch("Update association_edge type")

        const oldAssociationType = getAssociationType(edge)

        const left = (e.clientX - labelBox.x) < (labelBox.width / 2)
        setAssociationType(
            edge,
            reverseSinglePartAssociationType(
                oldAssociationType ? oldAssociationType : DEFAULT_ASSOCIATION_TYPE,
                left ? "SOURCE" : "TARGET")
        )
        syncAssociationName(edge)

        graph.stopBatch("Update association_edge type")
    })
    /**
     * 在 edge:unselected 后，重置 SWITCH_ASSOCIATION_TYPE_FLAG
     */
    graph.on('edge:unselected', ({edge}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        const edgeWithFlag = edge as Edge & { SWITCH_ASSOCIATION_TYPE_FLAG?: boolean }

        if ((SWITCH_ASSOCIATION_TYPE_FLAG in edgeWithFlag) && edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = false
            return
        }
    })
}
