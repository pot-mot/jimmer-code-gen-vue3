import {GenModelInput_TargetOf_enums, GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {
    jsonEqualOrRenameDuplicateHandler,
    mergeWithExisted
} from "@/components/pages/ModelEditor/load/mergeWithExisted.ts";

const keepEnumSuperTableLegal = (
    enums: GenModelInput_TargetOf_enums[],
    subGroupNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_subGroups[]>>,
) => {
    for (const genEnum of enums) {
        if (genEnum.subGroup) {
            const matchedSubGroups = subGroupNameMap.get(genEnum.subGroup.name)
            if (matchedSubGroups === undefined || matchedSubGroups.length === 0) {
                genEnum.subGroup = undefined
            } else if (matchedSubGroups.length > 1) {
                genEnum.subGroup.name = matchedSubGroups[matchedSubGroups.length - 1].name
            }
        }
    }
}

export const loadEnums = (
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
    existedEnums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
    subGroupNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_subGroups[]>>,
): {
    allEnums: Array<GenModelInput_TargetOf_enums>,
    newEnums: Array<GenModelInput_TargetOf_enums>,
    enumNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_enums[]>>,
} => {
    const {
        allItems: allEnums,
        newItems: newEnums,
        keyToItemsMap: enumNameMap,
    } = mergeWithExisted<GenModelInput_TargetOf_enums, string>(
        enums,
        existedEnums,
        it => it.name,
        jsonEqualOrRenameDuplicateHandler
    )

    keepEnumSuperTableLegal(allEnums, subGroupNameMap)

    return {
        allEnums,
        newEnums,
        enumNameMap,
    }
}
