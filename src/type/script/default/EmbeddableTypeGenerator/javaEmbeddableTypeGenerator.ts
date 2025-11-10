// jvmLanguage=JAVA
export const javaEmbeddableTypeGenerator: EmbeddableTypeGenerator = (
    embeddableType: DeepReadonly<EmbeddableTypeWithOverrideProperties>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: embeddableType.groupId,
        subPackagePath: embeddableType.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Embeddable")

    for (const property of embeddableType.properties) {
        const propertyInfo = builder.pushProperty(property)
        if (property.nullable) {
            builder.addImports("org.jetbrains.annotations.Nullable")
            propertyInfo.annotations.push("@Nullable")
        }
    }

    result[`/entity/${embeddableType.name}.java`] = `package ${builder.getPackagePath()};

${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => `import ${importItem};`).join("\n")}

@Entity
public interface ${embeddableType.name} {
${builder.getProperties()
        .map(property =>
            `    ${property.annotations
                .flatMap(it => it.split("\n"))
                .filter(it => it.trim().length > 0)
                .join("\n    ")}
    ${property.type} ${property.name}();`
        )
        .join("\n\n")}
}
`

    return result
}