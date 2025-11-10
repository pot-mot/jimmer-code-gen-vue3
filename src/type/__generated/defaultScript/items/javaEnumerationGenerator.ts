import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import {javaEnumerationGenerator} from "@/type/script/default/EnumerationGenerator/javaEnumerationGenerator.ts";

const scriptInfo: ScriptInfo<"EnumerationGenerator"> = {
    id: "javaEnumerationGenerator",
    name: "javaEnumerationGenerator",
    type: "EnumerationGenerator",
    enabled: true,
    databaseType: "ANY",
    jvmLanguage: "JAVA",
    script: {
        code: `(
    enumeration: DeepReadonly<Enumeration>,
    context: DeepReadonly<ModelContext>,
) => {
    const result: Record<string, string> = {}

    const builder = context.createJvmFileBuilder({
        groupId: enumeration.groupId,
        subPackagePath: enumeration.subPackagePath,
    })

    builder.addImports("org.babyfish.jimmer.sql.EnumType")
    builder.addImports("org.babyfish.jimmer.sql.EnumItem")

    result[\`/entity/\${enumeration.name}.java\`] = \`package \${builder.getPackagePath()};

\${[...builder.getImportSet()]
        .sort((a, b) => a.localeCompare(b))
        .map(importItem => \`import \${importItem};\`).join("\\n")}

\${enumeration.strategy === 'NAME' ?
        "@EnumType(EnumType.Strategy.NAME)" :
        "@EnumType(EnumType.Strategy.ORDINAL)"
    }
public enum \${enumeration.name} {
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
        execute: javaEnumerationGenerator
    }
}

export default scriptInfo
