import {sendI18nMessage} from "@/message/message.ts";
import {GenModelInput, GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {jsonSortPropStringify} from "@/utils/json.ts";

export const loadEnums = (
    model: DeepReadonly<GenModelInput>,
    enums:  DeepReadonly<Array<GenModelInput_TargetOf_enums>>
): {
    enums: Array<GenModelInput_TargetOf_enums>
} => {
    const newEnums: Array<GenModelInput_TargetOf_enums> = []

    const subGroupNameSet = new Set(model.subGroups.map(it => it.name))

    // 进行枚举重复校验并导入
    enums.forEach(genEnum => {
        const sameNameEnums = model.enums.filter(it => it.name === genEnum.name)
        if (sameNameEnums.length === 0) {
            const tempEnum = cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum)
            if (tempEnum.subGroup && !subGroupNameSet.has(tempEnum.subGroup.name)) {
                tempEnum.subGroup = undefined
            }
            newEnums.push(tempEnum)
        } else {
            // 如果只有一个重名且内容完全一样，则认为是同一枚举
            if (sameNameEnums.length === 1 && jsonSortPropStringify(sameNameEnums[0]) === jsonSortPropStringify(genEnum)) {
            } else {
                sendI18nMessage(
                    {key: "VALIDATE_GenEnum_nameCannotBeDuplicate", args: [genEnum.name]},
                    'warning',
                    {allSameNameEnums: sameNameEnums, newEnum: genEnum},
                )
            }
        }
    })

    return {
        enums: newEnums
    }
}
