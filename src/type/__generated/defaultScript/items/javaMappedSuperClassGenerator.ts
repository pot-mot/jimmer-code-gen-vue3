import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
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
    mappedSuperClass: DeepReadonly<MappedSuperClassWithInheritInfo>,
    context: DeepReadonly<ModelContext>,
) => {
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
        const propertyInfo = builder.pushProperty(property)
        if (property.nullable) {
            builder.addImports("org.jetbrains.annotations.Nullable")
            propertyInfo.annotations.push("@Nullable")
        }
    }

    const entityExtends = mappedSuperClass.directExtends.size > 0 ?
        " extends\\n    " + [...mappedSuperClass.directExtends].map(mappedSuperClass => mappedSuperClass.name).join(",\\n    ") + "\\n" : " "

    result[\`/entity/\${mappedSuperClass.name}.java\`] = \`package \${builder.getPackagePath()};

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem};\`).join("\\n")}

@MappedSuperclass
public interface \${mappedSuperClass.name}\${entityExtends}{
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
