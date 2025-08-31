export default {
    fileName: 'ManyToManyViewProperty.d.ts',
    content: `type ManyToManyViewProperty = {
    category: "ManyToMany_View"
    baseToManyPropertyName: string
    deeperAssociationPropertyName: string
} & EntityTypeProperty`,
}
