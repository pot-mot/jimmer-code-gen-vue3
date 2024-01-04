import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";
import {GenEnumItemsInput, GenEnumItemsInput_TargetOf_items} from "@/api/__generated/model/static";

export const getDefaultEnum = (): GenEnumItemsInput => {
    const contextStore = useGenContextStore()

    return {
        name: "",
        packagePath: contextStore.packagePath,
        comment: "",
        remark: "",
        items: [],
        orderKey: 0,
    }
}

export const getDefaultEnumItem = (): GenEnumItemsInput_TargetOf_items => {
    return {
        name: "",
        mappedValue: "",
        comment: "",
        remark: "",
        orderKey: 0,
    }
}
