export default `(
    mappedSuperClass: { readonly id: string; readonly groupId: string; readonly subPackagePath: string; readonly name: string; readonly comment: string; readonly extendsIds: readonly string[]; readonly extraImports: readonly string[]; ... 18 more ...; readonly allProperties: readonly ({ ...; } | ... 23 more ... | { ...; })[]; },
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement MappedSuperClassGenerator  
}`
