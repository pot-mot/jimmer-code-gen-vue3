export default {
    fileName: 'OneToOneTargetProperty.d.ts',
    content: `type OneToOneTargetProperty = {
    category: "OneToOne_Target"
    associationName: string
    idView: {
        name: string
    }
    mappedBy: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & EntityTypeProperty`,
}
