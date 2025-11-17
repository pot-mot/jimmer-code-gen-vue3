import type {InheritInfo} from "@/type/context/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";
import {
    getEntityIdProperties,
    getEntityLogicalDeleteProperties, getEntityVersionProperties
} from "@/type/context/utils/EntityCategorizedProperty.ts";

export type MappedSuperClassDiagnose = {
    readonly size: number
    readonly mappedSuperClass: DiagnoseMessage[],
    readonly properties: Map<string, DiagnoseMessage[]>
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
                type: "error"
            })
        }
    }

    const idProperties = getEntityIdProperties(mappedSuperClass, contextData.mappedSuperClassMap)
    if (idProperties.length > 1) {
        messages.push({
            content: "[Multiple Id Properties]",
            type: "error"
        })
    }

    const logicDeletedProperties = getEntityLogicalDeleteProperties(mappedSuperClass, contextData.mappedSuperClassMap)
    if (logicDeletedProperties.length > 1) {
        messages.push({
            content: "[Multiple Logical Deleted Properties]",
            type: "error"
        })
    }

    const versionProperties = getEntityVersionProperties(mappedSuperClass, contextData.mappedSuperClassMap)
    if (versionProperties.length > 1) {
        messages.push({
            content: "[Multiple Version Properties]",
            type: "error"
        })
    }

    for (const property of mappedSuperClass.properties) {
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

            const nameCount = nameSets.mappedSuperClassPropertyNameSetMap.get(mappedSuperClass.id)?.count(property.name) ?? 0
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

    let size = messages.length
    for (const propertyDiagnose of propertyDiagnoseMap.values()) {
        size += propertyDiagnose.length
    }

    return {
        mappedSuperClass: messages,
        properties: propertyDiagnoseMap,
        size,
    }
}
