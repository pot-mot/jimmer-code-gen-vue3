import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {kotlinMappedSuperclassGenerator} from "@/type/script/default/MappedSuperClassGenerator/kotlinMappedSuperClassGenerator.ts";

const scriptInfo: ScriptInfo<"MappedSuperClassGenerator"> = {
    id: "kotlinMappedSuperclassGenerator",
    name: "kotlinMappedSuperclassGenerator",
    type: "MappedSuperClassGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "KOTLIN",
    script: {
        code: `(
    entity: DeepReadonly<MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.MappedSuperclass")

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

@MappedSuperclass
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
        execute: kotlinMappedSuperclassGenerator
    }
}

export default scriptInfo
