import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type EmbeddableTypeDiagnose = {
    readonly size: number,
    readonly embeddableType: DiagnoseMessage[],
    readonly properties: Map<string, DiagnoseMessage[]>
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
        if (!checkNoBlank(embeddableType.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        } else if (!checkUpperCamelName(embeddableType.name)) {
            messages.push({
                content: "[Should use UpperCamelCase]",
                type: "warning"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(embeddableType.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "error"
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
            if (!checkNoBlank(property.name)) {
                messages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            } else if (!checkLowerCamelName(property.name)) {
                messages.push({
                    content: "[Should use lowerCamelCase]",
                    type: "warning"
                })
            }

            const nameCount = nameSets.embeddableTypePropertyNameSetMap.get(embeddableType.id)?.count(property.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "error"
                })
            }
        }


        if ("rawType" in property) {
            if (property.rawType.length === 0) {
                messages.push({
                    content: "[Type is empty]",
                    type: "error"
                })
            }
        }
        if ("embeddableTypeId" in property) {
            if (!contextData.embeddableTypeMap.has(property.embeddableTypeId)) {
                messages.push({
                    content: "[Type Embeddable is missing]",
                    type: "error"
                })
            }
        }
        if ("enumId" in property) {
            if (!contextData.enumerationMap.has(property.enumId)) {
                messages.push({
                    content: "[Type Enumeration is missing]",
                    type: "error"
                })
            }
        }

        if ("columnInfo" in property) {
            if (property.columnInfo.name.length === 0) {
                messages.push({
                    content: "[Column Name is empty]",
                    type: "error"
                })
            } else {
                if (!checkNoBlank(property.columnInfo.name)) {
                    messages.push({
                        content: "[Invalid Column Name]",
                        type: "error"
                    })
                }
            }

            if (property.columnInfo.type.length === 0) {
                messages.push({
                    content: "[Column Type is empty]",
                    type: "error"
                })
            }
        }

        propertyDiagnoseMap.set(property.id, messages)
    }

    let size = messages.length
    for (const propertyDiagnose of propertyDiagnoseMap.values()) {
        size += propertyDiagnose.length
    }

    return {
        embeddableType: messages,
        properties: propertyDiagnoseMap,
        size,
    }
}
