import type {InheritInfo} from "@/modelEditor/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type EnumerationDiagnoseResult = {
    readonly size: number,
    readonly enumeration: DiagnoseMessage[],
    readonly items: Map<string, DiagnoseMessage[]>
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
        if (!checkNoBlank(enumeration.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        } else if (!checkUpperCamelName(enumeration.name)) {
            messages.push({
                content: "[Should use UpperCamelCase]",
                type: "warning"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(enumeration.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount} times]`,
                type: "error"
            })
        }
    }

    const ordinalSet = new Set<number>()

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

            const nameCount = nameSets.enumerationItemNameSetMap.get(enumeration.id)?.count(item.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount} times]`,
                    type: "error"
                })
            }

            if (ordinalSet.has(item.ordinal)) {
                messages.push({
                    content: "[Duplicate Ordinal]",
                    type: "error"
                })
            }
            ordinalSet.add(item.ordinal)
        }

        itemDiagnoseMap.set(item.id, messages)
    }

    let size = messages.length
    for (const itemDiagnose of itemDiagnoseMap.values()) {
        size += itemDiagnose.length
    }

    return {
        enumeration: messages,
        items: itemDiagnoseMap,
        size,
    }
}
