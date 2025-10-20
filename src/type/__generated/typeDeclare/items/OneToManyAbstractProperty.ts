export default Object.freeze({
    fileName: 'OneToManyAbstractProperty.d.ts',
    content: `type OneToManyAbstractProperty = Omit<OneToManyProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "OneToMany_Abstract"
    referencedAbstractEntityId: string
    nameTemplate: string
    commentTemplate: string
}`,
})
