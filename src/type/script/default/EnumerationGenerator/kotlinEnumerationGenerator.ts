// jvmLanguage=KOTLIN
export const kotlinEnumerationGenerator: EnumerationGenerator = (
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: enumeration.groupId,
        subPackagePath: enumeration.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.EnumType")
    builder.addImports("org.babyfish.jimmer.sql.EnumItem")

    result[`/entity/${enumeration.name}.kt`] = `package ${builder.getPackagePath()}

${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => `import ${importItem}`).join("\n")}

${enumeration.strategy === 'NAME' ?
        "@EnumType(EnumType.Strategy.NAME)" :
        "@EnumType(EnumType.Strategy.ORDINAL)"
    }
enum class ${enumeration.name} {
${enumeration.items
        .map(item =>
            `    ${enumeration.strategy === 'NAME' ?
                `@EnumItem(name = "${item.name}")` :
                `@EnumItem(ordinal = ${item.ordinal})`
            }
    ${item.name},`
        )
        .join("\n\n")}
}
`

    return result
}