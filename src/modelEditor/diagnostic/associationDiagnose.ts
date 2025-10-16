import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";

export type AssociationDiagnose = {
    association: DiagnoseMessage[],
    mappedProperty: DiagnoseMessage[]
}

export const associationDiagnose = (
    association: DeepReadonly<AssociationIdOnly>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: DeepReadonly<ModelNameSets>,
): AssociationDiagnose => {
    const messages: DiagnoseMessage[] = []
    const mappedPropertyMessages: DiagnoseMessage[] = []

    if ("name" in association && !association.useNameTemplate) {
        const nameCount = nameSets.associationNameSet.count(association.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "warning"
            })
        }
    }
    const mappedPropertyNameCount = nameSets.entityPropertyNameSetMap
        .get(association.referencedEntityId)?.count(association.mappedProperty.name) ?? 0
    if (mappedPropertyNameCount > 1) {
        mappedPropertyMessages.push({
            content: `[Duplicate Name: ${mappedPropertyNameCount}]`,
            type: "warning",
        })
    }

    return {
        association: messages,
        mappedProperty: mappedPropertyMessages,
    }
}
