// jvmLanguage=KOTLIN
export const kotlinEmbeddableTypeGenerator: EmbeddableTypeGenerator = (
    entity: DeepReadonly<EmbeddableTypeWithProperties>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Embeddable")

    for (const property of entity.properties) {
        builder.pushProperty(property)
    }

    result[`/entity/${entity.name}.kt`] = `package ${builder.getPackagePath()}

${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => `import ${importItem}`).join("\n")}

@Embeddable
interface ${entity.name} {
${builder.getProperties()
        .map(property =>
            `    ${property.annotations
                .flatMap(it => it.split("\n"))
                .filter(it => it.trim().length > 0)
                .join("\n    ")}
    val ${property.name}: ${property.type}${property.nullable ? "?" : ""}`
        )
        .join("\n\n")}
}
`

    return result
}