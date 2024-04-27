import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {Edge} from '@antv/x6'

export const updateAssociationEdgeData = (edge: Edge, newAssociation: GenAssociationModelInput) => {
    edge.setData({...edge.getData(), association: newAssociation}, {overwrite: true})
}
