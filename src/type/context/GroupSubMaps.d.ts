type GroupSubMaps = Pick<ModelContext,
    | 'entityMap'
    | 'enumerationMap'
    | 'mappedSuperClassMap'
    | 'embeddableTypeMap'
>

type GroupWithSubMaps = Group & GroupSubMaps
