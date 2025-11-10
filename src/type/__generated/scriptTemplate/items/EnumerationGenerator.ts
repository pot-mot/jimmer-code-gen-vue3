export default `(
    enumeration: { readonly id: string; readonly groupId: string; readonly subPackagePath: string; readonly name: string; readonly comment: string; readonly extraImports: readonly string[]; readonly extraAnnotations: readonly string[]; readonly strategy: EnumerationStrategy; readonly items: readonly { ...; }[]; },
    context: { readonly model: { readonly id: string; readonly name: string; readonly description: string; readonly createdTime: string; readonly modifiedTime: string; readonly databaseType: DatabaseType; readonly databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"; readonly defaultForeignKeyType: ForeignKeyType; readonly jvmLan...,
): Record<string, string> => {
    // TODO implement EnumerationGenerator  
}`
