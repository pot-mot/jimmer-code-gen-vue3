export default {
    fileName: 'ManyToManyViewProperty.d.ts',
    content: `type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    baseToManyPropertyId: string
    deeperAssociationPropertyId: string
} & EntityTypeProperty`,
}
