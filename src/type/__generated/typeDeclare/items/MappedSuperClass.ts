export default {
    fileName: 'MappedSuperClass.d.ts',
    content: `type MappedSuperClass = Omit<Entity, 'tableName' | 'idProperty'>`,
}
