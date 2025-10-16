import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";

export type EnumerationDiagnoseResult = {
    enumeration: DiagnoseMessage[],
    items: Map<string, DiagnoseMessage[]>
}

export const enumerationDiagnose = (
    enumeration: DeepReadonly<Enumeration>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ModelNameSets>,
): EnumerationDiagnoseResult => {
    const messages: DiagnoseMessage[] = []
    const itemDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    const groupItemNameCount = nameSets.groupItemNameSet.count(enumeration.name)
    if (groupItemNameCount > 1) {
        messages.push({
            content: `[Duplicate Name: ${groupItemNameCount}]`,
            type: "warning"
        })
    }

    for (const item of enumeration.items) {
        const messages: DiagnoseMessage[] = []
        const nameCount = nameSets.embeddableTypePropertyNameSetMap.get(enumeration.id)?.count(item.name) ?? 0
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
        itemDiagnoseMap.set(item.id, messages)
    }

    return {
        enumeration: messages,
        items: itemDiagnoseMap,
    }
}
