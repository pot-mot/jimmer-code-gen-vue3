import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {Edge} from "@antv/x6"
import {ASSOCIATION_EDGE} from "@/components/pages/ModelEditor/constant.ts";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";

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
