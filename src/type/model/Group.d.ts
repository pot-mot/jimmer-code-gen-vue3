type Group = {
    id: string
    name: string
    comment: string
    color: string
    basePackagePath: string
    baseTableSchema: string
    mappedSuperClasses: MappedSuperClass[]
    embeddableTypes: EmbeddableType[]
    entities: Entity[]
    enumerations: Enumeration[]
}