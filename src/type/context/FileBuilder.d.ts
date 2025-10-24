type PropertyItem = {
    name: string
    comment: string
    type: string
    annotations: string[]
    body?: string
}

type JvmFileBuilder = {
    readonly getPackagePath(): string
    readonly getImportSet(): ReadonlySet<string>
    readonly addImports(imports: string | Iterable<string>): void
    readonly requireEnumeration(id: string): DeepReadonly<Enumeration>
    readonly requireEmbeddableType(id: string): DeepReadonly<EmbeddableTypeWithProperties>
    readonly requireEntity(id: string): DeepReadonly<EntityWithInheritInfo>
    readonly requireMappedSuperClass(id: string): DeepReadonly<MappedSuperClassWithInheritInfo>
}
