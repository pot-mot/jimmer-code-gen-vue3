export default Object.freeze({
    fileName: 'ManyToManyMappedAbstractProperty.d.ts',
    content: `type ManyToManyMappedAbstractProperty = Omit<ManyToManyMappedProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "ManyToMany_Mapped_Abstract"
    referencedAbstractEntityId: string
}`,
})
