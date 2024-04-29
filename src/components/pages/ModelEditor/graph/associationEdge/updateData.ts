import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {Edge} from '@antv/x6'
import {DeepReadonly} from "vue";

export const updateAssociationEdgeData = (edge: Edge, newAssociation: DeepReadonly<GenAssociationModelInput>) => {
    edge.setData({...edge.getData(), association: newAssociation}, {overwrite: true})
}
