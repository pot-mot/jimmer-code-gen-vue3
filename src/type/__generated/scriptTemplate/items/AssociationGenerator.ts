export default `(
    association: { readonly id: string; readonly name: string; readonly comment: string; readonly type: "OneToOne"; readonly sourceEntity: { readonly tableName: string; readonly autoSyncTableName: boolean; readonly id: string; ... 28 more ...; readonly allProperties: readonly ({ ...; } | ... 23 more ... | { ...; })[]; }; ... 4 more ...,
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement AssociationGenerator  
}`
