import {parseEmbeddablePropertyPath, parsePropertyPath} from "@/type/context/utils/parsePropertyPath.ts";

type DependenceIds = ModelSubIds & {
    propertyIds: ({ entityId: string, id: string } | { embeddableTypeId: string, id: string })[]
}

export type DependenceForPath = {
    path: string[]
    dependenceIds: Partial<DependenceIds>
}

export type DependenceResult = {
    existedDependencies: DependenceForPath[]
    missingDependencies: DependenceForPath[]
}

const unshiftPath = (frontPath: string[], dependenceForPath: DependenceForPath) => {
    dependenceForPath.path.unshift(...frontPath)
    return dependenceForPath
}

export const getEmbeddableTypePropertyDependencies = (
    property: DeepReadonly<EmbeddableTypeProperty> | DeepReadonly<Property>,
    context: DeepReadonly<ModelContext>
): DependenceResult => {
    const existedDependencies: DependenceForPath[] = []
    const missingDependencies: DependenceForPath[] = []

    if ("enumId" in property) {
        if (context.enumerationMap.has(property.enumId)) {
            existedDependencies.push({
                path: ['enumId'],
                dependenceIds: {enumerationIds: [property.enumId]}
            })
        } else {
            missingDependencies.push({
                path: ['enumId'],
                dependenceIds: {enumerationIds: [property.enumId]}
            })
        }
    }

    if ("embeddableTypeId" in property) {
        const embeddableType = context.embeddableTypeMap.get(property.embeddableTypeId)
        if (embeddableType === undefined) {
            missingDependencies.push({
                path: ['embeddableTypeId'],
                dependenceIds: {embeddableTypeIds: [property.embeddableTypeId]}
            })
        } else {
            existedDependencies.push({
                path: ['embeddableTypeId'],
                dependenceIds: {embeddableTypeIds: [property.embeddableTypeId]}
            })

            if ("propOverrides" in property) {
                for (const propOverride of property.propOverrides ?? []) {
                    const propertyPath = parseEmbeddablePropertyPath(propOverride.propertyPath.split("."), embeddableType, context)
                    for (const pathItem of propertyPath) {
                        if (pathItem.type === 'EmbeddableType') {
                            existedDependencies.push({
                                path: ['dependencies'],
                                dependenceIds: {
                                    embeddableTypeIds: [pathItem.embeddableType.id],
                                    propertyIds: [{
                                        embeddableTypeId: pathItem.embeddableType.id,
                                        id: pathItem.property.id
                                    }]
                                }
                            })
                        } else if (pathItem.type === 'COMMON') {
                            existedDependencies.push({
                                path: ['dependencies'],
                                dependenceIds: {
                                    propertyIds: [{
                                        embeddableTypeId: embeddableType.id,
                                        id: pathItem.property.id
                                    }]
                                }
                            })
                        }
                    }
                }
            }

        }
    }

    return {
        existedDependencies,
        missingDependencies,
    }
}

export const getPropertyDependencies = (
    property: DeepReadonly<Property>,
    entity: DeepReadonly<EntityWithInheritInfo | MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>
): DependenceResult => {
    const {existedDependencies, missingDependencies} = getEmbeddableTypePropertyDependencies(property, context)

    if ("referenceEntityId" in property) {
        const referencedEntity = context.entityMap.get(property.referenceEntityId)

        if (referencedEntity === undefined) {
            missingDependencies.push({
                path: ['referenceEntityId'],
                dependenceIds: {entityIds: [property.referenceEntityId]}
            })
        } else {
            existedDependencies.push({
                path: ['referenceEntityId'],
                dependenceIds: {entityIds: [property.referenceEntityId]}
            })

            if ("mappedById" in property) {
                const associationPropertyIds = []
                for (const {id} of referencedEntity.allCategorizedProperties.associationPropertyMap.values()) {
                    associationPropertyIds.push(id)
                }
                if (!associationPropertyIds.includes(property.mappedById)) {
                    missingDependencies.push({
                        path: ['mappedById'],
                        dependenceIds: {propertyIds: [{entityId: referencedEntity.id, id: property.mappedById}]}
                    })
                } else {
                    existedDependencies.push({
                        path: ['mappedById'],
                        dependenceIds: {propertyIds: [{entityId: referencedEntity.id, id: property.mappedById}]}
                    })
                }
            }


        }
    }

    if ("associationId" in property) {
        if (context.associationMap.has(property.associationId)) {
            missingDependencies.push({
                path: ['associationId'],
                dependenceIds: {associationIds: [property.associationId]}
            })
        } else {
            missingDependencies.push({
                path: ['associationId'],
                dependenceIds: {associationIds: [property.associationId]}
            })
        }
    }

    if ("dependencies" in property) {
        for (const dependency of property.dependencies) {
            const propertyPath = parsePropertyPath(dependency.split("."), entity, context)
            for (const pathItem of propertyPath) {
                if (pathItem.type === 'Entity') {
                    existedDependencies.push({
                        path: ['dependencies'],
                        dependenceIds: {
                            entityIds: [pathItem.entity.id],
                            propertyIds: [{
                                entityId: pathItem.entity.id,
                                id: pathItem.property.id
                            }]
                        }
                    })
                } else if (pathItem.type === 'EmbeddableType') {
                    existedDependencies.push({
                        path: ['dependencies'],
                        dependenceIds: {
                            embeddableTypeIds: [pathItem.embeddableType.id],
                            propertyIds: [{
                                embeddableTypeId: pathItem.embeddableType.id,
                                id: pathItem.property.id
                            }]
                        }
                    })
                } else if (pathItem.type === 'COMMON') {
                    existedDependencies.push({
                        path: ['dependencies'],
                        dependenceIds: {
                            propertyIds: [{
                                entityId: entity.id,
                                id: pathItem.property.id
                            }]
                        }
                    })
                }
            }
        }
    }

    if ("baseToManyPropertyId" in property) {
        const baseToManyProperty = entity.allCategorizedProperties.associationPropertyMap.get(property.baseToManyPropertyId)
        if (!baseToManyProperty) {
            missingDependencies.push({
                path: ['baseToManyPropertyId'],
                dependenceIds: {propertyIds: [{entityId: entity.id, id: property.baseToManyPropertyId}]}
            })
        } else {
            existedDependencies.push({
                path: ['baseToManyPropertyId'],
                dependenceIds: {propertyIds: [{entityId: entity.id, id: property.baseToManyPropertyId}]}
            })

            if (!context.entityMap.has(baseToManyProperty.referenceEntityId)) {
                missingDependencies.push({
                    path: ['entityId'],
                    dependenceIds: {entityIds: [baseToManyProperty.referenceEntityId]}
                })
            } else {
                const referencedEntity = context.entityMap.get(baseToManyProperty.referenceEntityId)
                if (!referencedEntity) {
                    missingDependencies.push({
                        path: ['entityId'],
                        dependenceIds: {entityIds: [baseToManyProperty.referenceEntityId]}
                    })
                } else {
                    existedDependencies.push({
                        path: ['entityId'],
                        dependenceIds: {entityIds: [baseToManyProperty.referenceEntityId]}
                    })

                    const deeperProperty = referencedEntity.associationPropertyMap.get(property.deeperPropertyId)
                    if (!deeperProperty) {
                        missingDependencies.push({
                            path: ['deeperPropertyId'],
                            dependenceIds: {
                                propertyIds: [{
                                    entityId: baseToManyProperty.referenceEntityId,
                                    id: property.deeperPropertyId
                                }]
                            }
                        })
                    } else {
                        existedDependencies.push({
                            path: ['deeperPropertyId'],
                            dependenceIds: {
                                propertyIds: [{
                                    entityId: baseToManyProperty.referenceEntityId,
                                    id: property.deeperPropertyId
                                }]
                            }
                        })
                    }
                }
            }
        }
    }

    return {
        existedDependencies,
        missingDependencies,
    }
}

export const getMappedSuperClassDependencies = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>
): DependenceResult => {
    const existedDependencies: DependenceForPath[] = []
    const missingDependencies: DependenceForPath[] = []

    const mappedSuperClassWithInheritInfo = context.mappedSuperClassMap.get(mappedSuperClass.id)
    if (!mappedSuperClassWithInheritInfo) {
        throw new Error(`MappedSuperClass [${mappedSuperClass.id}] not existed`)
    }

    if (context.groupMap.has(mappedSuperClass.groupId)) {
        existedDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [mappedSuperClass.groupId]}
        })
    } else {
        missingDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [mappedSuperClass.groupId]}
        })
    }

    for (const property of mappedSuperClass.properties) {
        const {
            existedDependencies: propertyExistedDependencies,
            missingDependencies: propertyMissingDependencies
        } = getPropertyDependencies(property, mappedSuperClassWithInheritInfo, context)
        existedDependencies.push(...propertyExistedDependencies.map(it => unshiftPath(["properties", property.id], it)))
        missingDependencies.push(...propertyMissingDependencies.map(it => unshiftPath(["properties", property.id], it)))
    }

    return {
        existedDependencies,
        missingDependencies,
    }
}

export const getEntityDependencies = (
    entity: DeepReadonly<EntityWithProperties>,
    context: DeepReadonly<ModelContext>
): DependenceResult => {
    const existedDependencies: DependenceForPath[] = []
    const missingDependencies: DependenceForPath[] = []

    const entityWithInheritInfo = context.entityMap.get(entity.id)
    if (!entityWithInheritInfo) {
        throw new Error(`Entity [${entity.id}] not existed`)
    }

    if (context.groupMap.has(entity.groupId)) {
        existedDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [entity.groupId]}
        })
    } else {
        missingDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [entity.groupId]}
        })
    }

    for (const property of entity.properties) {
        const {
            existedDependencies: propertyExistedDependencies,
            missingDependencies: propertyMissingDependencies
        } = getPropertyDependencies(property, entityWithInheritInfo, context)
        existedDependencies.push(...propertyExistedDependencies.map(it => unshiftPath(["properties", property.id], it)))
        missingDependencies.push(...propertyMissingDependencies.map(it => unshiftPath(["properties", property.id], it)))
    }

    return {
        existedDependencies,
        missingDependencies,
    }
}

export const getEmbeddableTypeDependencies = (
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    context: DeepReadonly<ModelContext>
): DependenceResult => {
    const existedDependencies: DependenceForPath[] = []
    const missingDependencies: DependenceForPath[] = []

    if (context.groupMap.has(embeddableType.groupId)) {
        existedDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [embeddableType.groupId]}
        })
    } else {
        missingDependencies.push({
            path: ["groupId"],
            dependenceIds: {groupIds: [embeddableType.groupId]}
        })
    }

    for (const property of embeddableType.properties) {
        const {
            existedDependencies: propertyExistedDependencies,
            missingDependencies: propertyMissingDependencies
        } = getEmbeddableTypePropertyDependencies(property, context)
        existedDependencies.push(...propertyExistedDependencies.map(it => unshiftPath(["properties", property.id], it)))
        missingDependencies.push(...propertyMissingDependencies.map(it => unshiftPath(["properties", property.id], it)))
    }

    return {
        existedDependencies,
        missingDependencies,
    }
}
