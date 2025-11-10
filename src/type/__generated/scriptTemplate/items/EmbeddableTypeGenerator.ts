export default `(
    embeddableType: { readonly id: string; readonly groupId: string; readonly subPackagePath: string; readonly name: string; readonly comment: string; readonly extraImports: readonly string[]; readonly extraAnnotations: readonly string[]; ... 5 more ...; readonly categorizedOverrideColumnNameProperties: { ...; }; },
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement EmbeddableTypeGenerator  
}`
