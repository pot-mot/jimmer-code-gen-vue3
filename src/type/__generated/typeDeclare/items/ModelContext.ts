export default Object.freeze({
    fileName: 'ModelContext.d.ts',
    content: `type ModelContext = {
    model: Model
    groupMap: Map<string, GroupWithInheritInfoMap>
    entityMap: Map<string, EntityWithInheritInfo>
    mappedSuperClassMap: Map<string, MappedSuperClassWithInheritInfo>
    embeddableTypeMap: Map<string, EmbeddableTypeWithOverrideProperties>
    enumerationMap: Map<string, Enumeration>
    associationMap: Map<string, Association>

    createId: (type: "Model" | "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "EnumerationItem" | "Association" | "Group") => string
    nameTool: NameTool
    createTemplateBuilder: (
        options: TemplateOptions
    ) => TemplateBuilder
    createJvmFileBuilder: (
        options: {
            groupId: string,
            subPackagePath: string,
        }
    ) => JvmFileBuilder
}`,
})
