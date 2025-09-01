export default {
    fileName: 'OneToOneTargetProperty.d.ts',
    content: `type OneToOneTargetProperty = {
    category: "ASSOCIATION_OneToOne_Target"
    associationId: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty`,
}
