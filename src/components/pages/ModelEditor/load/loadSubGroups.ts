import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {
    jsonEqualOrRenameDuplicateHandler,
    mergeWithExisted
} from "@/components/pages/ModelEditor/load/mergeWithExisted.ts";

export const loadSupGroups = (
    subGroups:  DeepReadonly<Array<GenModelInput_TargetOf_subGroups>>,
    existedSubGroups: DeepReadonly<Array<GenModelInput_TargetOf_subGroups>>,
): {
    allSubGroups: Array<GenModelInput_TargetOf_subGroups>,
    newSubGroups: Array<GenModelInput_TargetOf_subGroups>,
    subGroupNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_subGroups[]>>,
} => {
    const {
        allItems: allSubGroups,
        newItems: newSubGroups,
        keyToItemsMap: subGroupNameMap,
    } = mergeWithExisted<GenModelInput_TargetOf_subGroups, string>(
        subGroups,
        existedSubGroups,
        it => it.name,
        jsonEqualOrRenameDuplicateHandler
    )

    return {
        allSubGroups,
        newSubGroups,
        subGroupNameMap
    }
}
