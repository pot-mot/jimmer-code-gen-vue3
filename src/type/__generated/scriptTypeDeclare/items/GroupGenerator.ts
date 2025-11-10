export default Object.freeze({
    fileName: 'GroupGenerator.d.ts',
    content: `type GroupGenerator = (
    group: DeepReadonly<GroupWithInheritInfoMap>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
