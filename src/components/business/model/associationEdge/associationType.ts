import {Edge, Graph} from "@antv/x6";
import {GenAssociationMatchView} from "@/api/__generated/model/static";
import {judgeClickBox} from "@/utils/clickBox.ts";
import {AssociationType, AssociationType_CONSTANTS} from "@/api/__generated/model/enums";
import {cloneDeep} from "lodash";
import {baseLabel} from "@/components/business/model/associationEdge/define.ts";
import {edgeToAssociation} from "@/components/pages/AssociationEditor/graph/associationEdge.ts";
import {
    ASSOCIATION_LABEL_TEXT_SELECTOR
} from "@/components/business/model/constant.ts";

export const setAssociationType = (edge: Edge, associationType: AssociationType) => {
    edge.setLabelAt(0, {...cloneDeep(baseLabel), attrs: {ASSOCIATION_LABEL_TEXT_SELECTOR: {text: associationType}}})
    edge.setData({association: {associationType}}, {deep: true})
}

export const getAssociationType = (edge: Edge): AssociationType | undefined => {
    const dataAssociationType = edge.getData()?.association.associationType

    // @ts-ignore
    const labelAssociationType = edge.getLabelAt(0)?.attrs[ASSOCIATION_LABEL_TEXT_SELECTOR]?.text

    if (!!dataAssociationType) {
        if (dataAssociationType == labelAssociationType) {
            return dataAssociationType
        } else {
            setAssociationType(edge, dataAssociationType)
            return dataAssociationType
        }
    }
}
export const getAssociations = (graph: Graph): GenAssociationMatchView[] => {
    return graph.getEdges().map(edgeToAssociation)
}
export const useAssociationType = (graph: Graph) => {
    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey || e.metaKey) return

        if (!graph.getSelectedCells().map(it => it.id).includes(edge.id)) return;

        e.preventDefault()
        e.stopPropagation()

        const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${edge.id}"]`)! as SVGGElement

        const label = edgeSvg.querySelector('.x6-edge-label') as SVGGElement

        const labelBox = label.getBoundingClientRect()

        if (judgeClickBox(labelBox, e.clientX, e.clientY)) {
            for (let i = 0; i < AssociationType_CONSTANTS.length; i++) {
                if (getAssociationType(edge) == AssociationType_CONSTANTS[i]) {
                    setAssociationType(edge, AssociationType_CONSTANTS[i + 1 < AssociationType_CONSTANTS.length ? i + 1 : 0])
                    break
                }
            }
        }
    })
}
