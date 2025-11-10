export default `(
    tables: readonly { readonly schema: string; readonly name: string; readonly comment: string; readonly columns: readonly { readonly name: string; readonly comment: string; readonly type: string; readonly dataSize?: number | undefined; ... 4 more ...; readonly autoIncrement?: boolean | undefined; }[]; readonly indexes: readon...,
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement TableGenerator  
}`
