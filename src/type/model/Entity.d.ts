type Entity = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    tableName: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
}

type MappedSuperClass = Omit<Entity, 'tableName'>

type EmbeddableType = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    extraImports: string[]
    extraAnnotations: string[]
}