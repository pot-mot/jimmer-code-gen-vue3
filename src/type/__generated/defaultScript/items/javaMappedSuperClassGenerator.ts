import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {javaMappedSuperClassGenerator} from "@/type/script/default/MappedSuperClassGenerator/javaMappedSuperClassGenerator.ts";

const scriptInfo: ScriptInfo<"MappedSuperClassGenerator"> = {
    id: "javaMappedSuperClassGenerator",
    name: "javaMappedSuperClassGenerator",
    type: "MappedSuperClassGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "JAVA",
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
        " extends\\n    " + [...entity.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\\n    ") + "\\n" : " "

    result[\`/entity/\${entity.name}.java\`] = \`package \${builder.getPackagePath()};

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem};\`).join("\\n")}

@MappedSuperclass
public interface \${entity.name}\${entityExtends}{
\${builder.getProperties()
        .map(property =>
            \`    \${property.annotations
                .flatMap(it => it.split("\\n"))
                .filter(it => it.trim().length > 0)
                .join("\\n    ")}
    \${property.type} \${property.name}();\`
        )
        .join("\\n\\n")}
}
\`

    return result
}`,
        execute: javaMappedSuperClassGenerator
    }
}

export default scriptInfo
