import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {Edge} from "@antv/x6"
import {ASSOCIATION_EDGE} from "@/components/business/modelEditor/constant.ts";
import {
    createAssociationName
} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";

export const getAssociationSourceLabel = (association: GenAssociationModelInput) => {
    const tempEdgeName: string[] = []

    if (association.sourceTable) {
        tempEdgeName.push(association.sourceTable.name)
        tempEdgeName.push(' . ')
        tempEdgeName.push(association.columnReferences.map(it => it.sourceColumn.name).join(","))
    } else {
        tempEdgeName.push('[无来源] ')
    }

    return tempEdgeName.join('')
}

export const getAssociationTargetLabel = (association: GenAssociationModelInput) => {
    const tempEdgeName: string[] = []

    if (association.targetTable) {
        tempEdgeName.push(association.targetTable.name)
        tempEdgeName.push(' . ')
        tempEdgeName.push(association.columnReferences.map(it => it.targetColumn.name).join(","))
    } else {
        tempEdgeName.push(' [无目标]')
    }

    return tempEdgeName.join('')
}

export const syncAssociationName = (
    edge: Edge
) => {
    if (edge.shape === ASSOCIATION_EDGE && edge.getData()?.association !== undefined) {
        const association = edge.getData().association as GenAssociationModelInput
        const newName = createAssociationName(association)
        if (newName !== association.name)
            edge.setData({association: {name: newName}}, {deep: true})
    }
}
