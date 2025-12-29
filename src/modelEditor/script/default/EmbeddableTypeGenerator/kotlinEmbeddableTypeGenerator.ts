// jvmLanguage=KOTLIN
export const kotlinEmbeddableTypeGenerator: EmbeddableTypeGenerator = (
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
        builder.pushProperty(property, {type: "EmbeddableType", embeddableType})
    }

    const template = context.createTemplateBuilder({
        indent: "    ",
        scope: {start: " {", end: "}"}
    })

    const packagePath = builder.getPackagePath()
    let packageDirPath = ""
    if (packagePath.length > 0) {
        packageDirPath = packagePath.replace(/\./g, "/") + "/"

        template.appendLine(`package ${builder.getPackagePath()}`)
        template.appendLine()
    }

    const imports = [...builder.getImportSet()].sort()
    if (imports.length > 0) {
        for (const importItem of imports) {
            template.appendLine(`import ${importItem}`)
        }
        template.appendLine()
    }

    if (embeddableType.comment?.length > 0) {
        template.appendLine(`/**`)
        for (const line of embeddableType.comment.split("\n")) {
            template.appendLine(` * ${line}`)
        }
        template.appendLine(` */`)
    }

    template.appendLine("@Embeddable")
    template.append(`interface ${embeddableType.name}`)
    template.startScope()

    for (const property of builder.getProperties()) {
        template.appendLine()

        if (property.comment.length > 0) {
            template.appendLine(`/**`)
            for (const line of property.comment.split("\n")) {
                template.appendLine(` * ${line}`)
            }
            template.appendLine(` */`)
        }

        if (property.annotations.length > 0) {
            for (const annotation of property.annotations) {
                template.appendBlock(annotation)
            }
        }

        template.appendLine(`val ${property.name}: ${property.type}${property.nullable ? "?" : ""}`)
    }

    template.endScope()

    result[`/kotlin/${packageDirPath}${embeddableType.name}.kt`] = template.build({cleanEmptyLineIndent: true})

    return result
}
