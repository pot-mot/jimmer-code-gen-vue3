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
        builder.pushProperty(property, {type: "MappedSuperClass", mappedSuperClass})
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

    if (mappedSuperClass.comment?.length > 0) {
        template.appendLine(`/**`)
        for (const line of mappedSuperClass.comment.split("\n")) {
            template.appendLine(` * ${line}`)
        }
        template.appendLine(` */`)
    }

    template.appendLine("@MappedSuperclass")
    template.append(`interface ${mappedSuperClass.name}`)

    if (mappedSuperClass.directExtends.size > 0) {
        template.append(" :")
        const extendsList = [...mappedSuperClass.directExtends].map(cls => cls.name);
        for (let i = 0; i < extendsList.length; i++) {
            template.append(`${i === 0 ? '\n    ' : ',\n    '}${extendsList[i]}`);
        }
    }

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

    result[`/kotlin/${packageDirPath}${mappedSuperClass.name}.kt`] = template.build({cleanEmptyLineIndent: true})

    return result
}
