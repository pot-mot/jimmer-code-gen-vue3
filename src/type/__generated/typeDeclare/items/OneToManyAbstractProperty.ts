export default Object.freeze({
    fileName: 'OneToManyAbstractProperty.d.ts',
    content: `type OneToManyAbstractProperty = Omit<OneToManyProperty, 'category' | 'referencedEntityId'> & {
    category: "OneToMany_Abstract"
    referencedAbstractEntityId: string
}`,
})
