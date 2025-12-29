// jvmLanguage=JAVA
export const javaEnumerationGenerator: EnumerationGenerator = (
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: enumeration.groupId,
        subPackagePath: enumeration.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.EnumType")
    builder.addImports("org.babyfish.jimmer.sql.EnumItem")

    const template = context.createTemplateBuilder({
        indent: "    ",
        scope: {start: " {", end: "}"}
    })

    const packagePath = builder.getPackagePath()
    let packageDirPath = ""
    if (packagePath.length > 0) {
        packageDirPath = packagePath.replace(/\./g, "/") + "/"
        template.appendLine(`package ${packagePath};`)
        template.appendLine()
    }

    const imports = [...builder.getImportSet()].sort()
    if (imports.length > 0) {
        for (const importItem of imports) {
            template.appendLine(`import ${importItem};`)
        }
        template.appendLine()
    }

    if (enumeration.comment.length > 0) {
        template.appendLine(`/**`)
        for (const line of enumeration.comment.split("\n")) {
            template.appendLine(` * ${line}`)
        }
        template.appendLine(` */`)
    }

    const isName = (enumeration.strategy === 'NAME')
    if (isName) {
        template.appendLine("@EnumType(EnumType.Strategy.NAME)")
    } else {
        template.appendLine("@EnumType(EnumType.Strategy.ORDINAL)")
    }
    if (enumeration.extraAnnotations.length > 0) {
        for (const annotation of enumeration.extraAnnotations) {
            template.appendBlock(annotation)
        }
    }
    template.append(`public enum ${enumeration.name}`)

    template.startScope()
    for (const item of enumeration.items) {
        template.appendLine()

        if (item.comment.length > 0) {
            template.appendLine(`/**`)
            for (const line of item.comment.split("\n")) {
                template.appendLine(` * ${line}`)
            }
            template.appendLine(` */`)
        }
        if (isName) {
            template.appendLine(`@EnumItem(name = "${item.name}")`)
        } else {
            template.appendLine(`@EnumItem(ordinal = ${item.ordinal})`)
        }
        if (item.extraAnnotations.length > 0) {
            for (const annotation of item.extraAnnotations) {
                template.appendBlock(annotation)
            }
        }
        template.appendLine(`${item.name},`)
    }
    template.endScope()

    result[`/java/${packageDirPath}${enumeration.name}.java`] = template.build({cleanEmptyLineIndent: true})

    return result
}
