import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {javaEntityGenerator} from "@/type/script/default/EntityGenerator/javaEntityGenerator.ts";

const scriptInfo: ScriptInfo<"EntityGenerator"> = {
    id: "javaEntityGenerator",
    name: "javaEntityGenerator",
    type: "EntityGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "JAVA",
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
        const propertyInfo = builder.pushProperty(property)
        if (property.nullable) {
            builder.addImports("org.jetbrains.annotations.Nullable")
            propertyInfo.annotations.push("@Nullable")
        }
    }

    const entityExtends = entity.directExtends.size > 0 ?
        " extends\\n    " + [...entity.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\\n    ") + "\\n" : " "

    result[\`/entity/\${entity.name}.java\`] = \`package \${builder.getPackagePath()};

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem};\`).join("\\n")}

@Entity
@Table(name = "\${entity.tableName}")
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
        execute: javaEntityGenerator
    }
}

export default scriptInfo
