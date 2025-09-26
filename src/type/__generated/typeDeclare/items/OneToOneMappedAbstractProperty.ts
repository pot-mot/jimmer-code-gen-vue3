export default Object.freeze({
    fileName: 'OneToOneMappedAbstractProperty.d.ts',
    content: `type OneToOneMappedAbstractProperty = Omit<OneToOneMappedProperty, 'category' | 'referencedEntityId'> & {
    category: "OneToOne_Mapped_Abstract"
    referencedAbstractEntityId: string
}`,
})
