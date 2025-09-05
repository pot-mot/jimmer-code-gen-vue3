export default Object.freeze({
    fileName: 'MappedSuperClassGenerator.d.ts',
    content: `type MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClass>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
