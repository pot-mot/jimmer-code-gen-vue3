import {GenAssociationModelInput} from "@/api/__generated/model/static";

export const getDefaultAssociation = (): GenAssociationModelInput => {
    return {
        name: "",
        sourceTableName: "",
        targetTableName: "",
        type: "MANY_TO_MANY",
        columnReferences: [
            {
                sourceColumnName: "",
                targetColumnName: "",
            },
        ],
        fake: false,
        dissociateAction: "DELETE",
        updateAction: "CASCADE",
        deleteAction: "CASCADE"
    }
}