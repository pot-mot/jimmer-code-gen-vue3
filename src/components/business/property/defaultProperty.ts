import type {GenPropertyEntityConfigInput} from "@/api/__generated/model/static";

export const getDefaultProperty = (): GenPropertyEntityConfigInput => {
    return {
        body: undefined,
        comment: "",
        inDetailView: false,
        inInsertInput: false,
        inListView: false,
        inLongAssociationInput: false,
        inLongAssociationView: false,
        inOptionView: false,
        inShortAssociationView: false,
        inSpecification: false,
        inUpdateInput: false,
        listType: false,
        specialFormType: undefined,
        name: "",
        orderKey: 0,
        otherAnnotation: undefined,
        overwriteComment: true,
        overwriteName: true,
        remark: "",
        type: "",
        typeNotNull: true,
        enumId: undefined,
        typeTableId: undefined,
        longAssociation: false,
    }
}
