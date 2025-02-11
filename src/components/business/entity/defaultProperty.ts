import type {GenPropertyEntityConfigInput} from "@/api/__generated/model/static";

export const getDefaultProperty = (): GenPropertyEntityConfigInput => {
    return {
        associationType: undefined,
        body: undefined,
        comment: "",
        dissociateAnnotation: undefined,
        idProperty: false,
        generatedId: false,
        generatedIdAnnotation: undefined,
        logicalDeletedAnnotation: undefined,
        idView: false,
        idViewTarget: undefined,
        inDetailView: false,
        inInsertInput: false,
        inListView: false,
        inLongAssociationInput: false,
        inLongAssociationView: false,
        inOptionView: false,
        inShortAssociationView: false,
        inSpecification: false,
        inUpdateInput: false,
        inputNotNull: undefined,
        joinColumnMetas: undefined,
        joinTableMeta: undefined,
        keyGroup: undefined,
        keyProperty: false,
        listType: false,
        logicalDelete: false,
        longAssociation: false,
        specialFormType: undefined,
        mappedBy: undefined,
        name: "",
        orderKey: 0,
        otherAnnotation: undefined,
        overwriteComment: true,
        overwriteName: true,
        remark: "",
        type: "",
        typeNotNull: true,
        enumId: undefined,
    }
}
