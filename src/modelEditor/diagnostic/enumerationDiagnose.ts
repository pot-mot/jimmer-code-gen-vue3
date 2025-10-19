import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type EnumerationDiagnoseResult = {
    enumeration: DiagnoseMessage[],
    items: Map<string, DiagnoseMessage[]>
}

export const enumerationDiagnose = (
    enumeration: DeepReadonly<Enumeration>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): EnumerationDiagnoseResult => {
    const messages: DiagnoseMessage[] = []
    const itemDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    if (enumeration.name.length === 0) {
        messages.push({
            content: "[Name is empty]",
            type: "error"
        })
    } else {
        if (!checkUpperCamelName(enumeration.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(enumeration.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
    }

    for (const item of enumeration.items) {
        const messages: DiagnoseMessage[] = []
        if (item.name.length === 0) {
            messages.push({
                content: "[Name is empty]",
                type: "error"
            })
        } else {
            if (!checkNoBlank(item.name)) {
                messages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            }

            const nameCount = nameSets.embeddableTypePropertyNameSetMap.get(enumeration.id)?.count(item.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "warning"
                })
            }
        }

        itemDiagnoseMap.set(item.id, messages)
    }

    return {
        enumeration: messages,
        items: itemDiagnoseMap,
    }
}
