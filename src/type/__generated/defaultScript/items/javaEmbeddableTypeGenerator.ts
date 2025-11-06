import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {javaEmbeddableTypeGenerator} from "@/type/script/default/EmbeddableTypeGenerator/javaEmbeddableTypeGenerator.ts";

const scriptInfo: ScriptInfo<"EmbeddableTypeGenerator"> = {
    id: "javaEmbeddableTypeGenerator",
    name: "javaEmbeddableTypeGenerator",
    type: "EmbeddableTypeGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "JAVA",
    script: {
        code: `(
    entity: DeepReadonly<EmbeddableTypeWithProperties>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: entity.groupId,
        subPackagePath: entity.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Embeddable")

    for (const property of entity.properties) {
        builder.pushProperty(property)
    }

    result[\`/entity/\${entity.name}.java\`] = \`package \${builder.getPackagePath()};

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem};\`).join("\\n")}

@Entity
public interface \${entity.name} {
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
        execute: javaEmbeddableTypeGenerator
    }
}

export default scriptInfo
