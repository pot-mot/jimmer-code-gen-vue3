import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import {kotlinEmbeddableTypeGenerator} from "@/type/script/default/EmbeddableTypeGenerator/kotlinEmbeddableTypeGenerator.ts";

const scriptInfo: ScriptInfo<"EmbeddableTypeGenerator"> = {
    id: "kotlinEmbeddableTypeGenerator",
    name: "kotlinEmbeddableTypeGenerator",
    type: "EmbeddableTypeGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "KOTLIN",
    script: {
        code: `(
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: embeddableType.groupId,
        subPackagePath: embeddableType.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.Embeddable")

    for (const property of embeddableType.properties) {
        builder.pushProperty(property)
    }

    result[\`/entity/\${embeddableType.name}.kt\`] = \`package \${builder.getPackagePath()}

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem}\`).join("\\n")}

@Embeddable
interface \${embeddableType.name} {
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
        execute: kotlinEmbeddableTypeGenerator
    }
}

export default scriptInfo
