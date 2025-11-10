import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import {kotlinEntityGenerator} from "@/type/script/default/EntityGenerator/kotlinEntityGenerator.ts";

const scriptInfo: ScriptInfo<"EntityGenerator"> = {
    id: "kotlinEntityGenerator",
    name: "kotlinEntityGenerator",
    type: "EntityGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "KOTLIN",
    script: {
        code: `(
    entity: DeepReadonly<EntityWithInheritInfo>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Entity")
    builder.addImports("org.babyfish.jimmer.sql.Table")

    for (const mappedSuperClassId of entity.extendsIds) {
        builder.requireMappedSuperClass(mappedSuperClassId)
    }

    for (const property of entity.properties) {
        builder.pushProperty(property)
    }

    const entityExtends = entity.directExtends.size > 0 ?
        " :\\n    " + [...entity.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\\n    ") + "\\n" : " "

    result[\`/entity/\${entity.name}.kt\`] = \`package \${builder.getPackagePath()}

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem}\`).join("\\n")}

@Entity
@Table(name = "\${entity.tableName}")
interface \${entity.name}\${entityExtends}{
\${builder.getProperties()
        .map(property =>
            \`    \${property.annotations
                .flatMap(it => it.split("\\n"))
                .filter(it => it.trim().length > 0)
                .join("\\n    ")}
    val \${property.name}: \${property.type}\${property.nullable ? "?" : ""}\`
        )
        .join("\\n\\n")}
}
\`

    return result
}`,
        execute: kotlinEntityGenerator
    }
}

export default scriptInfo
