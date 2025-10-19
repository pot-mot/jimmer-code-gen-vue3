import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

export type EntityDiagnoseResult = {
    entity: DiagnoseMessage[],
    properties: Map<string, DiagnoseMessage[]>
}

export const entityDiagnose = (
    entity: DeepReadonly<EntityWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): EntityDiagnoseResult => {
    const messages: DiagnoseMessage[] = []
    const propertyDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    if (entity.name.length === 0) {
        messages.push({
            content: "[Name is empty]",
            type: "error"
        })
    } else {
        if (!checkUpperCamelName(entity.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        }

        const nameCount = nameSets.groupItemNameSet.count(entity.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
    }

    for (const property of entity.properties) {
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

            const nameCount = nameSets.entityPropertyNameSetMap.get(entity.id)?.count(property.name) ?? 0
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
                const nameCount = nameSets.entityPropertyNameSetMap.get(entity.id)?.count(property.idViewName) ?? 0
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

    const missingDependencies = inheritInfo.missingDependencies.get(entity.id)
    if (missingDependencies) {
        messages.push({
            content: `[Missing Dependencies: ${missingDependencies.size}]`,
            type: "warning"
        })
    }

    const circularReferences = inheritInfo.circularReferences.get(entity.id)
    if (circularReferences) {
        messages.push({
            content: `[Circular References: ${circularReferences.length}]`,
            type: "warning"
        })
    }


    return {
        entity: messages,
        properties: propertyDiagnoseMap,
    }
}
