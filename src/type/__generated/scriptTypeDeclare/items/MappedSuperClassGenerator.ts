export default Object.freeze({
    fileName: 'MappedSuperClassGenerator.d.ts',
    content: `type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithCategorizedProperties>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
