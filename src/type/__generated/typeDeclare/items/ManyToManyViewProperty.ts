export default Object.freeze({
    fileName: 'ManyToManyViewProperty.d.ts',
    content: `type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    typeIsList: true
    baseToManyPropertyId: string
    deeperPropertyId: string
    nullable: false
} & Omit<BaseProperty, 'nullable'>`,
})
