import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {mergeWithExisted} from "@/components/pages/ModelEditor/load/mergeWithExisted.ts";
import {jsonSortPropStringify} from "@/utils/json.ts";

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
        (name, item, keyDuplicateItems, newItems, existedItems) => {
            const jsonStr = jsonSortPropStringify(item)

            for (const keyDuplicateItem of keyDuplicateItems) {
                if (jsonSortPropStringify(keyDuplicateItem) !== jsonStr) {
                    let tempCount = keyDuplicateItems.length
                    let tempName = `${name}(${tempCount})`
                    while (existedItems.some(it => it.name === tempName)) {
                        tempName = `${name}(${tempCount++})`
                    }
                    item.name = tempName
                    keyDuplicateItems.push(item)
                    newItems.push(item)
                    break
                }
            }
        }
    )

    return {
        allSubGroups,
        newSubGroups,
        subGroupNameMap
    }
}
