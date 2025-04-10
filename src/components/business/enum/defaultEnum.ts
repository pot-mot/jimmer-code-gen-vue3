import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {GenModelInput_TargetOf_enums, GenModelInput_TargetOf_enums_TargetOf_items} from "@/api/__generated/model/static";

export const getDefaultEnum = (): GenModelInput_TargetOf_enums => {
    const contextStore = useGenConfigContextStore()

    return {
        name: "",
        packagePath: contextStore.context.packagePath + ".enums",
        comment: "",
        remark: "",
        items: [],
    }
}

export const getDefaultEnumItem = (): GenModelInput_TargetOf_enums_TargetOf_items => {
    return {
        name: "",
        mappedValue: "",
        comment: "",
        remark: "",
        orderKey: 0,
        defaultItem: false,
    }
}
