export default Object.freeze({
    fileName: 'JvmFileBuilder.d.ts',
    content: `type JvmFileBuilder = {
    readonly getPackagePath(): string
    readonly getProperties(): PropertyInfo[]
    readonly pushProperty(property: DeepReadonly<Property>, propertyOwner: DeepReadonly<PropertyOwner>): PropertyInfo
    readonly getImportSet(): ReadonlySet<string>
    readonly addImports(imports: string | Iterable<string>): void
    readonly requireEnumeration(id: string): DeepReadonly<Enumeration>
    readonly requireEmbeddableType(id: string): DeepReadonly<EmbeddableTypeWithProperties>
    readonly requireEntity(id: string): DeepReadonly<EntityWithInheritInfo>
    readonly requireMappedSuperClass(id: string): DeepReadonly<MappedSuperClassWithInheritInfo>
}`,
})
