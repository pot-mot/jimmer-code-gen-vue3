import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type EmbeddableTypeDiagnose = {
    embeddableType: DiagnoseMessage[],
    properties: Map<string, DiagnoseMessage[]>
}

export const embeddableTypeDiagnose = (
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): EmbeddableTypeDiagnose => {
    const messages: DiagnoseMessage[] = []
    const propertyDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    if (embeddableType.name.length === 0) {
        messages.push({
            content: "[Name is empty]",
            type: "error"
        })
    } else {
        if (!checkUpperCamelName(embeddableType.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(embeddableType.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
    }

    for (const property of embeddableType.properties) {
        const messages: DiagnoseMessage[] = []
        if (property.name.length === 0) {
            messages.push({
                content: "[Name is empty]",
                type: "error"
            })
        } else {
            if (!checkLowerCamelName(property.name)) {
                messages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            }

            const nameCount = nameSets.embeddableTypePropertyNameSetMap.get(embeddableType.id)?.count(property.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "warning"
                })
            }
        }
        propertyDiagnoseMap.set(property.id, messages)
    }

    return {
        embeddableType: messages,
        properties: propertyDiagnoseMap,
    }
}
