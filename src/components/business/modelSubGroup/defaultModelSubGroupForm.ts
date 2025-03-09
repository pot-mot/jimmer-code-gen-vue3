import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";

export const getDefaultGenModelSubGroup = (): GenModelInput_TargetOf_subGroups => {
    return {
        name: "",
        comment: "",
        subPackagePath: "",
        style: ""
    }
}