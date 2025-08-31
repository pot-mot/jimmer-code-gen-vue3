export default {
    fileName: 'ForeignKeyGenerator.d.ts',
    content: `type ForeignKeyGenerator = {
    scriptTypeName: 'ForeignKeyGenerator'
    (foreignKey: ForeignKey): string
}`,
}
