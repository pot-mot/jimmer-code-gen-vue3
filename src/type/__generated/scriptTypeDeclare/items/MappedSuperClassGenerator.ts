export default Object.freeze({
    fileName: 'MappedSuperClassGenerator.d.ts',
    content: `type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
