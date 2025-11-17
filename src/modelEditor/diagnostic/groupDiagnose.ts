import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkNoBlank} from "@/utils/name/nameCheck.ts";

export type GroupDiagnose = {
    readonly size: number,
    readonly group: DiagnoseMessage[],
}

export const groupDiagnose = (
    group: DeepReadonly<Group>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): GroupDiagnose => {
    const messages: DiagnoseMessage[] = []

    if (group.name.length === 0) {
        messages.push({
            content: "[Name is empty]",
            type: "error"
        })
    } else {
        const nameCount = nameSets.groupNameSet.count(group.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "error"
            })
        }
    }
    if (group.basePackagePath.length === 0) {
        messages.push({
            content: "[Package Path is empty]",
            type: "error"
        })
    } else {
        if (!checkNoBlank(group.basePackagePath)) {
            messages.push({
                content: "[Invalid Package Path]",
                type: "error"
            })
        }
    }

    return {
        group: messages,
        size: messages.length,
    }
}