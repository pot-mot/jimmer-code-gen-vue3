export default Object.freeze({
    fileName: 'EnumerationGenerator.d.ts',
    content: `type EnumerationGenerator = (
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
