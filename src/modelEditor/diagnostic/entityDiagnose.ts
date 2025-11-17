import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";
import {
    getEntityIdProperties,
    getEntityLogicalDeleteProperties, getEntityVersionProperties
} from "@/type/context/utils/EntityCategorizedProperty.ts";

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
        if (!checkNoBlank(entity.name)) {
            messages.push({
                content: "[Invalid Name]",
                type: "error"
            })
        } else if (!checkUpperCamelName(entity.name)) {
            messages.push({
                content: "[Should use UpperCamelCase]",
                type: "warning"
            })
        }
        const nameCount = nameSets.groupItemNameSet.count(entity.name)
        if (nameCount > 1) {
            messages.push({
                content: `[Duplicate Name: ${nameCount}]`,
                type: "error"
            })
        }
    }

    const idProperties = getEntityIdProperties(entity, contextData.mappedSuperClassMap)
    if (idProperties.length === 0) {
        messages.push({
            content: "[Missing Id Property]",
            type: "error"
        })
    } else if (idProperties.length > 1) {
        messages.push({
            content: "[Multiple Id Properties]",
            type: "error"
        })
    }

    const logicDeletedProperties = getEntityLogicalDeleteProperties(entity, contextData.mappedSuperClassMap)
    if (logicDeletedProperties.length > 1) {
        messages.push({
            content: "[Multiple Logical Deleted Properties]",
            type: "error"
        })
    }

    const versionProperties = getEntityVersionProperties(entity, contextData.mappedSuperClassMap)
    if (versionProperties.length > 1) {
        messages.push({
            content: "[Multiple Version Properties]",
            type: "error"
        })
    }

    for (const property of entity.properties) {
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

            const nameCount = nameSets.entityPropertyNameSetMap.get(entity.id)?.count(property.name) ?? 0
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
        if ("referencedEntityId" in property) {
            if (!contextData.entityMap.has(property.referencedEntityId)) {
                messages.push({
                    content: "[Type Entity is missing]",
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

        if ("idViewName" in property) {
            if (property.idViewName.length === 0) {
                messages.push({
                    content: "[IdView Name is empty]",
                    type: "error"
                })
            } else {
                if (!checkNoBlank(property.idViewName)) {
                    messages.push({
                        content: "[Invalid IdView Name]",
                        type: "error"
                    })
                } else if (!checkLowerCamelName(property.idViewName)) {
                    messages.push({
                        content: "[IdView should use lowerCamelCase]",
                        type: "warning"
                    })
                }

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
