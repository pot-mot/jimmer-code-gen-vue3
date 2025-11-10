export default `(
    group: { readonly id: string; readonly name: string; readonly comment: string; readonly color: string; readonly basePackagePath: string; readonly baseTableSchema: string; readonly entityMap: ReadonlyMap<string, { ...; }>; readonly mappedSuperClassMap: ReadonlyMap<...>; readonly embeddableTypeMap: ReadonlyMap<...>; readonly...,
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement GroupGenerator  
}`
