import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {ModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";

export type GroupDiagnose = {
    group: DiagnoseMessage[],
}

export const groupDiagnose = (
    group: DeepReadonly<Group>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ModelNameSets>,
): GroupDiagnose => {
    const messages: DiagnoseMessage[] = []

    const nameCount = nameSets.groupNameSet.count(group.name)
    if (nameCount > 1) {
        messages.push({
            content: `[Duplicate Name: ${nameCount}]`,
            type: "warning"
        })
    }

    return {
        group: messages,
    }
}