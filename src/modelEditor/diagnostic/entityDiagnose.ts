import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";

export type EntityDiagnoseResult = {
    entity: DiagnoseMessage[],
    properties: Map<string, DiagnoseMessage[]>
}

export const entityDiagnose = (
    entity: DeepReadonly<EntityWithProperties>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ModelNameSets>,
): EntityDiagnoseResult => {
    const messages: DiagnoseMessage[] = []
    const propertyDiagnoseMap = new Map<string, DiagnoseMessage[]>()

    const groupItemNameCount = nameSets.groupItemNameSet.count(entity.name)
    if (groupItemNameCount > 1) {
        messages.push({
            content: `[Duplicate Name: ${groupItemNameCount}]`,
            type: "warning"
        })
    }

    for (const property of entity.properties) {
        const messages: DiagnoseMessage[] = []
        const nameCount = nameSets.entityPropertyNameSetMap.get(entity.id)?.count(property.name) ?? 0
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
        if ("idViewName" in property) {
            const nameCount = nameSets.entityPropertyNameSetMap.get(entity.id)?.count(property.idViewName) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate IdView Name: ${nameCount}]`,
                    type: "warning"
                })
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
