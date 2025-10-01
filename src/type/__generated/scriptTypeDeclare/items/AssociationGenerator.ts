export default Object.freeze({
    fileName: 'AssociationGenerator.d.ts',
    content: `type AssociationGenerator = (
    association: DeepReadonly<AssociationWithInheritInfo>,
    context: DeepReadonly<ModelContext>
) => Record<string, string>`,
})
