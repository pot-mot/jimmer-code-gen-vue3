import {Edge, Graph} from "@antv/x6";
import {judgeClickBox} from "@/utils/clickBox.ts";
import {AssociationType, AssociationType_CONSTANTS} from "@/api/__generated/model/enums";
import {ASSOCIATION_LABEL_TEXT_SELECTOR, SWITCH_ASSOCIATION_TYPE_FLAG} from "@/components/business/model/constant.ts";

const createBaseLabel = (associationType: AssociationType) => {
    return {
        markup: [
            {
                tagName: 'text',
                selector: ASSOCIATION_LABEL_TEXT_SELECTOR,
            },
        ],
        attrs: {
            ASSOCIATION_LABEL_TEXT_SELECTOR: {
                text: associationType,
            },
        },
    }
}

const getAssociationTypeLabel = (edge: Edge): {label: Edge.Label, index: number} | undefined => {
    const AssociationTypeLabels = edge.labels
        .map((label, index) => ({ label, index }))
        .filter(({ label }) => label.attrs && ASSOCIATION_LABEL_TEXT_SELECTOR in label.attrs)

    if (AssociationTypeLabels.length == 0) {
        return
    } else if (AssociationTypeLabels.length > 1) {
        for (let i = 0; i < AssociationTypeLabels.length - 1; i++) {
            edge.removeLabelAt(AssociationTypeLabels[i].index)
        }
        return AssociationTypeLabels[AssociationTypeLabels.length - 1]
    } else if (AssociationTypeLabels.length == 1) {
        return AssociationTypeLabels[0]
    }
}

const setAssociationTypeData = (edge: Edge, associationType: AssociationType) => {
    edge.setData({association: {associationType}}, {deep: true})
}

const setAssociationTypeDataLabel = (edge: Edge, associationType: AssociationType) => {
    const newLabel = createBaseLabel(associationType)

    const oldLabel = getAssociationTypeLabel(edge)

    if (oldLabel) {
        edge.setLabelAt(oldLabel.index, newLabel)
    } else {
        edge.appendLabel(newLabel)
    }
}

export const setAssociationType = (edge: Edge, associationType: AssociationType) => {
    setAssociationTypeDataLabel(edge, associationType)
    setAssociationTypeData(edge, associationType)
}

export const getAssociationType = (edge: Edge): AssociationType | undefined => {
    const dataAssociationType = edge.getData()?.association.associationType

    // @ts-ignore
    const labelAssociationType = getAssociationTypeLabel(edge)?.label.attrs[ASSOCIATION_LABEL_TEXT_SELECTOR]?.text

    if (!!dataAssociationType) {
        if (dataAssociationType == labelAssociationType) {
            return dataAssociationType
        } else {
            setAssociationTypeDataLabel(edge, dataAssociationType)
            return dataAssociationType
        }
    }
}

const setAssociationTypeIfNotExisted = (edge: Edge, defaultAssociationType: AssociationType = 'MANY_TO_ONE') => {
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
     * 在边被创建时或数据改变时获取 AssociationType，以同步 label 为 data
     */
    graph.on('edge:added', ({edge}) => {
        setAssociationTypeIfNotExisted(edge)
    })
    graph.on('edge:change:data', ({edge}) => {
        setAssociationTypeIfNotExisted(edge)
    })

    /**
     * 当 Edge 被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 SWITCH_ASSOCIATION_TYPE_FLAG 阻止初次点击效果
     */
    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey || e.metaKey) return

        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_TYPE_FLAG?: boolean}

        if (!(SWITCH_ASSOCIATION_TYPE_FLAG in edgeWithFlag)) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = true
            // 使 SWITCH_ASSOCIATION_TYPE_FLAG 不被序列化
            Object.defineProperty(edgeWithFlag, SWITCH_ASSOCIATION_TYPE_FLAG, { enumerable: false, writable: true })
            return;
        } else if (!edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = true
            return
        }

        const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${edge.id}"]`)! as SVGGElement

        const label = edgeSvg.querySelector('.x6-edge-label') as SVGGElement

        const labelBox = label.getBoundingClientRect()

        if (judgeClickBox(labelBox, e.clientX, e.clientY)) {
            e.preventDefault()
            e.stopPropagation()

            for (let i = 0; i < AssociationType_CONSTANTS.length; i++) {
                if (getAssociationType(edge) == AssociationType_CONSTANTS[i]) {
                    setAssociationTypeData(edge, AssociationType_CONSTANTS[i + 1 < AssociationType_CONSTANTS.length ? i + 1 : 0])
                    break
                }
            }
        }
    })
    /**
     * 在 edge:unselected 后，重置 SWITCH_ASSOCIATION_TYPE_FLAG
     */
    graph.on('edge:unselected', ({edge}) => {
        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_TYPE_FLAG?: boolean}

        if ((SWITCH_ASSOCIATION_TYPE_FLAG in edgeWithFlag) && edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_TYPE_FLAG = false
            return
        }
    })
}
