type ReferenceIds = ModelSubIds & {
    propertyIds: ({ entityId: string, id: string } | { embeddableTypeId: string, id: string })[]
}

export const getEntityReferences = (
    entity: DeepReadonly<Entity>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}

export const getEmbeddableTypeReferences = (
    embeddableType: DeepReadonly<EmbeddableType>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}

export const getMappedSuperClassReferences = (
    mappedSuperClass: DeepReadonly<MappedSuperClass>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}

export const getEnumerationReferences = (
    enumeration: DeepReadonly<Enumeration>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}

export const getAssociationReferences = (
    association: DeepReadonly<Association>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}

export const getPropertyReferences = (
    property: DeepReadonly<Property>,
    contextData: DeepReadonly<ModelContextData>
): ReferenceIds => {

}
