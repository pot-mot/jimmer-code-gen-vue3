export default Object.freeze({
    fileName: 'OneToOneMappedAbstractProperty.d.ts',
    content: `type OneToOneMappedAbstractProperty = Omit<OneToOneMappedProperty,
    'category' | 'referencedEntityId' |
    'name' | 'comment' | 'idViewName' |
    'useNameTemplate' | 'useCommentTemplate' | 'useIdViewNameTemplate'
> & {
    category: "OneToOne_Mapped_Abstract"
    referencedAbstractEntityId: string
}`,
})
