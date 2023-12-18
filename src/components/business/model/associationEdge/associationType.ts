import {Edge, Graph} from "@antv/x6";
import {judgeClickBox} from "@/utils/clickBox.ts";
import {AssociationType, AssociationType_CONSTANTS} from "@/api/__generated/model/enums";
import {cloneDeep} from "lodash";
import {baseLabel} from "@/components/business/model/associationEdge/define.ts";
import {ASSOCIATION_LABEL_TEXT_SELECTOR, SWITCH_ASSOCIATION_FLAG} from "@/components/business/model/constant.ts";

const setAssociationTypeData = (edge: Edge, associationType: AssociationType) => {
    edge.setData({association: {associationType}}, {deep: true})
}

const setAssociationTypeDataLabel = (edge: Edge, associationType: AssociationType) => {
    edge.setLabelAt(0, {...cloneDeep(baseLabel), attrs: {ASSOCIATION_LABEL_TEXT_SELECTOR: {text: associationType}}})
}

export const setAssociationType = (edge: Edge, associationType: AssociationType) => {
    setAssociationTypeDataLabel(edge, associationType)
    setAssociationTypeData(edge, associationType)
}

export const getAssociationType = (edge: Edge): AssociationType | undefined => {
    const dataAssociationType = edge.getData()?.association.associationType

    // @ts-ignore
    const labelAssociationType = edge.getLabelAt(0)?.attrs[ASSOCIATION_LABEL_TEXT_SELECTOR]?.text

    if (!!dataAssociationType) {
        if (dataAssociationType == labelAssociationType) {
            return dataAssociationType
        } else {
            setAssociationTypeDataLabel(edge, dataAssociationType)
            return dataAssociationType
        }
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
        getAssociationType(edge)
    })
    graph.on('edge:change:data', ({edge}) => {
        getAssociationType(edge)
    })

    /**
     * 当 Edge 被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 SWITCH_ASSOCIATION_FLAG 阻止初次点击效果
     */
    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey || e.metaKey) return

        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_FLAG?: boolean}

        if (!(SWITCH_ASSOCIATION_FLAG in edgeWithFlag)) {
            edgeWithFlag.SWITCH_ASSOCIATION_FLAG = true
            // 使 SWITCH_ASSOCIATION_FLAG 不被序列化
            Object.defineProperty(edgeWithFlag, SWITCH_ASSOCIATION_FLAG, { enumerable: false, writable: true })
            return;
        } else if (!edgeWithFlag.SWITCH_ASSOCIATION_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_FLAG = true
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
     * 在 edge:unselected 后，重置 SWITCH_ASSOCIATION_FLAG
     */
    graph.on('edge:unselected', ({edge}) => {
        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_FLAG?: boolean}

        if ((SWITCH_ASSOCIATION_FLAG in edgeWithFlag) && edgeWithFlag.SWITCH_ASSOCIATION_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_FLAG = false
            return
        }
    })
}
