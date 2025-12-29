import type {InheritInfo} from "@/modelEditor/utils/InheritInfo.ts";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import type {ReadonlyModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {checkLowerCamelName, checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";
import {
    getEntityIdProperties,
    getEntityLogicalDeleteProperties, getEntityVersionProperties
} from "@/modelEditor/utils/EntityCategorizedProperty.ts";
import {unclearTypeSet} from "@/modelEditor/diagnostic/unclearType.ts";
import {checkPropertyRawTypeIsFit} from "@/modelEditor/modelForm/jvmLanguage/fitRawTypeByJvmLanguage.ts";
import {translate} from "@/store/i18nStore.ts";

export type EntityDiagnoseResult = {
    readonly size: number,
    readonly entity: DiagnoseMessage[],
    readonly properties: Map<string, DiagnoseMessage[]>
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
                content: `[Duplicate Name: ${nameCount} times]`,
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

    const propertyNameSet = nameSets.entityPropertyNameSetMap.get(entity.id)
    const innerPropertyNameSet = new Set(entity.properties.map(property => property.name))
    for (const [name, count] of propertyNameSet?.countMap?.entries() ?? []) {
        if (count > 1 && !innerPropertyNameSet.has(name)) {
            messages.push({
                content: `[Inherited property "${name}" is duplicate: ${count} times]`,
                type: "error"
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

            const nameCount = propertyNameSet?.count(property.name) ?? 0
            if (nameCount > 1) {
                messages.push({
                    content: `[Duplicate Name: ${nameCount} times]`,
                    type: "error"
                })
            }
        }

        // when property name no problem, check idView
        if (messages.length === 0 && "idViewName" in property) {
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
                        content: `[Duplicate IdView Name: ${nameCount} times]`,
                        type: "warning"
                    })
                }
            }
        }

        if ("rawType" in property) {
            if (property.rawType.length === 0) {
                messages.push({
                    content: "[Type is empty]",
                    type: "error"
                })
            } else if (!checkPropertyRawTypeIsFit(property, contextData.model.jvmLanguage)) {
                messages.push({
                    content: translate({
                        key: "raw_type_not_fit_language",
                        args: [contextData.model.jvmLanguage, property.rawType]
                    }),
                    type: "warning"
                })
            } else if (unclearTypeSet.has(property.rawType)) {
                messages.push({
                    content: "[Type is Unclear]",
                    type: "warning"
                })
            }
        }
        if ("referencedEntityId" in property) {
            if (!contextData.entityMap.has(property.referencedEntityId)) {
                messages.push({
                    content: "[Referenced Entity is missing]",
                    type: "error"
                })
            }
        }
        if ("associationId" in property) {
            if (!contextData.associationMap.has(property.associationId)) {
                messages.push({
                    content: "[Association is missing]",
                    type: "error"
                })
            }
        }
        if ("embeddableTypeId" in property) {
            if (!contextData.embeddableTypeMap.has(property.embeddableTypeId)) {
                messages.push({
                    content: "[Embeddable is missing]",
                    type: "error"
                })
            }
        }
        if ("enumId" in property) {
            if (!contextData.enumerationMap.has(property.enumId)) {
                messages.push({
                    content: "[Enumeration is missing]",
                    type: "error"
                })
            }
        }

        if ("columnInfo" in property) {
            if (property.name.length !== 0 && property.columnInfo.name.length === 0) {
                messages.push({
                    content: "[Column Name is empty]",
                    type: "error"
                })
            } else {
                if (checkNoBlank(property.name) && !checkNoBlank(property.columnInfo.name)) {
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

    const missingDependencies = inheritInfo.missingDependencies.get(entity.id)
    if (missingDependencies) {
        messages.push({
            content: `[Missing Dependencies: ${missingDependencies.size} times]`,
            type: "warning"
        })
    }

    const circularReferences = inheritInfo.circularReferences.get(entity.id)
    if (circularReferences) {
        messages.push({
            content: `[Circular References: ${circularReferences.length} times]`,
            type: "warning"
        })
    }

    let size = messages.length
    for (const propertyDiagnose of propertyDiagnoseMap.values()) {
        size += propertyDiagnose.length
    }

    return {
        entity: messages,
        properties: propertyDiagnoseMap,
        size
    }
}
