// jvmLanguage=JAVA
export const javaMappedSuperClassGenerator: MappedSuperClassGenerator = (
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

    if (mappedSuperClass.comment.length > 0) {
        template.appendLine(`/**`)
        for (const line of mappedSuperClass.comment.split("\n")) {
            template.appendLine(` * ${line}`)
        }
        template.appendLine(` */`)
    }

    template.appendLine(`@MappedSuperclass`)
    template.append(`public interface ${mappedSuperClass.name}`)

    if (mappedSuperClass.directExtends.size > 1) {
        template.append(` extends`)
        for (const extend of mappedSuperClass.directExtends) {
            template.append(`\n        ${extend.name}`)
        }
    } else if (mappedSuperClass.directExtends.size === 1) {
        template.append(` extends ${[...mappedSuperClass.directExtends].map(it => it.name).join(", ")}`)
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

        if (property.body) {
            template.append(`default ${property.type} ${property.name}()`)
            template.startScope()
            template.appendBlock(property.body)
            template.endScope()
        } else {
            template.appendLine(`${property.type} ${property.name}();`)
        }
    }
    template.endScope()

    result[`/java/${packageDirPath}${mappedSuperClass.name}.java`] = template.build({cleanEmptyLineIndent: true})

    return result
}
