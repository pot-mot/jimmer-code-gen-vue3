export default Object.freeze({
    fileName: 'MappedSuperClass.d.ts',
    content: `type MappedSuperClass = Omit<Entity, 'tableName' | 'autoSyncTableName'>`,
})
