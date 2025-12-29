// jvmLanguage=JAVA
export const javaEntityGenerator: EntityGenerator = (
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Entity")
    builder.addImports("org.babyfish.jimmer.sql.Table")
    builder.addImports(entity.extraImports)

    for (const mappedSuperClassId of entity.extendsIds) {
        builder.requireMappedSuperClass(mappedSuperClassId)
    }

    for (const property of entity.properties) {
        builder.pushProperty(property, {type: "Entity", entity})
    }

    const template = context.createTemplateBuilder({
        indent: "    ",
        scope: {start: " {", end: "}"}
    })

    const packagePath = builder.getPackagePath()
    let packageDirPath = ""
    if (packagePath.length > 0) {
        packageDirPath = packagePath.replace(/\./g, "/") + "/"

        template.appendLine(`package ${builder.getPackagePath()};`)
        template.appendLine()
    }

    const imports = [...builder.getImportSet()].sort()
    if (imports.length > 0) {
        for (const importItem of imports) {
            template.appendLine(`import ${importItem};`)
        }
        template.appendLine()
    }

    if (entity.comment.length > 0) {
        template.appendLine(`/**`)
        for (const line of entity.comment.split("\n")) {
            template.appendLine(` * ${line}`)
        }
        template.appendLine(` */`)
    }
    template.appendLine(`@Entity`)
    template.appendLine(`@Table(name = "${entity.tableName}")`)
    for (const annotation of entity.extraAnnotations) {
        template.appendBlock(annotation)
    }
    template.append(`public interface ${entity.name}`)
    if (entity.directExtends.size > 1) {
        template.append(` extends`)
        for (const extend of entity.directExtends) {
            template.append(`\n        ${extend.name}`)
        }
    } else if (entity.directExtends.size === 1) {
        template.append(` extends ${[...entity.directExtends].map(it => it.name).join(", ")}`)
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

    result[`/java/${packageDirPath}${entity.name}.java`] = template.build({cleanEmptyLineIndent: true})

    return result
}