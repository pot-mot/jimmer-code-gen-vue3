// jvmLanguage=KOTLIN
export const kotlinMappedSuperclassGenerator: MappedSuperClassGenerator = (
    mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: mappedSuperClass.groupId,
        subPackagePath: mappedSuperClass.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.MappedSuperclass")

    for (const mappedSuperClassId of mappedSuperClass.extendsIds) {
        builder.requireMappedSuperClass(mappedSuperClassId)
    }

    for (const property of mappedSuperClass.properties) {
        builder.pushProperty(property)
    }

    const entityExtends = mappedSuperClass.directExtends.size > 0 ?
        " :\n    " + [...mappedSuperClass.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\n    ") + "\n" : " "

    result[`/entity/${mappedSuperClass.name}.kt`] = `package ${builder.getPackagePath()}

${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => `import ${importItem}`).join("\n")}

@MappedSuperclass
interface ${mappedSuperClass.name}${entityExtends}{
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