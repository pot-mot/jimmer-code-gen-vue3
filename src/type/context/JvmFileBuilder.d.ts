type JvmFileBuilderOptions = {
    groupId: string
    subPackagePath: string
}

type PropertyInfo = {
    raw: DeepReadonly<Property>
    name: string
    comment: string
    type: string
    annotations: string[]
    nullable: boolean
    body?: string
}

type JvmFileBuilder = {
    readonly getPackagePath(): string
    readonly getProperties(): PropertyInfo[]
    readonly pushProperty(property: DeepReadonly<Property>): PropertyInfo
    readonly getImportSet(): ReadonlySet<string>
    readonly addImports(imports: string | Iterable<string>): void
    readonly requireEnumeration(id: string): DeepReadonly<Enumeration>
    readonly requireEmbeddableType(id: string): DeepReadonly<EmbeddableTypeWithProperties>
    readonly requireEntity(id: string): DeepReadonly<EntityWithInheritInfo>
    readonly requireMappedSuperClass(id: string): DeepReadonly<MappedSuperClassWithInheritInfo>
}
