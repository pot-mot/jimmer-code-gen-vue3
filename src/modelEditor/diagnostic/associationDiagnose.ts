import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank} from "@/utils/name/nameCheck.ts";

export type AssociationDiagnose = {
    readonly size: number,
    readonly association: DiagnoseMessage[],
    readonly mappedProperty: DiagnoseMessage[],
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
                        type: "error"
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
            if (!checkNoBlank(association.mappedProperty.name)) {
                messages.push({
                    content: "[Invalid Name]",
                    type: "error"
                })
            } else if (!checkLowerCamelName(association.mappedProperty.name)) {
                messages.push({
                    content: "[Should use lowerCamelCase]",
                    type: "warning"
                })
            }

            const nameCount = nameSets.entityPropertyNameSetMap
                .get(association.referencedEntityId)?.count(association.mappedProperty.name) ?? 0
            if (nameCount > 1) {
                mappedPropertyMessages.push({
                    content: `[Duplicate Name: ${nameCount}]`,
                    type: "error",
                })
            }
        }
    }

    // when property name no problem, check idView
    if (mappedPropertyMessages.length === 0 && "idViewName" in association.mappedProperty) {
        if (association.mappedProperty.idViewName.length === 0) {
            mappedPropertyMessages.push({
                content: "[IdView Name is empty]",
                type: "error"
            })
        } else {
            if (!checkNoBlank(association.mappedProperty.idViewName)) {
                mappedPropertyMessages.push({
                    content: "[Invalid IdView Name]",
                    type: "error"
                })
            } else if (!checkLowerCamelName(association.mappedProperty.idViewName)) {
                mappedPropertyMessages.push({
                    content: "[IdView should use lowerCamelCase]",
                    type: "warning"
                })
            }

            const nameCount = nameSets.entityPropertyNameSetMap
                .get(association.referencedEntityId)?.count(association.mappedProperty.idViewName) ?? 0
            if (nameCount > 1) {
                mappedPropertyMessages.push({
                    content: `[Duplicate IdView Name: ${nameCount}]`,
                    type: "warning"
                })
            }
        }
    }

    if ("sourceEntityId" in association) {
        if (!contextData.entityMap.has(association.sourceEntityId)) {
            messages.push({
                content: "[Source Entity is missing]",
                type: "error"
            })
        }
    } else {
        if (!contextData.mappedSuperClassMap.has(association.sourceAbstractEntityId)) {
            messages.push({
                content: "[Source Abstract Entity is missing]",
                type: "error"
            })
        }
    }
    if (!contextData.entityMap.has(association.referencedEntityId)) {
        messages.push({
            content: "[Referenced Entity is missing]",
            type: "error"
        })
    }

    return {
        association: messages,
        mappedProperty: mappedPropertyMessages,
        size: messages.length + mappedPropertyMessages.length
    }
}
