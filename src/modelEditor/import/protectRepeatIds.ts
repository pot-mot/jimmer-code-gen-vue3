import {createId} from "@/modelEditor/useModelEditor.ts";

export const protectRepeatIds = (
    graphData: ModelGraphSubData,
    contextData: DeepReadonly<ModelContextData>,
) => {
    const {
        groups,
        entities,
        mappedSuperClasses,
        embeddableTypes,
        enumerations,
        associations,
    } = graphData

    for (const group of groups) {
        if (contextData.groupMap.has(group.id)) {
            const newGroupId = createId("Group")
            for (const {data} of entities) {
                if (data.groupId === group.id) data.groupId = newGroupId
            }
            for (const {data} of mappedSuperClasses) {
                if (data.groupId === group.id) data.groupId = newGroupId
            }
            for (const {data} of embeddableTypes) {
                if (data.groupId === group.id) data.groupId = newGroupId
            }
            for (const {data} of enumerations) {
                if (data.groupId === group.id) data.groupId = newGroupId
            }
            group.id = newGroupId
        }
    }

    const newPropertyIdMap = new Map<string, {
        entityId: string,
        property: EntityProperty
    } | {
        mappedSuperClassId: string,
        property: MappedSuperClassProperty
    } | {
        embeddableTypeId: string,
        property: EmbeddableTypeProperty
    }>()

    for (const {data: entity} of entities) {
        if (contextData.entityMap.has(entity.id)) {
            const newEntityId = createId("Entity")
            for (const {data: {properties}} of entities) {
                for (const property of properties) {
                    if ("referencedEntityId" in property) {
                        if (property.referencedEntityId === entity.id) property.referencedEntityId = newEntityId
                    }
                }
            }
            for (const {data: {properties}} of mappedSuperClasses) {
                for (const property of properties) {
                    if ("referencedEntityId" in property) {
                        if (property.referencedEntityId === entity.id) property.referencedEntityId = newEntityId
                    }
                }
            }
            for (const {data: association} of associations) {
                if ("sourceEntityId" in association) {
                    if (association.sourceEntityId === entity.id) association.sourceEntityId = newEntityId
                }
                if (association.referencedEntityId === entity.id) association.referencedEntityId = newEntityId
            }
            entity.id = newEntityId

            for (const property of entity.properties) {
                if (newPropertyIdMap.has(property.id)) throw new Error(`Property [${property.name}-${property.id}] is already existed`)
                newPropertyIdMap.set(property.id, {entityId: entity.id, property})
                const newPropertyId = createId("Property")
                for (const {data: association} of associations) {
                    if (association.sourcePropertyId === property.id) association.sourcePropertyId = newPropertyId
                }
                property.id = newPropertyId
            }
        }
    }

    for (const {data: mappedSuperClass} of mappedSuperClasses) {
        if (contextData.mappedSuperClassMap.has(mappedSuperClass.id)) {
            const newMappedSuperClassId = createId("MappedSuperClass")
            for (const {data: {extendsIds, properties}} of entities) {
                for (let i = 0; i < extendsIds.length; i++) {
                    if (extendsIds[i] === mappedSuperClass.id) extendsIds[i] = newMappedSuperClassId
                }
                for (const property of properties) {
                    if ("referencedAbstractEntityId" in property) {
                        if (property.referencedAbstractEntityId === mappedSuperClass.id) property.referencedAbstractEntityId = newMappedSuperClassId
                    }
                }
            }
            for (const {data: {extendsIds, properties}} of mappedSuperClasses) {
                for (let i = 0; i < extendsIds.length; i++) {
                    if (extendsIds[i] === mappedSuperClass.id) extendsIds[i] = newMappedSuperClassId
                }
                for (const property of properties) {
                    if ("referencedAbstractEntityId" in property) {
                        if (property.referencedAbstractEntityId === mappedSuperClass.id) property.referencedAbstractEntityId = newMappedSuperClassId
                    }
                }
            }
            for (const {data: association} of associations) {
                if ("sourceAbstractEntityId" in association) {
                    if (association.sourceAbstractEntityId === mappedSuperClass.id) association.sourceAbstractEntityId = newMappedSuperClassId
                }
            }
            mappedSuperClass.id = newMappedSuperClassId

            for (const property of mappedSuperClass.properties) {
                if (newPropertyIdMap.has(property.id)) throw new Error(`Property [${property.name}-${property.id}] is already existed`)
                newPropertyIdMap.set(property.id, {mappedSuperClassId: mappedSuperClass.id, property})
                const newPropertyId = createId("Property")
                for (const {data: association} of associations) {
                    if (association.sourcePropertyId === property.id) association.sourcePropertyId = newPropertyId
                }
                property.id = newPropertyId
            }
        }
    }

    for (const {data: embeddableType} of embeddableTypes) {
        if (contextData.embeddableTypeMap.has(embeddableType.id)) {
            const newEmbeddableTypeId = createId("EmbeddableType")
            for (const {data: {properties}} of entities) {
                for (const property of properties) {
                    if ("embeddableTypeId" in property) {
                        if (property.embeddableTypeId === embeddableType.id) property.embeddableTypeId = newEmbeddableTypeId
                    }
                }
            }
            for (const {data: {properties}} of mappedSuperClasses) {
                for (const property of properties) {
                    if ("embeddableTypeId" in property) {
                        if (property.embeddableTypeId === embeddableType.id) property.embeddableTypeId = newEmbeddableTypeId
                    }
                }
            }
            embeddableType.id = newEmbeddableTypeId

            for (const property of embeddableType.properties) {
                if (newPropertyIdMap.has(property.id)) throw new Error(`Property [${property.name}-${property.id}] is already existed`)
                newPropertyIdMap.set(property.id, {embeddableTypeId: embeddableType.id, property})
                property.id = createId("Property")
            }
        }
    }

    for (const {data: enumeration} of enumerations) {
        if (contextData.enumerationMap.has(enumeration.id)) {
            const newEnumerationId = createId("Enumeration")
            for (const {data: {properties}} of entities) {
                for (const property of properties) {
                    if ("enumId" in property) {
                        if (property.enumId === enumeration.id) property.enumId = newEnumerationId
                    }
                }
            }
            for (const {data: {properties}} of mappedSuperClasses) {
                for (const property of properties) {
                    if ("enumId" in property) {
                        if (property.enumId === enumeration.id) property.enumId = newEnumerationId
                    }
                }
            }
            enumeration.id = newEnumerationId

            for (const enumerationItem of enumeration.items) {
                enumerationItem.id = createId("EnumerationItem")
            }
        }
    }

    for (const {data: association} of associations) {
        if (contextData.associationMap.has(association.id)) {
            const newAssociationId = createId("Association")
            for (const {data: {properties}} of entities) {
                for (const property of properties) {
                    if ("associationId" in  property) {
                        if (property.associationId === association.id) property.associationId = newAssociationId
                    }
                }
            }
            for (const {data: {properties}} of mappedSuperClasses) {
                for (const property of properties) {
                    if ("associationId" in  property) {
                        if (property.associationId === association.id) property.associationId = newAssociationId
                    }
                }
            }
            association.id = newAssociationId

            association.mappedProperty.id = createId("Property")
        }
    }
}
