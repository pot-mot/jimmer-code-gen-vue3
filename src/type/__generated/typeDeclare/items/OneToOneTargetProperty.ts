export default {
    fileName: 'OneToOneTargetProperty.d.ts',
    content: `type OneToOneTargetProperty = {
    category: "ASSOCIATION_OneToOne_Target"
    mappedBy: string
    nullable: true
} & Omit<BaseProperty, 'nullable'> & BaseAssociationProperty`,
}
