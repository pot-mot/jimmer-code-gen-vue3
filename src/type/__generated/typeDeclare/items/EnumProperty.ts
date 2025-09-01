export default {
    fileName: 'EnumProperty.d.ts',
    content: `type EnumProperty = {
    category: "ENUM"
    enumId: string
} & BaseProperty & (
    OptionalKeyProperty |
    (OptionalLogicalDeleteProperty & ({ logicalDelete: false } | { logicalDelete: true; logicalDeleteType: 'enum' }))
    ) & ColumnProperty`,
}
