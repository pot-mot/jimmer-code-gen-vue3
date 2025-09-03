export default {
    fileName: 'TableToEntity.d.ts',
    content: `type TableToEntity = (tables: Table[]) => {
    entities: Entity[],
    associations: Association[],
}`,
}
