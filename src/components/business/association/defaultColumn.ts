import {GenAssociationModelInput} from "@/api/__generated/model/static";

export const getDefaultAssociation = (): GenAssociationModelInput => {
    return {
        name: "",
        sourceTableName: "",
        targetTableName: "",
        type: "MANY_TO_ONE",
        columnReferences: [
            {
                sourceColumnName: "",
                targetColumnName: "",
            },
        ],
        fake: false,
        dissociateAction: undefined,
        updateAction: "",
        deleteAction: ""
    }
}
