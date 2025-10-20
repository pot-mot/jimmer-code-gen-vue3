import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank} from "@/utils/name/nameCheck.ts";

export type AssociationDiagnose = {
    association: DiagnoseMessage[],
    mappedProperty: DiagnoseMessage[]
}

export const associationDiagnose = (
    association: DeepReadonly<AssociationIdOnly>,
    contextData: DeepReadonly<ModelContextData>,
    inheritInfo: DeepReadonly<InheritInfo>,
    nameSets: ReadonlyModelNameSets,
): AssociationDiagnose => {
    const messages: DiagnoseMessage[] = []
    const mappedPropertyMessages: DiagnoseMessage[] = []

    if ("name" in association) {
        if (association.name.length === 0) {
            messages.push({
                content: "[Name is empty]",
                type: "error"
            })
        } else {
            if (!checkNoBlank(association.name)) {
                messages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            }

            if (!association.useNameTemplate) {
                const nameCount = nameSets.associationNameSet.count(association.name)
                if (nameCount > 1) {
                    messages.push({
                        content: `[Duplicate Name: ${nameCount}]`,
                        type: "warning"
                    })
                }
            }
        }
    } else {
        if (!checkNoBlank(association.nameTemplate)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        }
    }

    if ("name" in association.mappedProperty) {
        if (association.mappedProperty.name.length === 0) {
            mappedPropertyMessages.push({
                content: "[Name is empty]",
                type: "error"
            })
        } else {
            if (!checkLowerCamelName(association.mappedProperty.name)) {
                mappedPropertyMessages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            }

            const nameCount = nameSets.entityPropertyNameSetMap
                .get(association.referencedEntityId)?.count(association.mappedProperty.name) ?? 0
            if (nameCount > 1) {
                mappedPropertyMessages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "warning",
                })
            }
        }
    }

    return {
        association: messages,
        mappedProperty: mappedPropertyMessages,
    }
}
