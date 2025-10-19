import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type MappedSuperClassDiagnose = {
    mappedSuperClass: DiagnoseMessage[],
    properties: Map<string, DiagnoseMessage[]>
}

export const mappedSuperClassDiagnose = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): MappedSuperClassDiagnose => {
    const messages: DiagnoseMessage[] = []
    const propertyDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    if (mappedSuperClass.name.length === 0) {
        messages.push({
            content: "[Name is empty]",
            type: "error"
        })
    } else {
        if (!checkUpperCamelName(mappedSuperClass.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(mappedSuperClass.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
    }

    for (const property of mappedSuperClass.properties) {
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

            const nameCount = nameSets.mappedSuperClassPropertyNameSetMap.get(mappedSuperClass.id)?.count(property.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "warning"
                })
            }
        }

        if ("idViewName" in property) {
            if (property.idViewName.length === 0) {
                messages.push({
                    content: "[IdView Name is empty]",
                    type: "error"
                })
            } else {
                const nameCount = nameSets.mappedSuperClassPropertyNameSetMap.get(mappedSuperClass.id)?.count(property.idViewName) ?? 0
                if (nameCount > 1) {
                    messages.push({
                        content: `[Duplicate IdView Name: ${nameCount}]`,
                        type: "warning"
                    })
                }
            }
        }

        propertyDiagnoseMap.set(property.id, messages)
    }

    const missingDependencies = inheritInfo.missingDependencies.get(mappedSuperClass.id)
    if (missingDependencies) {
        messages.push({
            content: `[Missing Dependencies: ${missingDependencies.size}]`,
            type: "warning"
        })
    }

    const circularReferences = inheritInfo.circularReferences.get(mappedSuperClass.id)
    if (circularReferences) {
        messages.push({
            content: `[Circular References: ${circularReferences.length}]`,
            type: "warning"
        })
    }

    return {
        mappedSuperClass: messages,
        properties: propertyDiagnoseMap,
    }
}
