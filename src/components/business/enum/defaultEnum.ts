import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";
import {GenEnumItemsInput} from "@/api/__generated/model/static";
import {GenEnumItemsInput_TargetOf_items} from "@/api/__generated/model/static/GenEnumItemsInput.ts";

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
