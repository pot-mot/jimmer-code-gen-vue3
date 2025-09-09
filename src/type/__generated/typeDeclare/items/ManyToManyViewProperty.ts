export default Object.freeze({
    fileName: 'ManyToManyViewProperty.d.ts',
    content: `type ManyToManyViewProperty = {
    category: "ASSOCIATION_ManyToMany_View"
    baseToManyPropertyId: string
    deeperPropertyId: string
    nullable: false
    typeIsList: true
} & Omit<BaseProperty, 'nullable'>`,
})
