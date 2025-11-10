import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import {kotlinEnumerationGenerator} from "@/type/script/default/EnumerationGenerator/kotlinEnumerationGenerator.ts";

const scriptInfo: ScriptInfo<"EnumerationGenerator"> = {
    id: "kotlinEnumerationGenerator",
    name: "kotlinEnumerationGenerator",
    type: "EnumerationGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "KOTLIN",
    script: {
        code: `(
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>
): Record<string, string> => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: enumeration.groupId,
        subPackagePath: enumeration.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.EnumType")
    builder.addImports("org.babyfish.jimmer.sql.EnumItem")

    result[\`/entity/\${enumeration.name}.kt\`] = \`package \${builder.getPackagePath()}

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem}\`).join("\\n")}

\${enumeration.strategy === 'NAME' ?
        "@EnumType(EnumType.Strategy.NAME)" :
        "@EnumType(EnumType.Strategy.ORDINAL)"
    }
enum class \${enumeration.name} {
\${enumeration.items
        .map(item =>
            \`    \${enumeration.strategy === 'NAME' ?
                \`@EnumItem(name = "\${item.name}")\` :
                \`@EnumItem(ordinal = \${item.ordinal})\`
            }
    \${item.name},\`
        )
        .join("\\n\\n")}
}
\`

    return result
}`,
        execute: kotlinEnumerationGenerator
    }
}

export default scriptInfo
